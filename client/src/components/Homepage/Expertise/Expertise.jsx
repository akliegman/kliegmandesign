import clsx from "clsx";

import styles from "./Expertise.module.less";

export const Expertise = ({ data }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Main}>
        <div className={styles.Content}>
          <h2 className={styles.Header}>{data.header}</h2>
          <p className={styles.Description}>{data.description}</p>
        </div>
        <div className={styles.Areas}>
          {data.areas.map((area) => (
            <div key={area.name} className={styles.Area}>
              <h3 className={styles.AreaName}>{area.name}</h3>
              <p className={styles.AreaDescription}>{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
