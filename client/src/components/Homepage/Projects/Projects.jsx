import { ExperimentFilled } from "@ant-design/icons";
import { Button } from "../../reusables";

import styles from "./Projects.module.less";

export const Projects = ({ data }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Main}>
        <div className={styles.Icon}>
          <ExperimentFilled />
        </div>
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
                variant="whiteInverted"
                iconPosition="left"
              >
                {button.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
