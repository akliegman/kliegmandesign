import { useRef } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";

import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { ProjectsList } from "../components/Projects/ProjectsList";
import { projectsPageData } from "./data/projectsPageData";
import { IconButton } from "../components/reusables";

import styles from "./ProjectsPage.module.less";

export const ProjectsPage = () => {
  const listRef = useRef(null);

  const scrollToProjects = () => {
    listRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageHelmet title="Projects" />
      <div className={styles.Container}>
        <div className={styles.Main}>
          <div className={styles.Image}>
            <img
              src={projectsPageData?.image}
              alt="Projects Page Image"
              height="200"
              width="200"
            />
          </div>
          <div className={styles.Content}>
            <h2 className={styles.Header}>{projectsPageData?.heading}</h2>
            <p className={styles.Description}>
              {projectsPageData?.description}
            </p>
            <IconButton
              type="button"
              className={styles.Button}
              onClick={scrollToProjects}
              icon={<ArrowDownOutlined />}
            />
          </div>
        </div>
        <div className={styles.List} ref={listRef}>
          <ProjectsList data={projectsPageData?.list} />
        </div>
      </div>
    </>
  );
};
