import styles from "./TextBlock.module.less";

export const TextBlock = ({ children }) => {
  return (
    <div className={styles.TextBlock} data-testid="text-block">
      {children}
    </div>
  );
};
