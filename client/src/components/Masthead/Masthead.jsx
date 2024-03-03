import "./Masthead.less";
import { HorizontalRule, IconButton, Button } from "../reusables";
import {
  LinkedinFilled,
  GithubFilled,
  MailFilled,
  FileTextFilled,
} from "@ant-design/icons";

export const Masthead = ({ data }) => {
  return (
    <div className="Masthead">
      <img
        className="Masthead__image"
        src={data.image}
        alt="Adam Kliegman"
        height="80"
        width="80"
      />
      <div className="Masthead__content">
        <h1 className="Masthead__header">{data.header}</h1>
        <h2 className="Masthead__subheader">{data.subheader}</h2>
        <HorizontalRule
          color="gray-500"
          type="small"
          className="Masthead__hr"
        />
        <p className="Masthead__description">{data.description}</p>
        <div className="Masthead__buttons">
          {data.ctas.map((button) => {
            const buttonDetailsMapping = {
              resume: {
                icon: <FileTextFilled />,
                variant: "secondary",
                withShadow: false,
              },
              contact: {
                icon: <MailFilled />,
                variant: "primary",
                withShadow: true,
              },
            };

            return (
              <Button
                type="link"
                key={button.name}
                to={button.link}
                icon={buttonDetailsMapping[button.name].icon}
                variant={buttonDetailsMapping[button.name].variant}
                withShadow={buttonDetailsMapping[button.name].withShadow}
                iconPosition="left"
              >
                {button.label}
              </Button>
            );
          })}
        </div>
        <div className="Masthead__social">
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
                testId={`${social.name.toLowerCase()}-icon`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
