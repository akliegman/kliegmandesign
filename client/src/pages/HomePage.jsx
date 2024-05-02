import {
  AboutMe,
  Expertise,
  Masthead,
  Projects,
  Skills,
} from "../components/Homepage";

import { homePageData } from "./data/homePageData";

import styles from "./HomePage.module.less";

export const HomePage = () => {
  const {
    about: aboutMeData,
    contact: contactData,
    expertise: expertiseData,
    masthead: mastheadData,
    projects: projectsData,
    skills: skillsData,
  } = homePageData;

  return (
    <div className={styles.Container}>
      <Masthead data={mastheadData} />
      <AboutMe data={aboutMeData} />
      <Expertise data={expertiseData} />
      <Skills data={skillsData} />
      <Projects data={projectsData} />
    </div>
  );
};
