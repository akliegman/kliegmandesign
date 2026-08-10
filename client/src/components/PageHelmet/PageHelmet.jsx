import { Helmet } from "react-helmet";

export const PageHelmet = ({ title, description, children }) => {
  const defaultTitle =
    "Adam Kliegman: software engineer for design systems, frontend architecture, and AI products";
  const defaultDescription =
    "Adam Kliegman is an NYC-based software engineer specializing in design systems, frontend architecture, accessibility, and AI-native products. He is currently available for hire.";
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
