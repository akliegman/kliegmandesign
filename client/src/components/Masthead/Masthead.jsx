import "./Masthead.less";
import { HorizontalRule } from "../reusables/HorizontalRule";
import { homeData } from "../../data/homeData";
import { Linkedin, Github, Mail } from "feather-icons-react";

export const Masthead = () => {
  return (
    <div className="Masthead">
      <img
        className="Masthead__Image"
        src={homeData.image}
        alt="Adam Kliegman"
        height="80"
        width="80"
      />
      <div className="Masthead__Content">
        <h1 className="Masthead__Header">{homeData.header}</h1>
        <h2 className="Masthead__Subheader">{homeData.subheader}</h2>
        <HorizontalRule color="gray" className="Masthead__Hr" />
        <p className="Masthead__Description">{homeData.description}</p>
        <div className="Masthead__Social">
          {homeData.social.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noreferrer"
            >
              {social.name === "LinkedIn" && <Linkedin size="18" />}
              {social.name === "GitHub" && <Github size="18" />}
              {social.name === "Mail" && <Mail size="18" />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
