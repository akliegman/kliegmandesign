import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { Resume } from "../components/Resume/Resume";

import styles from "./ResumePage.module.less";

export const ResumePage = () => {
  return (
    <>
      <PageHelmet
        title="Résumé"
        description={`Seeking a position that will leverage my expertise in \
        product development & software engineering to create user-friendly \
        web apps on a cutting-edge technology stack.`}
      />
      <div className={styles.Container}>
        <Resume />
      </div>
    </>
  );
};
