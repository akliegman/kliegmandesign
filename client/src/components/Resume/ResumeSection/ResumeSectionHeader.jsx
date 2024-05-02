import styles from "./ResumeSectionHeader.module.less";

export const ResumeSectionHeader = ({ children }) => {
  return <h2 className={styles.Header}>{children}</h2>;
};
