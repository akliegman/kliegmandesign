import { GithubOutlined, LinkedinFilled } from "@ant-design/icons";

import Headshot from "../../assets/images/headshot.png";
import BackgroundVideo from "../../assets/videos/background.mp4";

export const homePageData = {
  masthead: {
    video: BackgroundVideo,
    image: Headshot,
    header: "Hello, I'm Adam.",
    subheader: `I'm an NYC-based senior frontend developer with over a decade of experience.`,
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
    description: `With a background in development, design, and product leadership, I combine engineering best practices with design, data, psychology, and practicality to deliver value and craft in growth environments. I'm experienced across the entire product development lifecycle, and can fluently interface with cross-functional teams. I'm passionate about crafting delightful user experiences and building scalable, maintainable, and performant applications. I take special interest in design systems and configuration-driven component libraries that enable rapid development and brand consistency. I'm always looking for new opportunities to learn, grow, and contribute, so please don't hesitate to reach out.`,
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
      body: ["Hoboken, NJ (Remote)"],
    },
    education: {
      header: "Education",
      body: ["University of Wisconsin"],
    },
    years: {
      header: "Years Exp.",
      body: ["11"],
    },
    roles: {
      header: "Recent Roles",
      body: [
        "Software Engineer III",
        "Director of Product",
        "Lead Product Developer",
        "UX/UI Engineer",
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
      body: ["FinTech", "EdTech", "LegalTech", "eCommerce"],
    },
  },
  expertise: {
    header: "Areas of Expertise",
    description: `I have a diverse skill set and a wide range of experience across the product development lifecycle. Here are a few areas where I excel:`,
    areas: [
      {
        name: "Frontend Development",
        description: `I specialize in building modern, responsive, and accessible web applications using the latest frontend technologies and best practices.`,
      },
      {
        name: "Design Systems",
        description: `I have a passion for building and maintaining design systems and component libraries that enable rapid development and brand consistency.`,
      },
      {
        name: "UI/UX Design",
        description: `I have a strong eye for designing user interfaces and user experiences that are intuitive, engaging, and delightful.`,
      },
      {
        name: "Product Leadership",
        description: `I have experience leading product development teams, managing product roadmaps, and working cross-functionally to deliver value.`,
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
          "JavaScript",
          "TypeScript",
          "HTML",
          "CSS",
          "SASS/Less",
          "MySQL/PostgreSQL",
          "GraphQL",
          "REST",
          "Bash",
        ],
      },
      {
        name: "Frameworks",
        skills: [
          "React",
          "Node.js",
          "Express",
          "Next.js",
          "Gatsby",
          "Django",
          "Flask",
          "Vue",
        ],
      },
      {
        name: "Tools",
        skills: [
          "Git",
          "Webpack",
          "Babel",
          "Jest",
          "Puppeteer",
          "Cypress",
          "Storybook",
          "Figma",
          "Sketch",
          "Photoshop",
          "Illustrator",
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
    description: `I've worked on a wide range of projects across various industries and technologies. Much of my work is proprietary, but click below to view a selection of my recent projects. If you need a login to view my private projects, please don't hesitate to reach out.`,
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
