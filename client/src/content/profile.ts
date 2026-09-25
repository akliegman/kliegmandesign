import { AccessibilityIcon, CompassIcon, LayersIcon, type LucideIcon } from "lucide-react";

export const profile = {
  name: "Adam Kliegman",
  role: "Software engineer, design systems and frontend architecture",
  email: "adam.j.kliegman@gmail.com",
  location: "New York area, working remotely",
  current: "Senior Software Engineer at MagicSchool AI",
  focus: "Design systems, frontend, accessibility, AI",
  resumePath: "/adamkliegman_resume_2026.pdf",
  links: {
    linkedIn: "https://www.linkedin.com/in/adamkliegman/",
    gitHub: "https://github.com/akliegman",
  },
  description:
    "Adam Kliegman is a software engineer who builds design systems, frontend architecture, and AI product surfaces. He founded Spellbook, the design system at MagicSchool AI.",
} as const;

/** Primary navigation, in display order. The résumé link is rendered separately because it opens a PDF. */
export const navigation = [
  { label: "Work", to: "/work" },
  { label: "AI", to: "/ai" },
  { label: "System", to: "/system" },
  { label: "About", to: "/about" },
] as const;

export interface Principle {
  /** Presentational icon shown beside the title. */
  icon: LucideIcon;
  title: string;
  body: string;
  /** Case study that shows this in practice. */
  evidence: { label: string; to: string };
}

export const principles: Principle[] = [
  {
    icon: LayersIcon,
    title: "Design systems as infrastructure",
    body: "Tokens, components, and docs built so the right way to ship a screen is also the fastest.",
    evidence: { label: "Spellbook", to: "/work/spellbook" },
  },
  {
    icon: AccessibilityIcon,
    title: "Accessibility enforced in code",
    body: "Semantic HTML, full keyboard support, and checks that block a merge when something breaks.",
    evidence: { label: "Navigation and page layout", to: "/work/app-shell#accessibility" },
  },
  {
    icon: CompassIcon,
    title: "Product judgment",
    body: "Years leading product at Noodle and Demyst mean I start from the job a user is trying to finish.",
    evidence: { label: "Student safety settings", to: "/work/moderation" },
  },
];

export interface Role {
  company: string;
  detail: string;
  titles: { title: string; period: string }[];
}

export const experience: Role[] = [
  {
    company: "MagicSchool AI",
    detail: "Education, AI",
    titles: [{ title: "Senior Software Engineer", period: "2025 to present" }],
  },
  {
    company: "RubyLaw",
    detail: "Legal marketing technology",
    titles: [{ title: "Software Engineer III", period: "2023 to 2024" }],
  },
  {
    company: "Demyst Data",
    detail: "Fintech data platform, acquired by Feedzai",
    titles: [
      { title: "Director of Product Management", period: "2021 to 2023" },
      { title: "Senior Product Manager", period: "2019 to 2021" },
    ],
  },
  {
    company: "Noodle",
    detail: "Education",
    titles: [
      { title: "Senior Product Manager", period: "2018 to 2019" },
      { title: "Lead Product Engineer", period: "2016 to 2018" },
      { title: "UX/UI Engineer", period: "2014 to 2016" },
    ],
  },
  {
    company: "Shoplet",
    detail: "Ecommerce",
    titles: [{ title: "Frontend Developer", period: "2013 to 2014" }],
  },
  {
    company: "Tigerspike",
    detail: "Mobile app agency",
    titles: [{ title: "Business Analyst", period: "2012 to 2013" }],
  },
];

export const skills = [
  {
    group: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Radix UI",
      "shadcn/ui",
      "Zustand",
      "TanStack Query",
    ],
  },
  {
    group: "Design systems",
    items: [
      "Design tokens",
      "Component APIs",
      "Theming",
      "Storybook",
      "Visual regression testing",
      "Figma",
    ],
  },
  {
    group: "Accessibility",
    items: [
      "WCAG 2.2 AA",
      "Section 508 and VPAT",
      "Keyboard and focus management",
      "Screen reader support",
      "axe-core",
    ],
  },
  {
    group: "AI engineering",
    items: [
      "Anthropic and OpenAI APIs",
      "Vercel AI SDK",
      "Streaming UI",
      "Structured outputs",
      "Tool calling",
      "Evals",
      "MCP",
    ],
  },
  {
    group: "Platform and testing",
    items: [
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Vitest",
      "Playwright",
      "GitHub Actions",
      "Turborepo",
    ],
  },
] as const;

export const education = [
  { school: "Silicon Valley Product Group", detail: "Product Leaders Academy, 2020" },
  { school: "University of Wisconsin–Madison", detail: "B.S. in Psychology" },
] as const;
