import { useEffect, useState } from "react";
import { Button } from "../../reusables";

import styles from "./Masthead.module.less";

export const Masthead = ({ data }) => {
  const [videoMounted, setVideoMounted] = useState(false);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setVideoMounted(true);
    } else {
      setVideoMounted(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      setVideoMounted(true);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.Container}>
      {videoMounted ? (
        <div className={styles.VideoContainer}>
          <video autoPlay muted loop playsInline className={styles.Video}>
            <source src={data.video} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div className={styles.MobilePlaceholder} />
      )}
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
