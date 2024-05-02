import clsx from "clsx";
import { Button, IconButton } from "../../reusables";

import styles from "./AboutMe.module.less";

export const AboutMe = ({ data }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Main}>
        <div className={styles.Content}>
          <h2 className={styles.Header}>{data.header}</h2>
          <p className={styles.Description}>{data.description}</p>
          <div className={styles.Buttons}>
            {data.ctas.map((button) => (
              <Button
                type="link"
                key={button.name}
                to={button.link}
                size="md"
                variant="primaryInverted"
                iconPosition="left"
              >
                {button.label}
              </Button>
            ))}
            {data.social.map((social) => (
              <IconButton
                key={social.name}
                type="link"
                to={social.link}
                icon={social.icon}
                size="sm"
              />
            ))}
          </div>
        </div>
        <div className={styles.Aside}>
          <div
            className={clsx(styles.Group, "AboutMe__aside__group--location")}
          >
            <h3 className={styles.GroupHeader}>{data.location.header}</h3>
            {data.location.body.map((item) => (
              <p key={item} className={styles.GroupItem}>
                {item}
              </p>
            ))}
          </div>
          <div className={clsx(styles.Group)}>
            <h3 className={styles.GroupHeader}>{data.education.header}</h3>
            {data.education.body.map((item) => (
              <p key={item} className={styles.GroupItem}>
                {item}
              </p>
            ))}
          </div>
          <div className={clsx(styles.Group)}>
            <h3 className={styles.GroupHeader}>{data.years.header}</h3>
            {data.years.body.map((item) => (
              <p key={item} className={styles.GroupItem}>
                {item}
              </p>
            ))}
          </div>
          <div className={clsx(styles.Group)}>
            <h3 className={styles.GroupHeader}>{data.roles.header}</h3>
            <ul className={styles.List}>
              {data.roles.body.map((item) => (
                <li key={item} className={styles.ListItem}>
                  <p className={styles.GroupItem}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={clsx(styles.Group)}>
            <h3 className={styles.GroupHeader}>{data.companies.header}</h3>
            <ul className={styles.List}>
              {data.companies.body.map((item) => (
                <li key={item} className={styles.ListItem}>
                  <p className={styles.GroupItem}>{item}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={clsx(styles.Group)}>
            <h3 className={styles.GroupHeader}>{data.verticals.header}</h3>
            <ul className={styles.List}>
              {data.verticals.body.map((item) => (
                <li key={item} className={styles.ListItem}>
                  <p className={styles.GroupItem}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
