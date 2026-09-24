import { BracesIcon, SparklesIcon, SquareTerminalIcon } from "lucide-react";

import { screenshot } from "@/content/media";
import type { WorkSection } from "@/content/types";

export const aiPage = {
  title: "How I work with AI",
  lede: "I use AI in three places: in the products I build, in the codebase those products live in, and in my own day-to-day engineering. Each needs different guardrails, and most of them end up living in the design system.",
  sections: [
    {
      id: "product",
      heading: "In the product: output a person can judge",
      paragraphs: [
        "MagicSchool is an AI product for teachers, and most of what I build either shows model output or configures it. I build those surfaces end to end: streaming responses, structured output validated against a schema, retry and fallback paths for when a model misbehaves, and review steps so educators can edit and steer what the model produces.",
        "In AI-graded quizzes, the per-student drawer shows each answer next to the AI feedback that student actually saw, so a teacher can check the model's judgment question by question. The moderation settings decide how students' conversations with AI are screened and who hears about a flag, and they explain the system before asking for a decision. Presentation matters here too, which is why I removed a humanlike variant of Raina, the product's assistant, from the icons students see.",
      ],
      figures: [
        {
          media: screenshot(
            "ms-quizzes-overview-student-drawer-light-desktop",
            "A drawer for one student listing each question with their answer, a correctness badge, and AI feedback, over the class overview",
          ),
          caption: "Each answer beside the AI feedback the student saw.",
        },
      ],
    },
    {
      id: "codebase",
      heading: "In the codebase: rules an agent can check",
      paragraphs: [
        "Coding agents are good at producing code that looks idiomatic, so they rarely write anything obviously broken. What they write is plausible code that drifts a little on each pull request, and no single change is bad enough for a reviewer to justify blocking it. That makes the design system the natural place to hold the line, since its rules can be written down once and checked by machines on every change.",
        "At MagicSchool, Spellbook is exposed to coding agents through an MCP server that serves its components, tokens, guidelines, and a usage validator, so an agent checks its work against the same source of truth engineers use. I wrote the package conventions that engineers and agents both follow, rebuilt the foundations documentation into one schema an agent can read reliably, tagged every component with a stable name so tests and audits can find it, and added animation support to the server's icon search.",
        "The merge requirements work the same way. An accessibility assertion for every new component and a freshness check on generated tokens hold whether a person or an agent wrote the change.",
      ],
      figures: [
        {
          media: screenshot(
            "ms-spellbook-foundations-typography-docs-light",
            "The Spellbook typography foundations page in Storybook, with a quick reference table followed by usage guidance",
          ),
          caption:
            "Foundations documentation in one schema: quick reference, when to use, a canonical example, and rules.",
        },
      ],
    },
    {
      id: "daily",
      heading: "In my own work: an agent that starts from my standards",
      paragraphs: [
        "I work with Claude Code every day. The leverage comes from what surrounds it: I maintain reusable skills and project conventions that encode how I build components, tokens, tests, and reviews, so an agent starts from my standards and the repository's own patterns, and read-only helper agents handle research and audits without touching code.",
        "Faster implementation moves the bottleneck to judgment. I decide what to build and how it should be structured, I read every diff, and nothing merges until it passes the same lint, type, test, and accessibility checks as code I typed myself.",
        "This site was built that way. I set the direction and the standards, an agent did much of the typing, and every page goes through the checks documented on the system page.",
      ],
    },
  ] satisfies WorkSection[],
};

/** The three short points the home page shows before linking here. */
export const aiSummary = [
  {
    icon: SparklesIcon,
    title: "In the product",
    body: "AI output people can check and correct before they use it.",
  },
  {
    icon: BracesIcon,
    title: "In the codebase",
    body: "A design system agents can read, so generated code follows the same rules.",
  },
  {
    icon: SquareTerminalIcon,
    title: "In my own work",
    body: "Claude Code every day, with skills that carry my standards.",
  },
] as const;
