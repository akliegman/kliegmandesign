// @ts-nocheck
import Star from "../../../assets/svg/Star.svg";
import "./ResumeSectionStars.less";

export const ResumeSectionStars = ({ count }) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(
      <img src={Star} key={i} className="ResumeSectionStars__icon" alt="star" />
    );
  }
  return <div className="ResumeSectionStars">{stars}</div>;
};
