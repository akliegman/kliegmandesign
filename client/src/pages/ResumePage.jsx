import { useEffect } from "react";

import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { Button } from "../components/reusables";
import { appConfig } from "../config/appConfig";

import styles from "./ResumePage.module.less";

export const ResumePage = () => {
  useEffect(() => {
    window.location.replace(appConfig.resumePath);
  }, []);

  return (
    <>
      <PageHelmet
        title="Résumé"
        description="Adam Kliegman's résumé: frontend and design-systems engineer with 13+ years building design systems, frontend architecture, and AI product surfaces."
      />
      <div className={styles.Container}>
        <p className={styles.Message}>Opening résumé…</p>
        <Button
          type="external"
          to={appConfig.resumePath}
          size="lg"
          variant="primary"
        >
          Download résumé
        </Button>
      </div>
    </>
  );
};
