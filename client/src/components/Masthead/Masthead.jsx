import "./Masthead.less";
import { HorizontalRule, IconButton, Button } from "../reusables";
import { homeData } from "../../data/homeData";
import {
  LinkedinFilled,
  GithubFilled,
  MailFilled,
  RightCircleFilled,
} from "@ant-design/icons";

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
        <HorizontalRule color="gray-500" className="Masthead__Hr" />
        <p className="Masthead__Description">{homeData.description}</p>
        <div className="Masthead__Buttons">
          {homeData.ctas.map((button) => (
            <Button
              type="link"
              key={button.name}
              to={button.link}
              icon={button.name === "resume" && <RightCircleFilled />}
              iconPosition="right"
              withShadow
            >
              {button.label}
            </Button>
          ))}
        </div>
        <div className="Masthead__Social">
          {homeData.social.map((social) => {
            let icon =
              social.name === "LinkedIn" ? (
                <LinkedinFilled />
              ) : social.name === "GitHub" ? (
                <GithubFilled />
              ) : (
                <MailFilled />
              );
            return (
              <IconButton
                key={social.name}
                to={social.link}
                type="external"
                icon={icon}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
