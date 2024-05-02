import styles from "./ResumeSectionParagraph.module.less";

export const ResumeSectionParagraph = ({ children }) => {
  return <p className={styles.Text}>{children}</p>;
};
