import { Button, Chip } from "../../reusables";

import styles from "./ResumeHeader.module.less";

export const ResumeHeader = ({ data }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Image}>
        <img src={data.image} alt="Adam Kliegman" />
      </div>
      <div className={styles.Content}>
        <Button
          type="external"
          to={`mailto:${data.email}`}
          size="sm"
          variant="tertiary"
          className={styles.Facet}
        >
          {data.email}
        </Button>
        <Chip size="sm" variant="tertiary" className={styles.Facet}>
          {data.phone}
        </Chip>
        <Chip size="sm" variant="tertiary" className={styles.Facet}>
          {data.location}
        </Chip>
      </div>
    </div>
  );
};
