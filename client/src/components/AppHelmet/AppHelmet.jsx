import { Helmet } from "react-helmet";
import { useApi } from "../../contexts/ApiContext";

export const AppHelmet = ({ isDarkenedBackground }) => {
  const { envData } = useApi();

  if (!envData) {
    return null;
  }

  return (
    <Helmet>
      {isDarkenedBackground ? (
        <meta name="theme-color" content="#cccccc" />
      ) : (
        <meta name="theme-color" content="#f7f7f7" />
      )}
      <meta name="api-url" content={envData?.REACT_APP_API_URL} />
    </Helmet>
  );
};
