import { Star } from "feather-icons-react";
import "./ResumeSectionStars.less";

export const ResumeSectionStars = ({ count }) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(<Star size="12" key={i} className="ResumeSectionStars__Icon" />);
  }
  return <div className="ResumeSectionStars">{stars}</div>;
};
