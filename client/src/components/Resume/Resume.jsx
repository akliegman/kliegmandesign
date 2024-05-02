import { ResumeSection } from "./ResumeSection/ResumeSection";
import { ResumeHeader } from "./ResumeHeader/ResumeHeader";
import { resumeData } from "./data/resumeData";

import styles from "./Resume.module.less";

export const Resume = () => {
  return (
    <div className={styles.Container}>
      <ResumeHeader data={resumeData.header} />
      <div className={styles.Content}>
        {Object.entries(resumeData)
          .filter(([key]) => key !== "header")
          .map(([key, value]) => (
            <ResumeSection key={key} type={key} data={value} />
          ))}
      </div>
    </div>
  );
};
