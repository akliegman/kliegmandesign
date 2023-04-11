import * as Images from "../../assets/images/projects";

export const projectsPageData = [
  {
    name: "demyst-platform",
    protected: false,
    title: "Demyst Data Platform",
    summary: `SaaS platform used to discover, onboard, ingest, and monitor external data.`,
    description: [
      {
        type: "paragraph",
        content: `The Demyst Data Platform is an external data access and management platform that 
        provides data teams with a suite of tools to streamline their workflows The platform enables 
        data teams to securely access and work with data from a wide variety of sources with a 
        highly customizable API with its own JSON-based API configuration syntax, as well as share 
        data and insights with other stakeholders within their organization.`,
      },
      {
        type: "paragraph",
        content: `As the leader in building this platform from zero-to-one as part of a company 
        transition to product-led B2B SaaS, I scoped, designed, and built the platform's frontend 
        and core user experience, as well as the hooks to the first-of-its-kind API, allowing for users
        to build their own external data API products with ease. I also led the development of all of 
        the platforms' key features, including data discovery, data ingestion, data quality assessment, 
        and administrative/governance capabilities.`,
      },
    ],
    thumbnail: Images.DemystPlatformConnectorImage,
    stack: ["React", "Redux", "LESS", "Cypress", "Storybook", "Ruby on Rails"],
    slides: [
      {
        description: `External data product details with attributes, metadata, and usage statistics`,
        image: Images.DemystPlatformConnectorImage,
      },
      {
        description: `External data discovery and data product exploration experience`,
        image: Images.DemystPlatformExploreImage,
      },
      {
        description: `Comprehensive search results page with filters and sorting`,
        image: Images.DemystPlatformSearchImage,
      },
      {
        description: `Create a custom data product for a specific use case`,
        image: Images.DemystPlatformProductImage,
      },
      {
        description: `Workflow management tools for data governance and diligence rules`,
        image: Images.DemystPlatformDiligenceImage,
      },
      {
        description:
          "Data visualization of historical API spend and budgeted spend",
        image: Images.DemystPlatformBillingImage,
      },
    ],
  },
  {
    name: "demyst-marketing-site",
    protected: true,
    title: "Demyst Data Marketing Site",
    summary:
      "Marketing and pre-sals site for Demyst Data's external data platform and data products.",
    thumbnail: Images.DemystMarketingHomeImage,
    stack: ["React", "Redux", "Next.js", "ButterCMS", "LESS", "Cypress"],
  },
];
