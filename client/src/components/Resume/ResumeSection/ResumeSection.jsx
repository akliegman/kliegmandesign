import clsx from "clsx";
import { ResumeSectionItem } from "./ResumeSectionItem";
import { ResumeSectionSkillsList } from "./ResumeSectionSkillsList";
import { ResumeSectionHeader } from "./ResumeSectionHeader";
import { ResumeSectionParagraph } from "./ResumeSectionParagraph";

import { toTitleCase } from "../../../helpers/toTitleCase";

import styles from "./ResumeSection.module.less";

export const ResumeSection = ({ type, data }) => {
  return (
    <div className={clsx(styles.Section)} id={type}>
      <ResumeSectionHeader>{toTitleCase(type)}</ResumeSectionHeader>
      <div>
        {type === "summary" && (
          <ResumeSectionParagraph>{data}</ResumeSectionParagraph>
        )}
        {(type === "experience" || type === "education") &&
          data?.map((item, index) => (
            <ResumeSectionItem key={index} type={type} data={item} />
          ))}

        {type === "skills" &&
          data?.map((item, index) => (
            <ResumeSectionSkillsList key={index} data={item} />
          ))}
      </div>
    </div>
  );
};
