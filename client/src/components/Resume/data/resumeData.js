import RubyLawLogo from "../../../assets/svg/RubyLawLogo.svg";
import DemystLogo from "../../../assets/svg/DemystLogo.svg";
import NoodleLogo from "../../../assets/svg/NoodleLogo.svg";
import ShopletLogo from "../../../assets/svg/ShopletLogo.svg";
import TigerspikeLogo from "../../../assets/svg/TigerspikeLogo.svg";
import SvpgLogo from "../../../assets/svg/SvpgLogo.svg";
import WiscLogo from "../../../assets/svg/WiscLogo.svg";
import Headshot from "../../../assets/images/headshot.png";

export const resumeData = {
  header: {
    image: Headshot,
    name: "Adam Kliegman",
    email: "adam.j.kliegman@gmail.com",
    phone: "+1 (516) 457-2014",
    location: "Greater NYC Area",
  },
  summary: `Senior frontend developer with over a decade of tech experience.
  Combines engineering best practices with design, data, psychology, and
  practicality to deliver value and craft in team environments. Experienced
  across the entire product development lifecycle, and can fluently interface
  with cross-functional teams.`,
  skills: [
    {
      name: "Languages",
      items: [
        {
          title: "JavaScript",
          level: 5,
        },
        {
          title: "TypeScript",
          level: 4,
        },
        {
          title: "HTML",
          level: 5,
        },
        {
          title: "CSS",
          level: 5,
        },
        {
          title: "SASS/Less",
          level: 5,
        },
        {
          title: "MySQL/PostgreSQL",
          level: 4,
        },
      ],
    },
    {
      name: "Frameworks",
      items: [
        {
          title: "React",
          level: 5,
        },
        {
          title: "Next.js",
          level: 5,
        },
        {
          title: "Node.js",
          level: 5,
        },
        {
          title: "Express",
          level: 4,
        },
        {
          title: "Rest APIs",
          level: 5,
        },
        {
          title: "Redux",
          level: 4,
        },
        {
          title: "Gatsby",
          level: 4,
        },
        {
          title: "Vue",
          level: 3,
        },
        { title: "GraphQL", level: 3 },
        { title: "Django/Flask", level: 4 },
      ],
    },
    {
      name: "Tools",
      items: [
        {
          title: "Git",
          level: 5,
        },
        {
          title: "Webpack",
          level: 5,
        },
        {
          title: "Storybook",
          level: 5,
        },
        {
          title: "LightHouse",
          level: 5,
        },
        {
          title: "A11y",
          level: 5,
        },
        {
          title: "Babel",
          level: 5,
        },
        {
          title: "Jest",
          level: 4,
        },
        {
          title: "Puppeteer",
          level: 4,
        },
        {
          title: "Cypress",
          level: 3,
        },
      ],
    },
    {
      name: "Design",
      items: [
        {
          title: "Figma",
          level: 5,
        },
        {
          title: "Sketch",
          level: 5,
        },
        {
          title: "Adobe Suite",
          level: 5,
        },
        {
          title: "Zeplin",
          level: 5,
        },
        {
          title: "Design Systems",
          level: 5,
        },
        {
          title: "Atomic Design",
          level: 5,
        },
        {
          title: "Material Design",
          level: 5,
        },
        {
          title: "WCAG/ADA",
          level: 5,
        },
        {
          title: "Responsive Design",
          level: 5,
        },
        {
          title: "SEO",
          level: 5,
        },
      ],
    },
    {
      name: "Methodologies",
      items: [
        {
          title: "Agile",
          level: 5,
        },
        {
          title: "Scrum",
          level: 5,
        },
        {
          title: "Kanban",
          level: 5,
        },
        {
          title: "Lean",
          level: 5,
        },
        {
          title: "Product Led Growth",
          level: 5,
        },
        {
          title: "Design Thinking",
          level: 5,
        },
        {
          title: "User Centered Design",
          level: 5,
        },
      ],
    },
  ],
  experience: [
    {
      name: "RubyLaw",
      type: "MarTech SaaS",
      transaction_type: "Agency",
      website: "https://rubylaw.com",
      logo: RubyLawLogo,
      items: [
        {
          title: "Software Engineer III",
          start_date: "Jul 2023",
          end_date: "Present",
          description: [
            {
              type: "text",
              value: `Engineering an integrating Figma design system, stock
                component library, React starter toolkit, pdf/word document
                generator, and backend CLM for the country's leading law firms
                (20 of the top 50), enabling them to build, configure, maintain
                & update their websites, blogs, intranets & extranets. Working
                with designers to build custom CLM-powered & WCAG/ADA compliant
                websites using core stock component library & React toolkit.`,
            },
          ],
          tech_stack: [
            "JavaScript",
            "React",
            "Redux",
            "Sass",
            "CSS Modules",
            "Storybook",
            "Express",
            "Node.js",
            "Elastic Search",
            "Puppeteer",
          ],
        },
      ],
    },
    {
      name: "Demyst Data",
      type: "FinTech SaaS",
      transaction_type: "B2B",
      website: "https://demyst.com",
      logo: DemystLogo,
      items: [
        {
          title: "Director of Product, Platform",
          start_date: "Mar 2021",
          end_date: "Jan 2023",
          description: [
            {
              type: "text",
              value: `Drove the strategic re-imagination of the Demyst product
                to an API-first SaaS platform experience by engineering a UI
                focused on self-service & data management, catalyzing Series-C
                funding; Engineered exhaustive atomic design system used across
                all products; Engineered the frontend for marketing website &
                customer- facing platform; Managed a multilingual globally
                distributed 8 member platform team.`,
            },
          ],
          tech_stack: [
            "JavaScript",
            "React",
            "Redux",
            "LESS",
            "Storybook",
            "Ruby on Rails",
            "ButterCMS",
            "Next.js",
            "REST",
            "PostGreSQL",
            "Cypress",
          ],
        },
        {
          title: "Sr. Technical Product Manager",
          start_date: "Oct 2019",
          end_date: "Mar 2021",
          description: [
            {
              type: "text",
              value: `Liaised with engineering team in the development & release
                 of a new web product that enabled clients to push external data
                to their data lakes, quadrupling platform's active user base;
                Principal engineer for company-wide rebrand & marketing site
                refresh, growing site impressions by 6,000/ day & doubling the
                lead pipeline.`,
            },
          ],
          tech_stack: [
            "JavaScript",
            "React",
            "Redux",
            "LESS",
            "Zeplin",
            "Ruby on Rails",
            "Python",
            "Sklearn",
            "REST",
            "PostGreSQL",
            "Jest",
          ],
        },
      ],
    },
    {
      name: "Noodle",
      type: "EdTech",
      transaction_type: "B2B2C/B2C",
      website: "https://noodle.com",
      logo: NoodleLogo,
      items: [
        {
          title: "Sr. Product Manager",
          start_date: "Feb 2018",
          end_date: "Mar 2019",
          description: [
            {
              type: "text",
              value: `Led team of four to implement multi-million-dollar API
                pipelines that delivered lead data to third parties; Streamlined
                company-wide operational bottlenecks, inconsistencies, &
                tightly-coupled interdependencies by engineering dashboards,
                roadmaps, & implementing agile development processes.`,
            },
          ],
        },
        {
          title: "Lead Product Developer",
          start_date: "Jan 2016",
          end_date: "Feb 2018",
          description: [
            {
              type: "text",
              value: `Doubled YoY revenue (> $2M annually), grew site traffic
                (by ~5,000/mo), & halved average sales cycle by engineering a
                tutoring services & administration web product; Developed
                experiences for user types (student, parent, tutor, admin)
                soup-to-nuts as part of new startup rollout.`,
            },
          ],
          tech_stack: [
            "JavaScript",
            "Django",
            "Sass",
            "MySQL",
            "Firebase",
            "REST",
            "jQuery",
          ],
        },
        {
          title: "UX/UI Engineer",
          start_date: "Oct 2014",
          end_date: "Jan 2016",
          description: [
            {
              type: "text",
              value: `Engineered first-of-their-kind web products that
                integrated with university systems to match students with tutors
                & allowed them to meet virtually via interactive whiteboard &
                bespoke learning management platform.`,
            },
          ],
          tech_stack: [
            "JavaScript",
            "Flask/Jinja",
            "Sass",
            "MySQL",
            "Firebase",
            "REST",
            "jQuery",
          ],
        },
      ],
    },
    {
      name: "Shoplet",
      type: "eCommerce",
      transaction_type: "B2C",
      website: "https://shoplet.com",
      logo: ShopletLogo,
      items: [
        {
          title: "Frontend Developer",
          start_date: "Sep 2013",
          end_date: "Jun 2014",
          description: [
            {
              type: "text",
              value: `Developed & maintained the frontend, email templates, &
                admin site for shoplet.com & sister sites (20,000 daily unique
                visitors & $50M in ARR). Launched new Canada website; Lead UI
                developer in brand refresh.`,
            },
          ],
          tech_stack: [
            "JavaScript",
            "Wordpress",
            "php",
            "CSS",
            "jQuery",
            "Bootstrap",
          ],
        },
      ],
    },
    {
      name: "Tigerspike",
      type: "Agency",
      website: "https://www.concentrix.com",
      logo: TigerspikeLogo,
      items: [
        {
          title: "Business Analyst",
          start_date: "Aug 2012",
          end_date: "Jun 2013",
          description: [
            {
              type: "text",
              value: `Key player in securing 3 high-value clients (>$5M) by
                structuring activities for leadership team; Maintained sales
                pipeline & forecasting; Focused on responsive, cross-platform
                tech solutions for Fortune 100 companies.`,
            },
          ],
        },
      ],
    },
  ],
  education: [
    {
      name: "Silicon Valley Product Group",
      type: "Bootcamp",
      website: "https://svpg.com",
      logo: SvpgLogo,
      items: [
        {
          title: "Product Leaders Academy",
          start_date: "Jun 2020",
          end_date: "Sep 2020",
          description: [
            {
              type: "highlight",
              value: "SVPG Product Leadership Program",
            },
            {
              type: "text",
              value: "; founded by Marty Cagan; Classes based off of ",
            },
            {
              type: "emphasis",
              value: "Inspired: How to Create Tech Products Customers Love ",
            },
            {
              type: "text",
              value: "and ",
            },
            {
              type: "emphasis",
              value: "Empowered: Ordinary People, Extraordinary Products",
            },
            {
              type: "text",
              value: ".",
            },
          ],
        },
      ],
    },
    {
      name: "University of Wisconsin-Madison",
      type: "University",
      website: "https://wisc.edu/",
      logo: WiscLogo,
      items: [
        {
          title: "B.S. in Psychology",
          start_date: "Aug 2006",
          end_date: "Dec 2009",
          description: [
            {
              type: "highlight",
              value: "Honors Program in the Liberal Arts",
            },
            {
              type: "text",
              value: `; Completed pre-med requirements; Research assistant at
                Cognitive Affective Neuroscience & Behavior Lab.`,
            },
          ],
        },
      ],
    },
  ],
};
