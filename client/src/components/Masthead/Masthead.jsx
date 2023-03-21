import Headshot from "../../assets/images/headshot.jpg";
import "./Masthead.less";
import { Linkedin, Github, Mail } from "feather-icons-react";
import { HorizontalRule } from "../reusables/HorizontalRule";

export const Masthead = () => {
  return (
    <div className="Masthead">
      <img
        className="Masthead__Image"
        src={Headshot}
        alt="Adam Kliegman"
        height="80"
        width="80"
      />
      <div className="Masthead__Content">
        <h1 className="Masthead__Header">Adam Kliegman</h1>
        <h2 className="Masthead__Subheader">
          NYC-based user-centric product engineer
        </h2>
        <HorizontalRule color="gray" className="Masthead__Hr" />
        <p className="Masthead__Description">
          I'm an experienced frontend engineer with a multifaceted background
          who combines engineering best practices, design, data, psychology, and
          practicality to deliver value in fast-paced environments. I'm
          dependable, passionate, and ambitious, and am deeply committed to
          building great web applications from zero to one. With a background as
          a designer, product manager, and business analyst, I can not only
          demonstrate a breadth functional skills, but also can interface
          fluently across teams to ensure sound communication channels,
          well-delineated specifications, and viable design and data systems.
        </p>
        <div className="Masthead__Social">
          <a
            href="https://www.linkedin.com/in/adamkliegman/"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size="18" />
          </a>
          <a
            href="https://github.com/akliegman"
            target="_blank"
            rel="noreferrer"
          >
            <Github size="18" />
          </a>
          <a
            href="mailto:adam.j.kliegman@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <Mail size="18" />
          </a>
        </div>
      </div>
    </div>
  );
};
