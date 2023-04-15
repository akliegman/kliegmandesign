// @ts-nocheck
import { MidDot } from "../../reusables";
import { Link } from "react-router-dom";
import "./ResumeHeader.less";

export const ResumeHeader = ({ data }) => {
  return (
    <div className="ResumeHeader">
      <h1 className="ResumeHeader__title">
        <Link to="/">{data.name}</Link>
      </h1>
      <div className="ResumeHeader__links">
        <Link to={data.website.link}>{data.website.name}</Link>
        <MidDot />

        <a href={`mailto:${data.email}`}>{data.email}</a>
        <MidDot />
        <p>{data.phone}</p>
        <MidDot />
        <p>{data.location}</p>
      </div>
    </div>
  );
};
