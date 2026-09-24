import { screenshot } from "@/content/media";
import type { SideProject, WorkItem } from "@/content/types";

/**
 * Case studies, newest first. To add one, export its screenshots to `src/assets/work` (see the
 * README), record their sizes in `dimensions.json`, and add an entry here. Media that isn't ready
 * yet can use `pending(label)` and the page keeps its final layout until it arrives.
 */
export const work: readonly WorkItem[] = [
  {
    slug: "spellbook",
    title: "Spellbook design system",
    company: "MagicSchool AI",
    role: "Founded and led the system as a Senior Software Engineer",
    period: "2025 to present",
    summary:
      "The shared set of components, colors, and rules every screen at MagicSchool AI is built from. I founded it, and all 50 engineers now build with it.",
    lede: "Spellbook is MagicSchool AI's design system, and every teacher, student, and administrator screen in the product is built from it. I founded it in April 2025, built its foundation in the first days (the token pipeline, light and dark themes, and the composition layer), and wrote most of its 86 components. It reached full adoption across a 50-engineer organization and cut redundant UI code by half.",
    tags: ["Design system", "Tokens", "Accessibility"],
    stack: ["React", "TypeScript", "Radix UI", "shadcn/ui", "Tailwind CSS", "Storybook", "Vitest"],
    cover: screenshot(
      "ms-spellbook-foundations-typography-docs-light",
      "The Spellbook typography foundations page in Storybook, with a quick reference table followed by usage guidance",
    ),
    sections: [
      {
        id: "why",
        heading: "Why the product needed its own system",
        paragraphs: [
          "In early 2025 the app drew its interface from Material UI, some of it directly and some through a wrapper package meant to stage its removal. I spent the first months of the year moving components behind those wrappers, and that work made it clear the product still had no visual language of its own, which is the gap Spellbook was built to fill.",
          "I led the migration off Material UI onto one React and TypeScript foundation, and the legacy stack is now gone from the app. The documentation below shows how the system explains itself.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-spellbook-foundations-typography-docs-light",
              "The Spellbook typography foundations page in Storybook, with a quick reference table followed by usage guidance",
            ),
            caption:
              "Foundations documentation, restructured so every page opens with a quick reference, then when to use it, a canonical example, and rules.",
          },
        ],
      },
      {
        id: "tokens",
        heading: "Color as semantic roles",
        paragraphs: [
          "From the first token change, color has been a role, such as a primary solid background, error text, or the default border, that resolves differently in each theme. Components take a color like error instead of a palette value, and Tailwind's default palette is switched off entirely, which makes dark mode a property of the token layer. A page built from Spellbook is correct in both themes by construction.",
          "Tokens are authored as JSON primitives and semantic aliases, compiled to Tailwind theme values, and guarded by a freshness check, so a design change happens in one place. In 2026 I led a refresh of the neutrals, borders, shadows, and radius.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-spellbook-button-sizes-light",
              "A Spellbook button in four sizes, from smallest to largest, each with an icon and a label",
              { dark: "ms-spellbook-button-sizes-dark", specimen: true },
            ),
            caption:
              "One button family across four sizes. The capture follows this site's theme, so switching themes shows the same component re-resolved from its tokens.",
          },
          {
            media: screenshot(
              "ms-spellbook-toggleiconbutton-sizes-light",
              "Spellbook toggle icon buttons with a heart icon in four sizes",
              { specimen: true },
            ),
            caption:
              "Toggle icon buttons share the button size scale, so toolbars can mix them without misalignment.",
          },
        ],
      },
      {
        id: "slots",
        heading: "Structure through slots",
        paragraphs: [
          "Compound components take typed children as named slots, such as an option inside a select, a leading add-on inside a text input, or a right-hand panel inside a filter chip. Teams compose variations without a growing list of props, and a slot can replace its default rendering outright when a feature needs it.",
          "The filter chip shows why that matters. The tool catalog needed a preview beside its category options, and instead of forking the component, the preview became a slot any team can reuse.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-spellbook-filterchipselect-right-panel-open-light",
              "A Spellbook filter chip open, with checkbox options on the left and a preview panel on the right",
              { dark: "ms-spellbook-filterchipselect-right-panel-open-dark", specimen: true },
            ),
            caption:
              "The filter chip with its right-hand panel slot, which previews whichever option is hovered or focused.",
          },
          {
            media: screenshot(
              "ms-spellbook-textinput-slots-light",
              "Spellbook text inputs decorated with leading add-ons, adornments, and trailing add-ons",
              { dark: "ms-spellbook-textinput-slots-dark", specimen: true },
            ),
            caption:
              "Text inputs composed from slots keep one height and one focus treatment however they're decorated.",
          },
        ],
      },
      {
        id: "components",
        heading: "The component surface",
        paragraphs: [
          "Over the following year and a half I wrote most of the component surface: form controls, overlays, navigation, data display, and feedback. The buttons, icon buttons, and toggle buttons share one size scale, which I re-cut when the smallest step proved too cramped in real layouts.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-spellbook-select-descriptions-open-light",
              "A Spellbook select menu open, with a short description beside each option label",
              { specimen: true },
            ),
            caption:
              "Select options with descriptions, for settings where option names alone are ambiguous.",
          },
          {
            media: screenshot(
              "ms-spellbook-dropdownmenu-open-light",
              "A Spellbook dropdown menu with leading icons and chevrons marking items that open submenus",
              { specimen: true },
            ),
            caption: "A dropdown menu with aligned icons and submenu chevrons.",
          },
          {
            media: screenshot(
              "ms-spellbook-multiselect-values-light",
              "A Spellbook multi-select with two selected values shown as removable chips and a Clear All action",
              { specimen: true },
            ),
            caption:
              "Multi-select shows its selections as removable chips, with one action to clear them all.",
          },
        ],
      },
      {
        id: "accessibility",
        heading: "Accessibility as a merge requirement",
        paragraphs: [
          "Every new component needs an axe assertion in its test file before it can merge, which moves the automated part of accessibility into CI where nobody has to remember it.",
          "The rest of the work sits where automated checks can't reach: reflow and focus behavior at 400% zoom, landmark structure, and accessible-name props kept separate from overridable default copy, so a team using a component can't strip its label by accident. The application-wide remediation produced a VPAT assessment with minimal outstanding findings.",
        ],
      },
      {
        id: "documentation",
        heading: "Documentation for engineers and coding agents",
        paragraphs: [
          "I lead the design-system guild, which sets the contribution model, documentation standards, and roadmap for engineers and designers across the company. Settled questions are written up as architectural decision records so they stay settled, and every exported component ships with worked examples of correct and incorrect use.",
          "In 2026 the audience widened to coding agents. I rewrote the foundations documentation into one consistent schema, because those pages are what the design system's MCP server hands to agents, and every component root now carries a stable name attribute so tests and audits can find components without depending on class names.",
        ],
      },
    ],
  },
  {
    slug: "app-shell",
    title: "Navigation and page layout",
    company: "MagicSchool AI",
    role: "Built the page layout and navigation, and led the rollout",
    period: "2026",
    summary:
      "A new sidebar navigation and one consistent page layout for the teacher app, rolled out across the whole product in stages, with accessibility fixes along the way.",
    lede: "In 2026 MagicSchool's teacher app moved to a new shell: sidebar navigation, a mobile drawer, and a tool catalog split into Teaching, Student, and Workflows. I built PageContainer, the slotted layout every page now sits in, and the shell around it, migrated the app's pages onto it in batches, and removed more than 4,000 lines of legacy code once the rollout was permanent.",
    tags: ["Navigation", "Accessibility", "Rollout"],
    stack: ["React", "TypeScript", "Next.js", "Spellbook", "Container queries"],
    cover: screenshot(
      "ms-shell-teacher-home-light-desktop",
      "The MagicSchool teacher home page inside the new shell, with sidebar navigation on the left and a chat prompt above recommended tools",
      { dark: "ms-shell-teacher-home-dark-desktop" },
    ),
    sections: [
      {
        id: "problem",
        heading: "Pages that built their own frame",
        paragraphs: [
          "Before this work every page assembled its own header, actions, and alerts from a loose header component and a padded div, so pages drifted apart. Some had no main landmark at all, because the landmark that skip links target was rendered by page code.",
          "Restyling the header would have fixed the look and left that structure in place, so the layout had to own the structure instead.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-shell-teacher-home-light-desktop",
              "The MagicSchool teacher home page inside the new shell, with sidebar navigation on the left and a chat prompt above recommended tools",
              { dark: "ms-shell-teacher-home-dark-desktop" },
            ),
            caption:
              "The teacher home inside the shell. My part is the frame around the content: the sidebar navigation and the section headings. The capture follows this site's theme.",
          },
        ],
      },
      {
        id: "page-container",
        heading: "A layout that declares the page's anatomy",
        paragraphs: [
          "A page declares its title, actions, alert, content, and side panel, and PageContainer decides where they go, how they reflow, and what happens when the panel opens. An empty alert slot collapses on its own, so pages don't have to guard it.",
          "The header reflows with container queries against the content column, which means opening the resizable side panel reflows the header exactly the way a narrower window would.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-shell-all-tools-student-tab-dark-desktop",
              "The All Tools page on its Student tab in the dark theme, with a promotional banner above a grid of tools",
            ),
            caption:
              "All Tools on its Student tab. The tab header stays mounted while switching tabs, and the banner uses the promotional component so it never reads as a warning.",
          },
        ],
      },
      {
        id: "navigation",
        heading: "One navigation, two presentations",
        paragraphs: [
          "At medium widths and up the sidebar is fixed. Below that, a drawer hosts the same navigation component, forced open, so labels, grouping, and the account footer are identical across breakpoints, and expanded state lives in a layout store so it survives navigation.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-shell-teacher-home-dark-mobile",
              "The teacher home page at phone width in the dark theme, with a top bar and content stacked in one column",
            ),
            caption: "The home page at 390 pixels wide.",
          },
          {
            media: screenshot(
              "ms-shell-nav-drawer-open-dark-mobile",
              "The mobile navigation drawer open in the dark theme, showing the same items and account footer as the desktop sidebar",
            ),
            caption: "The mobile drawer, hosting the same navigation component as the sidebar.",
          },
        ],
      },
      {
        id: "rollout",
        heading: "Rolling out without a rewrite",
        paragraphs: [
          "The shell shipped behind a feature flag, and I migrated the app's route trees onto PageContainer in seven batches that each rendered correctly with the flag on and with it off. Once the rollout was permanent I removed the flag, every gated branch, and the unused navigation variants, adding 735 lines and deleting 4,144.",
        ],
      },
      {
        id: "accessibility",
        heading: "Accessibility the structure made possible",
        paragraphs: [
          "The side panel is an aside with a stable id. Focus moves into it when it opens and back when it closes, and in overlay mode the page behind it becomes inert. I moved the main landmark into the layout so every route has one, and fixed the five reflow failures an accessibility audit found at 400% zoom, in submenus, filter menus, the chat input, chat threads, and the sidebar.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-shell-banner-end-image-expanded-dark",
              "A Spellbook banner in its expanded variant in the dark theme, with a title, supporting text, actions, and an image at the end",
              { specimen: true },
            ),
            caption:
              "The Banner component, whose end image hides below medium widths so small screens keep the message and the action.",
          },
        ],
      },
    ],
  },
  {
    slug: "quizzes",
    title: "AI-graded quizzes",
    company: "MagicSchool AI",
    role: "Frontend lead for the first three months",
    period: "2025 to 2026",
    summary:
      "Quizzes teachers can assign, with AI grading and feedback, and a results view that shows what the class understood. I led the frontend for the first three months.",
    lede: "Quizzes turned MagicSchool's generated quizzes into something a teacher can assign: a teacher creates a quiz, students take it, AI grades their answers and gives feedback, and the teacher reads the results. I was the frontend lead for its first three months, across 28 pull requests covering the quiz list and editor, the creation form, the results dashboard, the student take flow, math-aware inputs, and an accessibility pass.",
    tags: ["Product", "AI feedback", "Data display"],
    stack: ["React", "TypeScript", "Next.js", "Spellbook"],
    cover: screenshot(
      "ms-quizzes-overview-light-desktop",
      "A quiz results overview for Fractions, Decimals, and Percentages, with an insights summary, the class average, and recommended next steps",
      { dark: "ms-quizzes-overview-dark-desktop" },
    ),
    sections: [
      {
        id: "results",
        heading: "Results a teacher can read in minutes",
        paragraphs: [
          "The hardest design problem was presenting results so a teacher with thirty students and five minutes can see what to do next. I structured the dashboard as two tabs on one page. Overview answers how the class did, and Questions and results answers which question went wrong, with a bar per question showing correct, incorrect, and partial answers.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-quizzes-overview-light-desktop",
              "A quiz results overview for Fractions, Decimals, and Percentages, with an insights summary, the class average, and recommended next steps",
              { dark: "ms-quizzes-overview-dark-desktop" },
            ),
            caption:
              "The overview as it looks today. The tabbed layout and the summary region at the top come from my original dashboard; the AI insights and next steps inside it were added later.",
          },
          {
            media: screenshot(
              "ms-quizzes-questions-results-light-desktop",
              "The Questions and results tab, with a result bar for each question showing correct, incorrect, and partial answers",
            ),
            caption: "Questions and results, with a result bar for each question.",
          },
        ],
      },
      {
        id: "drawer",
        heading: "Detail without losing the class",
        paragraphs: [
          "Selecting a student opens a drawer with their score and every question: their answer, whether it was correct, and the AI feedback they saw. A drawer keeps the class view behind it, where a separate page would lose that context.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-quizzes-overview-student-drawer-light-desktop",
              "A drawer for one student listing each question with their answer, a correctness badge, and AI feedback, over the class overview",
            ),
            caption:
              "The per-student drawer. The summary at its top and the feedback rating controls were added later.",
          },
        ],
      },
      {
        id: "creation",
        heading: "One form to create a quiz",
        paragraphs: [
          "Creating a quiz became one short form with a single Generate action, because a quiz is a handful of choices and a multi-step wizard would have hidden that. The quiz list has search, sortable columns, and a count of students who joined, with actions for each quiz in a row menu.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-quizzes-new-quiz-form-light-desktop",
              "The Create a Quiz form with grade, question counts, topic with file upload, and standards above one Generate button",
            ),
            caption: "Quiz creation as a single form.",
          },
          {
            media: screenshot(
              "ms-quizzes-list-row-actions-open-light-desktop",
              "The teacher quiz list with a row actions menu open, offering go to quiz, duplicate, delete, and student join info",
            ),
            caption: "The quiz list with its row actions open.",
          },
        ],
      },
      {
        id: "editing",
        heading: "Inline editing and math",
        paragraphs: [
          "I built EditableText in Spellbook for inline editing of question text and headings, then fixed its screen-reader behavior and the quiz question markup. A math-aware rich-text input works in teacher fields, the student answer box, and dark mode, and it was the largest single change in the project.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-quizzes-editabletext-default-light",
              "The Spellbook EditableText component showing multiline text ready for inline editing",
              { specimen: true },
            ),
            caption: "EditableText, the inline-edit primitive behind question text in the editor.",
          },
          {
            media: screenshot(
              "ms-quizzes-overview-light-mobile",
              "The quiz overview at phone width, with header actions wrapped under the title and cards stacked",
            ),
            caption: "The overview at 390 pixels wide.",
          },
        ],
      },
    ],
  },
  {
    slug: "moderation",
    title: "Student safety settings",
    company: "MagicSchool AI",
    role: "Built the settings overview and per-school alerts",
    period: "2026",
    summary:
      "The settings school districts use to decide how students' AI chats are screened for safety, and who is alerted, down to a single school.",
    lede: "District administrators use MagicSchool's moderation settings to decide how student chat is screened for safety concerns and who is alerted when a message is flagged. I rebuilt the entry point as a landing page that explains the system before asking for decisions, and delivered alert routing scoped to individual schools, so a large district can notify only the school where something happened.",
    tags: ["Safety", "Settings design", "Rollout"],
    stack: ["React", "TypeScript", "Next.js", "PostgreSQL", "Spellbook"],
    cover: screenshot(
      "ms-moderations-landing-light-desktop",
      "The moderation landing page with a How moderation works panel, then Who to notify and What to configure cards showing each setting's current state",
      { dark: "ms-moderations-landing-dark-desktop" },
    ),
    sections: [
      {
        id: "landing",
        heading: "Explain before configuring",
        paragraphs: [
          "These settings used to live on one crowded tabbed screen that asked for decisions without explaining them. The new landing page opens with a collapsible explanation of how moderation works, then groups settings by intent into who to notify and what to configure.",
          "Each card shows its current state, such as the number of alert recipients or how many categories flag a message versus block it, so an administrator sees the configuration before opening anything.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-moderations-landing-light-desktop",
              "The moderation landing page with a How moderation works panel, then Who to notify and What to configure cards showing each setting's current state",
              { dark: "ms-moderations-landing-dark-desktop" },
            ),
            caption: "The landing page. The capture follows this site's theme.",
          },
          {
            media: screenshot(
              "ms-moderations-landing-dark-mobile",
              "The moderation landing page at phone width in the dark theme, with the explanation above stacked cards",
            ),
            caption: "At 390 pixels wide the cards stack in the same order as on desktop.",
          },
        ],
      },
      {
        id: "language",
        heading: "Words that match what happens",
        paragraphs: [
          "Most categories flag a message by default instead of blocking it, so before launch I moved the keyword and denied-topic copy from blocking language to flagging language across 23 locales. Each settings area got its own route with a breadcrumb back to the landing page, because the design system's tabs are documented as unsuited to route-based navigation.",
        ],
      },
      {
        id: "school-alerts",
        heading: "Alerts for one school",
        paragraphs: [
          "Alert recipients used to be one list for the whole organization, so a multi-school district could alert its administrators about every school or none of them. School-specific recipients now sit beneath the organization-wide list in a searchable, sortable table with an edit action for each school. District staff keep their single list, and each school gains its own.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-moderations-alerting-school-recipients-dark-desktop",
              "The alerting settings in the dark theme, with the organization-wide recipient list above a searchable table of schools and their additional recipients",
            ),
            caption: "Organization-wide recipients, then the school table.",
          },
        ],
      },
      {
        id: "rollout",
        heading: "Changing high-stakes settings safely",
        paragraphs: [
          "The moderation page kept one public URL through the entire rollout. With the feature flag off, the request was rewritten to the old screen, and the page re-checks the flag on the server, so bookmarks, navigation, and support links never broke.",
          "School-scoped alerts shipped as a stack of small changes: the flag, a database-only migration, resolution logic that behaved identically to production with the flag off, the admin API, and finally the interface.",
        ],
      },
    ],
  },
  {
    slug: "tool-icons",
    title: "Icons for 80+ AI tools",
    company: "MagicSchool AI",
    role: "Built the icon system, tool cards, and motion",
    period: "2026",
    summary:
      "One icon system for more than 80 AI tools, so the catalog looks consistent in light and dark mode and a new tool never needs custom art.",
    lede: "MagicSchool's catalog shows more than 80 AI tools, and each used to carry its own one-off image, so the grid looked inconsistent and ignored dark mode. I replaced those images with a category-based icon system, rebuilt tool cards and icons as Spellbook components, and added hover and focus motion to navigation that stops when a person prefers reduced motion.",
    tags: ["Icons", "Motion", "Dark mode"],
    stack: ["React", "TypeScript", "SVG", "Spellbook"],
    cover: screenshot(
      "ms-icons-all-tools-teaching-light-desktop",
      "The Teaching tab of the tool catalog, with a grid of tool cards that each show a category icon in a consistent frame",
      { dark: "ms-icons-all-tools-teaching-dark-desktop" },
    ),
    sections: [
      {
        id: "categories",
        heading: "Icons that belong to categories",
        paragraphs: [
          "Redrawing every image in a consistent style would have fixed the look for a season and kept the cost, since every new tool would still need bespoke art with hard-coded colors. Each tool now inherits a duotone icon from its category, colored by theme tokens, so a new tool fits the catalog without new art. Partner tools keep their own marks.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-icons-all-tools-teaching-light-desktop",
              "The Teaching tab of the tool catalog, with a grid of tool cards that each show a category icon in a consistent frame",
              { dark: "ms-icons-all-tools-teaching-dark-desktop" },
            ),
            caption: "The Teaching catalog. The capture follows this site's theme.",
          },
          {
            media: screenshot(
              "ms-icons-all-tools-teaching-search-dark-desktop",
              "The tool search in the dark theme with quiz typed in, showing a matching tool beside its category icon and an option to start a chat with Raina",
            ),
            caption: "The same category icon follows a tool into search.",
          },
        ],
      },
      {
        id: "components",
        heading: "One tool card instead of two",
        paragraphs: [
          "Teacher and student tool cards had drifted into two implementations. I unified them into Spellbook's ToolCard and ToolIcon, where title, description, icon, and actions compose through slots, and SharpIcon renders the duotone art at four sizes that hold their detail down to dense lists.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-icons-toolicon-variety-light",
              "A row of Spellbook tool icons for different categories, sharing one frame, stroke weight, and color treatment",
              { dark: "ms-icons-toolicon-variety-dark", specimen: true },
            ),
            caption: "Tool icons across categories, distinguished by shape alone.",
          },
          {
            media: screenshot(
              "ms-icons-toolcard-actions-slot-light",
              "A Spellbook tool card for Essay Writer with its category icon, a description, and an edit action",
              { dark: "ms-icons-toolcard-actions-slot-dark", specimen: true },
            ),
            caption: "ToolCard with its actions slot.",
          },
          {
            media: screenshot(
              "ms-icons-sharpicon-sizes-dark",
              "A Spellbook duotone icon at four sizes on a dark background",
              { specimen: true },
            ),
            caption: "SharpIcon at its four sizes.",
          },
        ],
      },
      {
        id: "motion",
        heading: "Motion that knows when to stop",
        paragraphs: [
          "Navigation and chat icons animate on hover and focus. The shared animation hook checks for a reduced-motion preference and a disabled state before animating, so no call site has to remember. The first version used a third-party package loaded off the critical path, and a few weeks later I replaced it with nine animated icons we own, which fixed a reset bug and a hard-coded stroke color.",
          "I also removed a humanlike variant of Raina, the product's AI assistant, from the icons students see, treating how an assistant presents itself to children as a safety decision.",
        ],
        figures: [
          {
            media: screenshot(
              "ms-icons-navlink-animated-hover-dark",
              "A navigation link with a history icon, captured while hovered in the dark theme",
              { specimen: true },
            ),
            caption:
              "A navigation link on hover. Its icon animates on hover and focus, which a still frame can only suggest.",
          },
        ],
      },
      {
        id: "rollout",
        heading: "Rolled out, then cleaned up",
        paragraphs: [
          "The system shipped schema first, then behind a flag, then through cleanup, which removed the flags and 133 unused image assets. A second audit pass caught icons referenced through dynamically built paths that a plain search had missed, and those were restored before the cleanup merged.",
        ],
      },
    ],
  },
  {
    slug: "demyst-platform",
    title: "Self-service data platform",
    company: "Demyst Data",
    role: "Senior Product Manager, then Director of Product Management",
    period: "2019 to 2023",
    summary:
      "A platform where data teams find, test, and monitor external data on their own. I led the product and built its frontend.",
    lede: "Demyst gives data teams one place to find external data, try it, wire it into their systems, and keep an eye on its cost and quality. I led the company's move to an API-first, self-service SaaS platform, and I architected and built the customer platform's frontend myself while managing a distributed team of eight.",
    tags: ["Enterprise UI", "Product"],
    stack: ["React", "Redux", "Less", "Ruby on Rails", "REST", "Jest"],
    cover: screenshot(
      "demyst-platform-connector",
      "A Demyst data product page showing attributes, source metadata, a usage chart, and a table of top attributes by fill rate",
    ),
    sections: [
      {
        id: "data-products",
        heading: "Data product pages",
        paragraphs: [
          "Every data product has a page that answers the questions a team asks before paying for data: what attributes it returns, where it comes from, how often it updates, how well it matches their records, and how much of the budget it has used. The same page lets them inspect the schema, run sample queries, and start a pipeline.",
        ],
        figures: [
          {
            media: screenshot(
              "demyst-platform-connector",
              "A Demyst data product page showing attributes, source metadata, a usage chart, and a table of top attributes by fill rate",
            ),
            caption: "A data product page with metadata, usage against budget, and fill rates.",
          },
        ],
      },
      {
        id: "search",
        heading: "Search and discovery",
        paragraphs: [
          "Search covers both data products and prebuilt pipelines. Filters narrow results by source, quality, and update frequency, and tabs split them by use case.",
        ],
        figures: [
          {
            media: screenshot(
              "demyst-platform-search",
              "Demyst search results with filter controls, use-case tabs, and a list of data products with match rates",
            ),
            caption: "Search results with source, quality, and frequency filters.",
          },
        ],
      },
      {
        id: "building",
        heading: "Setting up a data product",
        paragraphs: [
          "Teams create a data product for a specific use case, describe it, set constraints such as launch date, region, and entity, and then attach the APIs, connectors, and data files that feed it. Demyst's JSON configuration syntax defined the endpoints and transformations behind each API.",
        ],
        figures: [
          {
            media: screenshot(
              "demyst-platform-product",
              "A new Demyst data product called Mortgage Approvals, with its description, constraints, and empty lists of APIs, connectors, and data files",
            ),
            caption: "A new data product, ready for its APIs, connectors, and data files.",
          },
        ],
      },
      {
        id: "governance",
        heading: "Governance and spend",
        paragraphs: [
          "Teams trigger the diligence workflow their audit and compliance processes require for each connector, and set alerts on update frequency, quality, and match rates. The billing report charts API spend over time by API, connector, or user, with daily totals, transaction counts, and cost per transaction.",
        ],
        figures: [
          {
            media: screenshot(
              "demyst-platform-billing",
              "The Demyst billing report with a line chart of daily API spend and a table of spend, transactions, and average cost per transaction",
            ),
            caption: "The billing report, broken down by API.",
          },
        ],
      },
    ],
  },
  {
    slug: "demyst-design-system",
    title: "Demyst design system",
    company: "Demyst Data",
    role: "Sole designer and developer",
    period: "2019 to 2023",
    summary:
      "The shared components and styles behind every Demyst product, which I designed and built on my own.",
    lede: "I designed and built Demyst's design system on my own: tokens for color, type, and spacing, a prop-driven React component library, and a Storybook site where engineers could try every component's props and states. It shipped as an npm package wired into the platform's build, so a change to the system reached the product without a manual upgrade.",
    tags: ["Design system", "Storybook"],
    stack: ["React", "Less", "CSS Modules", "Storybook", "Jest", "Figma"],
    cover: screenshot(
      "demyst-ds-colors",
      "The Demyst design system color library in Storybook, showing scales of each hue from light to dark",
    ),
    sections: [
      {
        id: "foundations",
        heading: "Foundations",
        paragraphs: [
          "Design tokens defined color, type, and spacing once and generated the styles every component used. The color library covered full scales for each hue, with utility classes for text, background, and border color, and alignment containers handled the layout patterns the platform repeated most.",
        ],
        figures: [
          {
            media: screenshot(
              "demyst-ds-colors",
              "The Demyst design system color library in Storybook, showing scales of each hue from light to dark",
            ),
            caption: "The color library.",
          },
          {
            media: screenshot(
              "demyst-ds-alignment",
              "Storybook examples of Demyst alignment containers placing a row of buttons right-aligned, stacked, centered, and left-aligned",
            ),
            caption: "Alignment containers for recurring layouts.",
          },
        ],
      },
      {
        id: "components",
        heading: "Components",
        paragraphs: [
          "The library covered what an enterprise data product needs every day: buttons in every size, color, and state, cards for data products and sources, form inputs with validation built in, a code block and editor with syntax highlighting, and a table that handles sorting, filtering, and pagination. Every component was documented in Storybook with controls for each prop.",
        ],
        figures: [
          {
            media: screenshot(
              "demyst-ds-buttons",
              "The Demyst button documentation in Storybook with a live preview, its code, and a props table",
            ),
            caption: "Buttons.",
          },
          {
            media: screenshot(
              "demyst-ds-table",
              "A Demyst table in Storybook with a search toolbar, selectable rows, sortable columns, and pagination",
            ),
            caption: "Table with sorting, filtering, and pagination.",
          },
          {
            media: screenshot(
              "demyst-ds-form",
              "A Demyst form in Storybook with email and password fields, a radio group, checkboxes, and a submit button",
            ),
            caption: "Form inputs.",
          },
          {
            media: screenshot(
              "demyst-ds-code",
              "The Demyst code editor in Storybook showing a highlighted curl request with a JSON body on a dark theme",
            ),
            caption: "Code block and editor.",
          },
        ],
      },
    ],
  },
  {
    slug: "archer-law",
    title: "Archer Law website",
    company: "RubyLaw",
    role: "Software Engineer III, lead developer on the project",
    period: "2023 to 2024",
    summary:
      "A law firm website on RubyLaw's content platform that the firm edits itself, built to meet accessibility standards.",
    lede: "Archer is a law firm site built on RubyLaw's headless content platform and its shared React component library. As lead developer I built the frontend to the firm's design, wrote the connectors that pull each page's content from the RubyLaw API, and handled WCAG compliance, responsive behavior, and cross-browser support.",
    tags: ["Accessibility", "Brand"],
    stack: ["React", "Node.js", "Redux", "CSS Modules", "Puppeteer", "Google Maps API"],
    cover: screenshot(
      "archer-home",
      "The Archer Law homepage with a red header, a hero image of a courthouse, and featured content below",
    ),
    sections: [
      {
        id: "homepage",
        heading: "A homepage the firm can rearrange",
        paragraphs: [
          "The homepage is built from modular sections the firm reorders and edits in the RubyLaw CMS, including the hero slideshow. The sticky header changes color as the page scrolls and gives direct access to child navigation.",
        ],
        figures: [
          {
            media: screenshot(
              "archer-home",
              "The Archer Law homepage with a red header, a hero image of a courthouse, and featured content below",
            ),
            caption: "The homepage.",
          },
        ],
      },
      {
        id: "practice-areas",
        heading: "Practice areas and services",
        paragraphs: [
          "Practice areas and services are structured content with parent, child, and grandchild levels, each linked to the attorneys, articles, and news that belong to it and indexed in RubyLaw's search. Practice pages combine modular sections while keeping to the firm's brand.",
        ],
        figures: [
          {
            media: screenshot(
              "archer-services",
              "The Archer Law services index with practices and industries in two columns and expandable sub-practices",
            ),
            caption: "The services index.",
          },
          {
            media: screenshot(
              "archer-practice",
              "The Archer Law Appellate Practice page with a courthouse banner, an overview, and primary contacts",
            ),
            caption: "A practice area page.",
          },
        ],
      },
      {
        id: "insights",
        heading: "News and insights",
        paragraphs: [
          "Articles carry authors, dates, categories, and tags, relate to practice areas and attorneys, and can be filtered several ways. I also built proposal generation that produces Word documents, and interactive office maps on the Google Maps API.",
        ],
        figures: [
          {
            media: screenshot(
              "archer-news",
              "The Archer Law News and Insights listing with search, filters for professionals, practices, industries, type, and date, and article categories with counts",
            ),
            caption: "News and insights.",
          },
        ],
      },
    ],
  },
];

export function findWork(slug: string | undefined): WorkItem | undefined {
  return work.find((item) => item.slug === slug);
}

export const sideProjects: SideProject[] = [
  {
    title: "Form wizard",
    summary:
      "A multi-step form wizard with a Next.js API and a configurable admin section, built for a coding exercise.",
    href: "https://form-wizard-demo.vercel.app/",
    codeHref: "https://github.com/akliegman/form-wizard-demo",
  },
  {
    title: "Storybook design system",
    summary: "A small design system and component library built with Next.js and Storybook.",
    href: "https://storybook.adamkliegman.com/",
    codeHref: "https://github.com/akliegman/design-system",
  },
];
