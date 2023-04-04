import clsx from "clsx";
import { toTitleCase } from "../../../helpers/toTitleCase";
import { ResumeSectionItem } from "./ResumeSectionItem";
import { ResumeSectionSkillsList } from "./ResumeSectionSkillsList";
import { ResumeSectionHeader } from "./ResumeSectionHeader";
import { ResumeSectionContent } from "./ResumeSectionContent";
import { ResumeSectionParagraph } from "./ResumeSectionParagraph";

import "./ResumeSection.less";

export const ResumeSection = ({ type, data }) => {
  return (
    <div
      className={clsx(
        "ResumeSection",
        (type === "objective" || type === "skills") && "ResumeSection--oneRow"
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
