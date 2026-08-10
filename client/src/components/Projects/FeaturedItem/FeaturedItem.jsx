import { Chip } from "../../reusables";

import styles from "./FeaturedItem.module.less";

export const FeaturedItem = ({ data }) => {
  return (
    <div className={styles.Item}>
      <div className={styles.Content}>
        <div className={styles.Heading}>
          <span className={styles.Company}>{data?.company}</span>
          <Chip variant="tertiary" size="sm">
            Details coming soon
          </Chip>
        </div>
        <h2 className={styles.Title}>{data?.title}</h2>
        <p className={styles.Summary}>{data?.summary}</p>
        <div className={styles.Stack}>
          {data?.stack?.frameworks?.map((tech) => (
            <span className={styles.StackItem} key={tech}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
