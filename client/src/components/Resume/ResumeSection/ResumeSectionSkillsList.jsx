import { ResumeSectionStars } from "./ResumeSectionStars";
// import { toTitleCase } from "../../../helpers/toTitleCase";
import "./ResumeSectionSkillsList.less";

export const ResumeSectionSkillsList = ({ data }) => {
  console.log(data.shortlist);
  return (
    <>
      <div className="ResumeSectionSkillsList">
        <ul className="ResumeSectionSkillsList__List">
          {data.shortlist?.map((item, index) => (
            <li key={index} className="ResumeSectionSkillsList__ListItem">
              <p className="ResumeSectionSkillsList__ListItem__Paragraph">
                {item.title}
              </p>
              <ResumeSectionStars count={item.level} />
            </li>
          ))}
        </ul>
      </div>

      {/* {Object.entries(data).map(([key, value]) => (
        <div className="ResumeSectionSkillsList" key={key}>
          <h4 className="ResumeSectionSkillsList__Header">
            {toTitleCase(key)}
          </h4>
          <ul className="ResumeSectionSkillsList__List">
            {value?.map((item, index) => (
              <li key={index} className="ResumeSectionSkillsList__ListItem">
                <p className="ResumeSectionSkillsList__ListItem__Paragraph">
                  {item.title}
                </p>
                <ResumeSectionStars count={item.level} />
              </li>
            ))}
          </ul>
        </div>
      ))} */}
    </>
  );
};
