import { ResumeSectionStars } from "./ResumeSectionStars";
// import { toTitleCase } from "../../../helpers/toTitleCase";
import "./ResumeSectionSkillsList.less";

export const ResumeSectionSkillsList = ({ data }) => {
  return (
    <div className="ResumeSectionSkillsList">
      <ul className="ResumeSectionSkillsList__List">
        {data?.map((item, index) => (
          <li key={index} className="ResumeSectionSkillsList__ListItem">
            <p className="ResumeSectionSkillsList__ListItem__Paragraph">
              {item.title}
            </p>
            <ResumeSectionStars count={item.level} />
          </li>
        ))}
      </ul>
    </div>
  );
};
