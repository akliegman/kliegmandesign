// @ts-nocheck
import DemystLogo from "../../../assets/svg/DemystLogo.svg";
import NoodleLogo from "../../../assets/svg/NoodleLogo.svg";
import ShopletLogo from "../../../assets/svg/ShopletLogo.svg";
import TigerspikeLogo from "../../../assets/svg/TigerspikeLogo.svg";
import SvpgLogo from "../../../assets/svg/SvpgLogo.svg";
import WiscLogo from "../../../assets/svg/WiscLogo.svg";

export const resumeData = {
  header: {
    name: "Adam Kliegman",
    website: {
      link: "https://www.adamkliegman.com",
      name: "adamkliegman.com",
    },
    email: "adam.j.kliegman@gmail.com",
    phone: "+1 (516) 457-2014",
    location: "Greater NYC Area",
  },
  objective: `I am seeking a frontend developer position that will allow me 
    to leverage my skills to create user-friendly web applications on a 
    cutting-edge technology stack. I thrive in organizations  with a product-led 
    mindset & a mission-driven culture, particularly in scaling environments where 
    my experience can be put to good use.`,
  skills: [
    {
      title: "JavaScript",
      level: 5,
    },
    {
      title: "React",
      level: 5,
    },
    {
      title: "CSS/LESS",
      level: 5,
    },
    {
      title: "Git",
      level: 5,
    },
    {
      title: "Next.js",
      level: 5,
    },
    {
      title: "REST",
      level: 5,
    },
    {
      title: "MySQL/PostgreSQL",
      level: 5,
    },
    {
      title: "Storybook",
      level: 5,
    },
    {
      title: "Django/Flask",
      level: 4,
    },
    {
      title: "Redux",
      level: 3,
    },
    {
      title: "Node.js",
      level: 3,
    },
    {
      title: "GraphQL",
      level: 3,
    },
    {
      title: "TypeScript",
      level: 3,
    },
    {
      title: "Express",
      level: 3,
    },
    {
      title: "React Testing Library",
      level: 3,
    },
    {
      title: "Python",
      level: 3,
    },
    {
      title: "Vue.js",
      level: 2,
    },
  ],
  experience: [
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
              value: `Piloted the strategic re-imagination of the Demyst 
                product to an API-first SaaS platform experience by `,
            },
            {
              type: "highlight",
              value: `engineering 
              a UI focused on self-service & data management`,
            },
            {
              type: "text",
              value: `, catalyzing  Series-C funding; Brought new API-creation 
              technology to market that allows users to configure their own pipelines 
              using a custom JSON syntax, supporting 125% ARR growth YoY; 
              Engineered the frontend for marketing website
              & customer-facing platform; Developed team-wide roadmaps
              & processes, Managed a multilingual globally distributed 8
              member platform team; Engineered exhaustive atomic design
              system used across all products.`,
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
          title: "Sr. Product Manager, Platform",
          start_date: "Oct 2019",
          end_date: "Mar 2021",
          description: [
            {
              type: "text",
              value: "Led platform engineering team in the ",
            },
            {
              type: "highlight",
              value: `development & release of a new web product `,
            },
            {
              type: "text",
              value: `that enabled clients to push normalized & compliant external 
              data to their data lakes through a single API with auto machine-learned 
              data attributes, quadrupling platform's active user base; Acted as 
              principal engineer for company-wide rebrand & marketing site refresh, 
              growing site impressions by 60x (by ~16,000/ day) & doubling the lead 
              pipeline.`,
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
              value: "Led team of four to ",
            },
            {
              type: "highlight",
              value: "implement multi-million-dollar API pipelines ",
            },
            {
              type: "text",
              value: `that delivered lead data to third parties; Streamlined
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
                (by ~5,000/mo), & halved average sales cycle by `,
            },
            {
              type: "highlight",
              value: `engineering a tutoring services & administration web product`,
            },
            {
              type: "text",
              value: `; Integrated with best-in-class tools to bring operational
                efficiency to the sales & marketing teams; Developed experiences for
                user types (student, parent, tutor, admin) soup-to-nuts as part of 
                new startup rollout.`,
            },
          ],
          tech_stack: [
            "JavaScript",
            "Django",
            "SASS",
            "MySQL",
            "Firebase",
            "REST",
            "jQuery",
          ],
        },
        {
          title: "Frontend Developer",
          start_date: "Oct 2014",
          end_date: "Jan 2016",
          description: [
            {
              type: "highlight",
              value: `Engineered first-of-their-kind web products`,
            },
            {
              type: "text",
              value: ` that integrated with university systems to match students
                with tutors & allowed them to meet virtually via interactive 
                whiteboard & bespoke learning management platform.`,
            },
          ],
          tech_stack: [
            "JavaScript",
            "Flask/Jinja",
            "SASS",
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
              type: "highlight",
              value: `Developed & maintained the frontend, email templates, &
                admin site for shoplet.com & sister sites`,
            },
            {
              type: "text",
              value: `, which combined for over 20,000 daily unique visitors & 
              $50M in ARR. Launched new Canada website; Lead UI developer in 
              brand refresh.`,
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
              value: `Helped to secure three major clients by enabling day-to-day
                activities for leadership team; Maintained sales pipeline &
                forecasting; Focused on responsive, cross-platform tech
                solutions for Fortune 100 companies.`,
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
      website: "https://wisc.edu",
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
