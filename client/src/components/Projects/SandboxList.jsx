import { SandboxItem } from "./SandboxItem/SandboxItem";
import styles from "./SandboxList.module.less";

export const SandboxList = ({ data }) => {
  return (
    <div className={styles.Container}>
      <h3 className={styles.Header}>Personal Projects</h3>
      <div className={styles.SandboxItems}>
        {data
          ?.sort((a, b) => a.order - b.order)
          ?.map((project, index) => {
            return <SandboxItem data={project} key={index} />;
          })}
      </div>
    </div>
  );
};
