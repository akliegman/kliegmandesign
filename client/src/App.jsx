import {
  Routes,
  Route,
  useLocation,
  Navigate,
  matchPath,
} from "react-router-dom";
import { routes } from "./routes";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { PageHelmet } from "./components/PageHelmet/PageHelmet";
import { CookiesMessage } from "./components/CookiesMessage/CookiesMessage";
import { GoogleAnalytics } from "./components/GoogleAnalytics/GoogleAnalytics";
import { useAuth } from "./context/AuthContext";
import { ScrolltopProvider } from "./context/ScrolltopContext";
import { Helmet } from "react-helmet";
import { useLoading } from "./context/LoadingContext";
import clsx from "clsx";
import "./App.less";

export const App = () => {
  const location = useLocation();
  const { isLoading } = useLoading();
  const { isLoggedIn } = useAuth();

  const appClassNames = clsx("App", {
    "App--NoHeader": !routes[location.pathname]?.withHeader,
    "App--NoFooter": !routes[location.pathname]?.withFooter,
    "App--DarkenedBackground": routes[location.pathname]?.darkenedBackground,
  });

  const [projectRoute, projectObject] = Object.entries(routes).filter(
    ([key, value]) => value.name === "Project"
  )[0];

  const matchProjectPath = matchPath({ path: projectRoute }, location.pathname);

  const isWithHeader =
    routes[location.pathname]?.withHeader ||
    (projectObject?.withHeader && matchProjectPath);
  const isWithFooter =
    routes[location.pathname]?.withFooter ||
    (projectObject?.withFooter && matchProjectPath);
  const isDarkenedBackground =
    routes[location.pathname]?.darkenedBackground ||
    (projectObject?.darkenedBackground && matchProjectPath);

  return (
    <ScrolltopProvider>
      <Helmet>
        {isDarkenedBackground ? (
          <meta name="theme-color" content="#cccccc" />
        ) : (
          <meta name="theme-color" content="#f7f7f7" />
        )}
      </Helmet>
      <GoogleAnalytics />
      <div className={appClassNames}>
        <CSSTransition
          in={!isLoading}
          classNames="AppPageFadeIn"
          timeout={1200}
          unmountOnExit
        >
          <div className="App__Content">
            <PageHelmet />

            {isWithHeader && <Header location={location} />}
            <TransitionGroup component={null}>
              <CSSTransition
                key={location.key}
                classNames="AppPageTransition"
                timeout={1000}
              >
                <Routes location={location}>
                  {Object.entries(routes).map(([path, route], index) => {
                    let state = { from: { pathname: location.pathname } };
                    let element = !route.protected ? (
                      route.element
                    ) : isLoggedIn ? (
                      route.element
                    ) : (
                      <Navigate to={`/login`} state={state} />
                    );

                    return (
                      <Route
                        key={index}
                        path={path}
                        exact={route.exact}
                        element={element}
                      />
                    );
                  })}
                </Routes>
              </CSSTransition>
            </TransitionGroup>
            {isWithFooter && <Footer />}
            <CookiesMessage />
          </div>
        </CSSTransition>
      </div>
    </ScrolltopProvider>
  );
};
