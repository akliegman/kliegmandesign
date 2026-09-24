import { profile } from "@/content/profile";

export interface PageMetaProps {
  /** Page name; the site name is appended. Omit on the home page to use the site title. */
  title?: string;
  description?: string;
}

/** Sets the document title and description. React 19 hoists these tags into `<head>`. */
export function PageMeta({ title, description = profile.description }: PageMetaProps) {
  const fullTitle = title
    ? `${title} | ${profile.name}`
    : `${profile.name}, software engineer for design systems and frontend architecture`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </>
  );
}
