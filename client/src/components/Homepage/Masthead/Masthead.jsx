import { Button } from "../../reusables";

import styles from "./Masthead.module.less";

export const Masthead = ({ data }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.VideoContainer}>
        <video autoPlay muted loop className={styles.Video}>
          <source src={data.video} type="video/mp4" />
        </video>
      </div>
      <div className={styles.Image}>
        <img src={data.image} alt="Adam Kliegman" height="200" width="200" />
      </div>
      <div className={styles.Content}>
        <h1 className={styles.Header}>{data.header}</h1>
        <h2 className={styles.Subheader}>{data.subheader}</h2>
        <div className={styles.Buttons}>
          {data.ctas.map((button) => (
            <Button
              type="link"
              key={button.name}
              to={button.link}
              size="lg"
              variant="primary"
              iconPosition="left"
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
