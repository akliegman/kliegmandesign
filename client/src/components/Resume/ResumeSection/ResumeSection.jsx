import React from "react";
import clsx from "clsx";
import { toTitleCase } from "../../../helpers/toTitleCase";

const ResumeSectionHeader = ({ children }) => {
  return <h2 className="ResumeSectionHeader">{children}</h2>;
};

const ResumeSectionContent = ({ children }) => {
  return <div className="ResumeSectionContent">{children}</div>;
};

const ResumeSectionParagraph = ({ children }) => {
  return <p className="ResumeSectionParagraph">{children}</p>;
};

const ResumeSectionList = ({ type, data }) => {
  const Stars = ({ count }) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <span key={i} className="ResumeSectionList__Item__Star">
          *
        </span>
      );
    }
    return <div className="ResumeSectionList__Item__Stars">{stars}</div>;
  };

  return (
    <ul className="ResumeSectionList">
      {type === "skills" &&
        data?.map((item, index) => (
          <li key={index} className="ResumeSectionList__Item">
            <p className="ResumeSectionList__Item__Paragraph">{item.title}</p>
            <Stars count={item.level} />
          </li>
        ))}
    </ul>
  );
};

const ResumeSectionItem = ({ type, data }) => {
  return (
    <div className="ResumeSectionItem">
      <div className="ResumeSectionItem__Header">
        {(type === "experience" || type === "education") && (
          <>
            <h3 className="ResumeSectionItem__Title">
              <a
                href={data?.company_website || data?.school_website}
                target="_blank"
              >
                {data?.company || data?.school}
              </a>
            </h3>
            {type === "experience" && (
              <p className="ResumeSectionItem__Subtitle">
                <span>{data?.company_type}</span>
                <span> - </span>
                <span>{data?.company_transaction_type}</span>
              </p>
            )}
            <div className="ResumeSectionItem__Line" />
            {/* <img src={data?.company_logo} alt={data?.company} /> */}
          </>
        )}
      </div>
      <div className="ResumeSectionItem__Content">
        {type === "experience" &&
          data?.roles?.map((role, index) => (
            <div className="ResumeSectionItem__Content__Item" key={index}>
              <div className="ResumeSectionItem__Content__Item__Header">
                <h4 className="ResumeSectionItem__Content__Item__Title">
                  {role.title}
                </h4>
                <h5 className="ResumeSectionItem__Content__Item__Subtitle">
                  {role.start_date} - {role.end_date}
                </h5>
              </div>
              <div className="ResumeSectionItem__Content__Item__Body">
                <p className="ResumeSectionItem__Content__Item__Paragraph">
                  {role.description.map((item, index) => (
                    <>
                      {item.type === "text" && item.value}
                      {item.type === "highlight" && (
                        <strong>{item.value}</strong>
                      )}
                      {item.type === "emphasis" && <em>{item.value}</em>}
                    </>
                  ))}
                </p>
              </div>
            </div>
          ))}
        {type === "education" &&
          data?.degrees?.map((degree, index) => (
            <div className="ResumeSectionItem__Content__Item" key={index}>
              <div className="ResumeSectionItem__Content__Item__Header">
                <h4 className="ResumeSectionItem__Content__Item__Title">
                  {degree.title}
                </h4>
                <h5 className="ResumeSectionItem__Content__Item__Subtitle">
                  {degree.start_date} - {degree.end_date}
                </h5>
              </div>
              <div className="ResumeSectionItem__Content__Item__Body">
                <p className="ResumeSectionItem__Content__Item__Paragraph">
                  {degree.description.map((item, index) => (
                    <>
                      {item.type === "text" && item.value}
                      {item.type === "highlight" && (
                        <strong>{item.value}</strong>
                      )}
                      {item.type === "emphasis" && <em>{item.value}</em>}
                    </>
                  ))}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
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

        {type === "skills" && <ResumeSectionList type={type} data={data} />}
      </ResumeSectionContent>
    </div>
  );
};
