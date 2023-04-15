// @ts-nocheck
import { ResumeSectionStars } from "./ResumeSectionStars";
// import { toTitleCase } from "../../../helpers/toTitleCase";
import "./ResumeSectionSkillsList.less";

export const ResumeSectionSkillsList = ({ data }) => {
  return (
    <div className="ResumeSectionSkillsList">
      <ul className="ResumeSectionSkillsList__list">
        {data?.map((item, index) => (
          <li key={index} className="ResumeSectionSkillsList__listItem">
            <p className="ResumeSectionSkillsList__listItem__paragraph">
              {item.title}
            </p>
            <ResumeSectionStars count={item.level} />
          </li>
        ))}
      </ul>
    </div>
  );
};
