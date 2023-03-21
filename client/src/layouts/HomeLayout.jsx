import "./HomeLayout.less";
import { Masthead } from "../components/Masthead/Masthead";
import { Footer } from "../components/Footer/Footer";

export const HomeLayout = () => {
  return (
    <div className="HomeLayout">
      <Masthead />
      <Footer className="HomeLayout__Footer" />
    </div>
  );
};
