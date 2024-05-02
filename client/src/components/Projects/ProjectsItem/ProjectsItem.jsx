import { Link } from "react-router-dom";

import styles from "./ProjectsItem.module.less";

export const ProjectsItem = ({ data, to }) => {
  return (
    <Link to={to} className={styles.Item}>
      <div className={styles.Thumbnail}>
        <img src={data?.thumbnail} alt={data?.name} />
      </div>

      <div className={styles.Content}>
        <h2 className={styles.Title}>{data?.title}</h2>
        <p className={styles.Summary}>{data?.summary}</p>
        <div className={styles.Stack}>
          {Object.entries(data?.stack).map(([category, skill]) => {
            return (
              category === "frameworks" &&
              skill.map((tech) => (
                <span className={styles.StackItem} key={tech}>
                  {tech}
                </span>
              ))
            );
          })}
        </div>
      </div>
    </Link>
  );
};
