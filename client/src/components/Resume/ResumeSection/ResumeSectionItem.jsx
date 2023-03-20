import { MidDot } from "../../reusables/MidDot";
import { HorizontalRule } from "../../reusables/HorizontalRule";

export const ResumeSectionItem = ({ type, data }) => {
  return (
    <div className="ResumeSectionItem">
      <div className="ResumeSectionItem__Header">
        {(type === "experience" || type === "education") && (
          <>
            <div className="ResumeSectionItem__Header__Column">
              <h3 className="ResumeSectionItem__Title">
                <a href={data?.website} target="_blank">
                  {data?.name}
                </a>
              </h3>
              {type === "experience" && (
                <>
                  <MidDot color="red" />
                  <p className="ResumeSectionItem__Subtitle">
                    <span>{data?.type}</span>
                    <MidDot color="red" />
                    <span>{data?.transaction_type}</span>
                  </p>
                </>
              )}
            </div>
            <div className="ResumeSectionItem__Header__Column">
              <HorizontalRule />
              <img src={data?.logo} alt={data?.name} height="34" width="34" />
            </div>
          </>
        )}
      </div>
      <div className="ResumeSectionItem__Content">
        {data?.items?.map((item, index) => (
          <div className="ResumeSectionItem__Content__Item" key={index}>
            <div className="ResumeSectionItem__Content__Item__Header">
              <h4 className="ResumeSectionItem__Content__Item__Title">
                {item.title}
              </h4>
              <h5 className="ResumeSectionItem__Content__Item__Subtitle">
                {item.start_date} - {item.end_date}
              </h5>
            </div>
            <div className="ResumeSectionItem__Content__Item__Body">
              <p className="ResumeSectionItem__Content__Item__Paragraph">
                {item.description.map((text, index) => (
                  <span key={index}>
                    {text.type === "text" && text.value}
                    {text.type === "highlight" && <strong>{text.value}</strong>}
                    {text.type === "emphasis" && <em>{text.value}</em>}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
