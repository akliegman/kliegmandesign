import { GithubOutlined, LinkedinFilled } from "@ant-design/icons";

import Headshot from "../../assets/images/headshot.png";
import BackgroundVideo from "../../assets/videos/background.mp4";

export const homePageData = {
  masthead: {
    video: BackgroundVideo,
    image: Headshot,
    header: "Hello, I'm Adam.",
    subheader: `I'm an NYC-based software engineer specializing in design systems, frontend architecture, and AI-native products.`,
    ctas: [
      {
        name: "projects",
        label: "View Projects",
        link: "/projects",
      },
    ],
  },
  about: {
    header: "About Me",
    description: `I'm a frontend and design-systems engineer with over 13 years building user-facing products across EdTech, AI, FinTech, and eCommerce at scale. I founded and scaled a design system to full adoption across a 50-engineer organization, and I set technical direction for frontend architecture, accessibility, and AI product surfaces. I combine engineering best practices with design, data, and psychology to turn ambiguous product problems into durable systems other engineers build on. I lead through standards, documentation, migration strategy, and mentorship as much as through code. I'm always looking for new opportunities to learn, grow, and contribute, so please don't hesitate to reach out.`,
    ctas: [
      {
        name: "contact",
        label: "Get in Touch",
        link: "mailto:adam.j.kliegman@gmail.com",
      },
    ],
    social: [
      {
        name: "LinkedIn",
        icon: <LinkedinFilled />,
        link: "https://www.linkedin.com/in/adamkliegman/",
      },
      {
        name: "GitHub",
        icon: <GithubOutlined />,
        link: "https://github.com/akliegman/",
      },
    ],
    location: {
      header: "Located In",
      body: ["New York City (Remote)"],
    },
    education: {
      header: "Education",
      body: ["University of Wisconsin–Madison"],
    },
    years: {
      header: "Years Exp.",
      body: ["13"],
    },
    roles: {
      header: "Recent Roles",
      body: [
        "Senior Software Engineer",
        "Software Engineer III",
        "Director of Product",
        "Lead Product Engineer",
      ],
    },
    companies: {
      header: "Companies",
      body: [
        "B2C Startups",
        "B2B Startups",
        "SaaS Companies",
        "Digital Agencies",
      ],
    },
    verticals: {
      header: "Industries",
      body: ["AI", "EdTech", "FinTech", "eCommerce"],
    },
  },
  expertise: {
    header: "Areas of Expertise",
    description: `I have a diverse skill set and a wide range of experience across the product development lifecycle. Here are a few areas where I excel:`,
    areas: [
      {
        name: "Design Systems",
        description: `I found and scale design systems with semantic tokens, governance, and contribution models that drive full adoption and cut redundant UI code in half.`,
      },
      {
        name: "Frontend Architecture",
        description: `I set technical direction for frontend architecture on React and TypeScript, defining the standards, migration strategy, and patterns other engineers build on.`,
      },
      {
        name: "AI Product Engineering",
        description: `I build AI product surfaces end to end: streaming responses, structured outputs, tool calling, and human-in-the-loop review so users steer generation.`,
      },
      {
        name: "Accessibility",
        description: `I define and enforce accessibility to WCAG 2.2 AA, driving remediation, semantic HTML, keyboard navigation, and focus management across products.`,
      },
    ],
  },
  skills: {
    header: "Skills",
    description: `I have a wide range of technical skills that enable me to deliver value and craft in growth environments. Here are a few of my core competencies:`,
    categories: [
      {
        name: "Languages",
        skills: [
          "TypeScript",
          "JavaScript",
          "HTML",
          "CSS",
          "PostgreSQL",
          "GraphQL",
          "REST",
          "Bash",
        ],
      },
      {
        name: "Frameworks",
        skills: [
          "React",
          "Next.js",
          "Node.js",
          "Express",
          "Tailwind CSS",
          "Radix UI",
          "ShadCN",
          "Zustand",
          "TanStack Query",
        ],
      },
      {
        name: "Tools",
        skills: [
          "Git",
          "Storybook",
          "Vite",
          "Vitest",
          "Playwright",
          "Figma",
          "Vercel AI SDK",
          "Turborepo",
          "Sentry",
        ],
      },
    ],
    ctas: [
      {
        name: "resume",
        label: "View Résumé",
        link: "/resume",
      },
    ],
  },
  projects: {
    header: "Projects",
    description: `I've worked on a wide range of projects across various industries and technologies, with specialization in product-led and systemic frontend practices.`,
    ctas: [
      {
        name: "projects",
        label: "View Projects",
        link: "/projects",
      },
    ],
  },
  contact: {
    header: "Get in Touch",
    description: `I'm always looking for new opportunities to learn, grow, and contribute. If you'd like to work together, have a question, or just want to say hello, please don't hesitate to reach out. I'd love to hear from you!`,
    ctas: [
      {
        name: "contact",
        label: "Get in Touch",
        link: "mailto:adam.j.kliegman@gmail.com",
      },
    ],
    social: [
      {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/adamkliegman/",
      },
      {
        name: "GitHub",
        link: "https://github.com/akliegman/",
      },
    ],
  },
};
