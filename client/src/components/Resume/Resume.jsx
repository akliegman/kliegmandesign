import React from "react";
import "./Resume.css";
import { resumeData } from "../../data/resumeData";
import { ResumeSection } from "./ResumeSection/ResumeSection";
import { ResumeHeader } from "./ResumeHeader/ResumeHeader";

export const Resume = () => {
  return (
    <div className="Resume">
      <ResumeHeader />
      {Object.entries(resumeData).map(([key, value]) => (
        <ResumeSection key={key} type={key} data={value} />
      ))}
    </div>
  );
};
