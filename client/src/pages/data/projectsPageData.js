import * as Images from "../../assets/images/projects";
import CodeImage from "../../assets/images/code.jpg";

export const projectsPageData = {
  image: CodeImage,
  heading: "Projects",
  description: `I've worked on a wide range of projects across various industries and technologies.`,
  list: [
    // {
    //   name: "archer-website",
    //   protected: false,
    //   title: "Archer Law Website",
    //   summary: `RubyLaw powered website for a law firm that utilizes a custom CLM for managing content and the RubyLaw express component library.`,
    //   description: [
    //     {
    //       type: "paragraph",
    //       content: `The Archer Law website is a custom configured website powered buy the RubyLaw CLM headless API for managing its content. The website is built using the RubyLaw express component library which is built with Node.js and React. This website includes a number of features, such as a blog, a news section, a practice area section, and more.`,
    //     },
    //     {
    //       type: "paragraph",
    //       content: `As the lead developer on this project, I was responsible for building the website's frontend and core user experience to specific design specifications. I built all of the connectors to the RubyLaw API to hydrate and select the appropriate data for each page, and mananged everything from initial integration, bespoke designns assigned to the to express component library, to advanced features such as custom Word document proposal generation and interactive maps with the Google Maps API. I also handled all WCAG/ADA compliance requirements and ensured that the site was cross-platform compatible and responsive.`,
    //     },
    //   ],
    //   thumbnail: Images.ArcherPracticeImage,
    //   stack: {
    //     languages: ["JavaScript", "Less"],
    //     frameworks: ["React", "Node.js", "Redux", "CSS Modules", "Puppeteer"],
    //     tools: ["NPM Registry", "Webpack", "Babel", "Git", "Google Maps API"],
    //   },
    //   sections: [],
    // },
    {
      name: "demyst-platform",
      protected: false,
      title: "Demyst Data Platform",
      summary: `SaaS platform used to discover, onboard, ingest, and monitor external data.`,
      description: [
        {
          type: "paragraph",
          content: `The Demyst Data Platform is an external data access and management platform that provides data teams with a suite of tools to streamline their workflows The platform enables data teams to securely access and work with data from a wide variety of sources with a highly customizable API with its own JSON-based API configuration syntax, as well as share data and insights with other stakeholders within their organization.`,
        },
        {
          type: "paragraph",
          content: `As the leader in building this platform from zero-to-one as part of a company transition to product-led B2B SaaS, I scoped, designed, and built the platform's frontend and core user experience, as well as the hooks to the first-of-its-kind API, allowing for users to build their own external data API products with ease. I also led the development of all of the platforms' key features, including data discovery, data ingestion, data quality assessment, and administrative/governance capabilities.`,
        },
      ],
      thumbnail: Images.DemystPlatformConnectorImage,
      stack: {
        languages: ["JavaScript", "Ruby", "Less"],
        frameworks: [
          "React",
          "Next.js",
          "Redux",
          "REST",
          "CSS Modules",
          "Cypress",
          "Ruby on Rails",
        ],
        tools: ["Webpack", "Jest", "Babel", "Figma", "Git"],
      },
      sections: [
        {
          heading: `External data product details with attributes, metadata, and usage statistics`,
          description: [
            {
              type: "paragraph",
              content: `The platform includes a detailed data product page that provides users with information about the data product. The data product page also includes a set of tools that allow users to interact with the data product, such as viewing the data schema, running samplequeries, downloading data, or building custom pipelines for the data.`,
            },
            {
              type: "paragraph",
              content: `The data product page also includes a set of metadata fields that provide additional information about the data product, such as the source of the data, the frequency of updates, and the quality of the data. Usage statistics are also displayed on the data product page, so that users can see how the data product is being used, what the match rates are, and what the spend is as compared to the budget.`,
            },
          ],
          image: Images.DemystPlatformConnectorImage,
        },
        {
          heading: `External data discovery and data product exploration experience`,
          description: [
            {
              type: "paragraph",
              content: `The platform includes a data discovery page that allows users to explore the latest released and most highly rated data products. The data discovery page provides the internal team with the abiliity to market trending data products with the highest match rates and the highest quality scores to the users.`,
            },
            {
              type: "paragraph",
              content: `The data discovery page also provides users with sample pipelines that they can use to get started with the pre-configured API endpoints and that integrate with a number of popular data products across several business use cases.`,
            },
          ],
          image: Images.DemystPlatformExploreImage,
        },
        {
          heading: `Comprehensive search results page with filters and sorting`,
          description: [
            {
              type: "paragraph",
              content: `The platform includes a search page that allows users to search for data products and pre-configured pipelines based on various criteria. The search results page includes a set of filters that allow users to refine their search results based on the source of the data, the quality of the data, and the frequency of updates.`,
            },
            {
              type: "paragraph",
              content: `The search results page also includes a set of tabbed views that allow users to refine results based on their specific use case.  Users can also easily view the metadata fields for individual data products and compare the values to determine which data product is the most appropriate for their use case.`,
            },
          ],

          image: Images.DemystPlatformSearchImage,
        },
        {
          heading: `Create a custom data product for a specific use case`,
          description: [
            {
              type: "paragraph",
              content: `The platform includes a data product creation page that allows users to create a custom data product pipeline that is purpose-built for their specific use case using several data products. The data product creation page includes a set of tools that allow users to define the data schema, set the data quality requirements, and configure the data access controls.`,
            },
            {
              type: "paragraph",
              content: `The data product creation page also includes a set of metadata fields that allow users to provide additional information about the data product, and the JSON configuration syntax that allows users to define the API endpoints and data transformations that are required to build the pipeline for the data product.`,
            },
          ],
          image: Images.DemystPlatformProductImage,
        },
        {
          heading: `Workflow management tools for data governance and diligence rules`,
          description: [
            {
              type: "paragraph",
              content: `The platform includes a set of workflow management tools that allow users to define governance and diligence rules for their internal audit and compliance processes. The workflow management tools allow users to define the rules that are required to ensure that the data is being used in a compliant and ethical manner.`,
            },
            {
              type: "paragraph",
              content: `The workflow management tools also include a set of tools that allow users to monitor the data usage and the data quality of the data products that are being used within the organization. The tools provide users with the ability to set alerts and notifications based on specific criteria, such as the frequency of updates, the quality of the data, and the match rates.`,
            },
          ],
          image: Images.DemystPlatformDiligenceImage,
        },
        {
          heading: `Data visualization of historical API spend and budgeted spend`,
          description: [
            {
              type: "paragraph",
              content: `The platform includes a set of data visualization tools that allow users to view the historical API spend and the budgeted spend for the organization. The data visualization tools provide users with the ability to view the spend trends over time and compare the actual spend to the budgeted spend.`,
            },
            {
              type: "paragraph",
              content: `The data visualization tools also include a set of filters that allow users to refine the data visualization based on specific criteria, such as the pipeline name, the data product name, and the data source. The tools provide users with the ability to export the data visualization to a CSV file for further analysis and reporting.`,
            },
          ],
          image: Images.DemystPlatformBillingImage,
        },
      ],
    },
    {
      name: "demyst-design-system",
      protected: false,
      title: "Demyst Design System",
      summary: `Design system and component library for Demyst Data's external data platform.`,
      description: [
        {
          type: "paragraph",
          content: `The Demyst Data Design System is a design system and component library that provides a set of reusable components and guidelines for building the Demyst Data Platform.`,
        },
        {
          type: "paragraph",
          content: `As the sole designer and developer of the design system, I scoped, designed, and built the design system and component library from the ground up. I also led the development of the design system documentation site, which is built with Storybook and React.`,
        },
        {
          type: "paragraph",
          content: `The Storybook uses controls to allow users to interact with the components and see how they respond to different props and states. Each component includes detailed documentation that explains how to use the component and what props are available. The design system is mostly prop-based, but also includes a set of utility classes that can be used to apply styles to elements in the platform.`,
        },
        {
          type: "paragraph",
          content: `The design system also includes a set of design tokens that define the colors, typography, spacing, and other design properties used throughout the platform. The design tokens are defined on the project-side and are used to generate the styles for the components in the design system. This project wass published as an npm package that could theoretically be installed in any project, and was integrated with the platform's build system, so that changes to the design system are automatically available in the platform.`,
        },
      ],
      thumbnail: Images.DemystDsColorsImage,
      stack: {
        languages: ["JavaScript", "Less"],
        frameworks: ["React", "Storybook", "CSS Modules", "Jest", "Figma"],
        tools: ["Webpack", "Babel", "Git"],
      },
      sections: [
        {
          heading: `Design system colors library`,
          description: [
            {
              type: "paragraph",
              content: `The design system includes a comprehensive color library with a wide range of colors that are used throughout the platform. The color library includes a variety of color scales and shades that are used to create a consistent and cohesive visual language.`,
            },
            {
              type: "paragraph",
              content: `The color library also includes a set of utility classes that can be used to apply colors to text, backgrounds, borders, and other elements in the platform.`,
            },
          ],
          image: Images.DemystDsColorsImage,
        },
        {
          heading: `Functional alignment containers for layout and spacing`,
          description: [
            {
              type: "paragraph",
              content: `Functional alignment containers can be used to create consistent layouts and spacing throughout the platform. The alignment containers include a variety of alignment options, such as centering, stretching, and distributing items along the main and cross axes.`,
            },
            {
              type: "paragraph",
              content: `The alignment containers also include a set of utility classes that can be used to apply alignment styles to elements in the platform.`,
            },
          ],
          image: Images.DemystDsAlignmentImage,
        },
        {
          heading: `Expansive button library with many variations and states`,
          description: [
            {
              type: "paragraph",
              content: `The button library handles myriad button types and use cases, with props for size, color, and state that can be used to create a wide variety of button styles throughout the platform. The button library includes a set of utility classes that can be used to apply button styles to elements in the platform.`,
            },
            {
              type: "paragraph",
              content: `The button library also includes a set of button components that can be used to create custom button types such as primary, secondary, and tertiary buttons, or buttons with or without  icons.`,
            },
          ],
          image: Images.DemystDsButtonsImage,
        },
        {
          heading: `Card component library for reusable content containers`,
          description: [
            {
              type: "paragraph",
              content: `The card component library can be used to create reusable content containers throughout the platform. The card library includes a set of props for size, color, and state that can be used to create a wide variety of card styles.`,
            },
            {
              type: "paragraph",
              content: `The card library is purpose-built for the platform and its specific use cases, such as data product cards, data source cards, and data visualization cards.`,
            },
          ],
          image: Images.DemystDsCardImage,
        },
        {
          heading: `Multi-syntax code block and code editor component library`,
          description: [
            {
              type: "paragraph",
              content: `The design system includes a code block and code editor component library that can be used to display and edit code snippets throughout the platform. The code block and code editor libraries include props for language, theme, and line numbers that can be used to create a wide variety of code styles.`,
            },
          ],
          image: Images.DemystDsCodeImage,
        },

        {
          heading: `Form elements and input components library`,
          description: [
            {
              type: "paragraph",
              content: `The design system includes a form elements and input components library that can be used to create forms and input fields throughout the platform. The form elements and input components library includes a set of props for size, color, and state that can be used to create a wide variety of form styles, wit built-in validation and error handling.`,
            },
          ],
          image: Images.DemystDsFormImage,
        },
        {
          heading: `Table component library that handles sorting, filtering, and pagination`,
          description: [
            {
              type: "paragraph",
              content: `Tables are often a complex component to build, especially when they need to handle sorting, filtering, and pagination. The design system includes a table component library that can be used to create tables throughout the platform that handle these features.`,
            },
            {
              type: "paragraph",
              content: `The table library includes a set of props for columns, data, sorting, filtering, and pagination that can be used to create user-friendly tables for different contexts.`,
            },
          ],
          image: Images.DemystDsTableImage,
        },
      ],
    },
  ],
};
