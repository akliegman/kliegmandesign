// @ts-nocheck
import "./Resume.less";
import { resumeData } from "./data/resumeData";
import { ResumeSection } from "./ResumeSection/ResumeSection";
import { ResumeHeader } from "./ResumeHeader/ResumeHeader";

export const Resume = () => {
  return (
    <div className="Resume">
      <ResumeHeader data={resumeData.header} />
      {Object.entries(resumeData)
        .filter(([key]) => key !== "header")
        .map(([key, value]) => (
          <ResumeSection key={key} type={key} data={value} />
        ))}
    </div>
  );
};
