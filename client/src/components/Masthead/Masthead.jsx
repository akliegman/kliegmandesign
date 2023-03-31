import "./Masthead.less";
import { HorizontalRule, IconButton, Button } from "../reusables";
import {
  LinkedinFilled,
  GithubFilled,
  MailFilled,
  RightCircleFilled,
} from "@ant-design/icons";

export const Masthead = ({ data }) => {
  return (
    <div className="Masthead">
      <img
        className="Masthead__Image"
        src={data.image}
        alt="Adam Kliegman"
        height="80"
        width="80"
      />
      <div className="Masthead__Content">
        <h1 className="Masthead__Header">{data.header}</h1>
        <h2 className="Masthead__Subheader">{data.subheader}</h2>
        <HorizontalRule color="gray-500" className="Masthead__Hr" />
        <p className="Masthead__Description">{data.description}</p>
        <div className="Masthead__Buttons">
          {data.ctas.map((button) => (
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
          {data.social.map((social) => {
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
