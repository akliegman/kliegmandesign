import React from "react";
import "./Resume.scss";
import { resumeData } from "../../data/resumeData";
import { ResumeSection } from "./ResumeSection/ResumeSection";

export const Resume = () => {
  return (
    <main className="Resume">
      {Object.entries(resumeData).map(([key, value]) => (
        <ResumeSection key={key} type={key} data={value} />
      ))}
    </main>
  );
};
