import clsx from "clsx";

import styles from "./ImageWrapper.module.less";

export const ImageWrapper = ({ className, children }) => (
  <div className={clsx(styles.ImageWrapper, className)}>
    <div className={styles.TopBar}>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
    <div className={styles.BrowserBar}>
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
    <div className={styles.Image}>{children}</div>
  </div>
);
