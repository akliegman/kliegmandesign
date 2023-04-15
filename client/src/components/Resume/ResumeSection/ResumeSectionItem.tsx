// @ts-nocheck
import { MidDot, HorizontalRule } from "../../reusables";
import "./ResumeSectionItem.less";

export const ResumeSectionItem = ({ type, data }) => {
  return (
    <div className="ResumeSectionItem">
      <div className="ResumeSectionItem__header">
        {(type === "experience" || type === "education") && (
          <>
            <div className="ResumeSectionItem__header__column">
              <h3 className="ResumeSectionItem__title">
                <a href={data?.website} target="_blank" rel="noreferrer">
                  {data?.name}
                </a>
              </h3>
              {type === "experience" && (
                <>
                  <MidDot color="red-400" />
                  <p className="ResumeSectionItem__subtitle">
                    <span>{data?.type}</span>
                    {data?.transaction_type && (
                      <>
                        <MidDot color="red-400" />
                        <span>{data?.transaction_type}</span>
                      </>
                    )}
                  </p>
                </>
              )}
            </div>
            <div className="ResumeSectionItem__header__column">
              <HorizontalRule />

              <img src={data?.logo} alt={data?.name} height="34" width="34" />
            </div>
          </>
        )}
      </div>
      <div className="ResumeSectionItem__content">
        {data?.items?.map((item, index) => (
          <div className="ResumeSectionItem__content__item" key={index}>
            <div className="ResumeSectionItem__content__item__header">
              <h4 className="ResumeSectionItem__content__item__title">
                {item?.title}
              </h4>
              <h5 className="ResumeSectionItem__content__item__subtitle">
                {item?.start_date} - {item?.end_date}
              </h5>
            </div>
            <div className="ResumeSectionItem__content__item__body">
              <p className="ResumeSectionItem__content__item__paragraph">
                {item?.description.map((text, index) => (
                  <span key={index}>
                    {text.type === "text" && text.value}
                    {text.type === "highlight" && <strong>{text.value}</strong>}
                    {text.type === "emphasis" && <em>{text.value}</em>}
                  </span>
                ))}
              </p>
              {item?.tech_stack && item?.tech_stack.length > 0 && (
                <p className="ResumeSectionItem__content__item__stack">
                  {item?.tech_stack.join(", ")}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
