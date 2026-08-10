import { useEffect } from "react";

import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { appConfig } from "../config/appConfig";

export const ResumePage = () => {
  useEffect(() => {
    window.location.replace(appConfig.resumePath);
  }, []);

  return (
    <PageHelmet
      title="Résumé"
      description="Adam Kliegman's résumé: frontend and design-systems engineer with 13+ years building design systems, frontend architecture, and AI product surfaces."
    />
  );
};
