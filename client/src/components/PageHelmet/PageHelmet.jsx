import { Helmet } from "react-helmet";

export const PageHelmet = ({ title, description, children }) => {
  const defaultTitle = "Adam Kliegman: NYC-based user-centric product engineer";
  const defaultDescription =
    "Adam Kliegman is an NYC-based user-centric product engineer. He is currently available for hire.";
  const nestedDefaultTitle = "Adam Kliegman";
  const nestedTitle = title ? `${title} | ${nestedDefaultTitle}` : defaultTitle;
  const nestedDescription = description ? description : defaultDescription;

  return (
    <Helmet>
      <title>{nestedTitle}</title>
      <meta name="description" content={nestedDescription} />
      {children}
    </Helmet>
  );
};
