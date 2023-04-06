import {
  DemystHomeImage,
  DemystPlatformImage,
} from "../../assets/images/projects";

export const projectsPageData = [
  {
    name: "demyst-platform",
    protected: false,
    title: "Demyst Data Platform",
    summary: `SaaS platform used to discover, onboard, ingest, and monitor external data.`,
    description: [
      {
        type: "paragraph",
        content: "Last updated: March 31, 2023",
      },
      {
        type: "paragraph",
        content: "Last updated: March 31, 2023",
      },
      {
        type: "unordered-list",
        content: [
          {
            type: "list-item",
            content: [
              {
                type: "text-strong",
                content: `To send you marketing and promotional communications.`,
              },
              {
                type: "text",
                content: ` We and/or our third-party marketing partners may use the personal 
                  information you send to us for our marketing purposes, if this is in 
                  accordance with your marketing preferences. For example, when expressing 
                  an interest in obtaining information about us or our products and services, 
                  subscribing to marketing or otherwise contacting us, we will collect personal 
                  information from you. You can opt-out of our marketing emails at any time 
                  (see the "`,
              },
              {
                type: "text-emphasis",
                content: `WHAT ARE YOUR PRIVACY RIGHTS?`,
              },
              {
                type: "text",
                content: `" below).`,
              },
            ],
          },
          {
            type: "list-item",
            content: [
              {
                type: "text-strong",
                content: `Fulfill and manage your orders.`,
              },
              {
                type: "text",
                content: ` We may use your information to fulfill and manage your orders, 
                  payments, returns, and exchanges made through the Sites.`,
              },
            ],
          },
        ],
      },
    ],
    thumbnail: DemystPlatformImage,
    stack: ["React", "Redux", "LESS", "Cypress", "Storybook", "Ruby on Rails"],
    slides: [
      {
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: DemystHomeImage,
      },
      {
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: DemystPlatformImage,
      },
      {
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: DemystHomeImage,
      },
      {
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        image: DemystPlatformImage,
      },
    ],
  },
  {
    name: "demyst-marketing-site",
    protected: true,
    title: "Demyst Data Marketing Site",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    thumbnail: DemystHomeImage,
    stack: ["React", "Redux", "Next.js", "ButterCMS", "LESS", "Cypress"],
  },
  {
    name: "demyst-marketing-site",
    protected: true,
    title: "Demyst Data Marketing Site",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    thumbnail: DemystHomeImage,
    stack: ["React", "Redux", "Next.js", "ButterCMS", "LESS", "Cypress"],
  },
];
