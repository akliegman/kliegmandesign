import React from "react";
import clsx from "clsx";
import { toTitleCase } from "../../../helpers/toTitleCase";
import { ResumeSectionItem } from "./ResumeSectionItem";
import { ResumeSectionSkillsList } from "./ResumeSectionSkillsList";

const ResumeSectionHeader = ({ children }) => {
  return <h2 className="ResumeSectionHeader">{children}</h2>;
};

const ResumeSectionContent = ({ children }) => {
  return <div className="ResumeSectionContent">{children}</div>;
};

const ResumeSectionParagraph = ({ children }) => {
  return <p className="ResumeSectionParagraph">{children}</p>;
};

export const ResumeSection = ({ type, data }) => {
  return (
    <div
      className={clsx(
        "ResumeSection",
        (type === "objective" || type === "skills") && "ResumeSection--OneRow"
      )}
    >
      <ResumeSectionHeader>{toTitleCase(type)}</ResumeSectionHeader>
      <ResumeSectionContent>
        {type === "objective" && (
          <ResumeSectionParagraph>{data}</ResumeSectionParagraph>
        )}
        {(type === "experience" || type === "education") &&
          data?.map((item, index) => (
            <ResumeSectionItem key={index} type={type} data={item} />
          ))}

        {type === "skills" && <ResumeSectionSkillsList data={data} />}
      </ResumeSectionContent>
    </div>
  );
};
