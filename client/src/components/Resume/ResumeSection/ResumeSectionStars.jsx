import React from "react";
import { Star } from "feather-icons-react";

export const ResumeSectionStars = ({ count }) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push(<Star key={i} className="ResumeSectionStars__Icon" />);
  }
  return <div className="ResumeSectionStars">{stars}</div>;
};
