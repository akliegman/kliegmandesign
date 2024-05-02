import styles from "./ResumeSectionSkillsList.module.less";

export const ResumeSectionSkillsList = ({ data }) => {
  return (
    <div className={styles.Container}>
      <h3 className={styles.Name}>{data?.name}</h3>
      <ul className={styles.List}>
        {data?.items?.map((item, index) => (
          <li key={index} className={styles.Item}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
