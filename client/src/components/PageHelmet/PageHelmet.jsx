import { Helmet } from "react-helmet";

export const PageHelmet = ({ title, description, children }) => {
  const defaultTitle =
    "Adam Kliegman: NYC-based software engineer and UX evangelist";
  const defaultDescription =
    "Adam Kliegman is an NYC-based software engineer and UX evangelist. He is currently available for hire.";
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
