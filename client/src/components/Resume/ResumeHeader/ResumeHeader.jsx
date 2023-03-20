import { MidDot } from "../../reusables/MidDot";
import "./ResumeHeader.less";

export const ResumeHeader = () => {
  return (
    <div className="ResumeHeader">
      <h1 className="ResumeHeader__title">Adam Kliegman</h1>
      <div className="ResumeHeader__links">
        <a href="mailto:adam.j.kliegman@gmail.com">adam.j.kiegman@gmail.com</a>
        <MidDot />
        <p>+1 (516) 457-2014</p>
        <MidDot />
        <p>Greater NYC Area</p>
      </div>
    </div>
  );
};
