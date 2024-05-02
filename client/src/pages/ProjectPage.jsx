import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowDownOutlined } from "@ant-design/icons";

import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { projectsPageData } from "./data/projectsPageData";
import { Project } from "../components/Project/Project";
import { IconButton } from "../components/reusables";

import styles from "./ProjectPage.module.less";

export const ProjectPage = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();
  const projectRef = useRef(null);

  const project = projectsPageData.list?.find((project) => {
    return project.name === projectName;
  });

  const scrolltoProject = () => {
    projectRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!project || project?.protected === true) {
      navigate("/404");
    }
  }, [project, navigate]);

  return (
    <>
      <PageHelmet title={project?.title} />
      <div className={styles.Container}>
        <div className={styles.Main}>
          <div className={styles.Image}>
            <img
              src={project?.thumbnail}
              alt={project?.title}
              height="200"
              width="200"
            />
          </div>
          <div className={styles.Content}>
            <h2 className={styles.Header}>{project?.title}</h2>
            <p className={styles.Description}>{project?.summary}</p>
            <IconButton
              type="button"
              className={styles.Button}
              onClick={scrolltoProject}
              icon={<ArrowDownOutlined />}
            />
          </div>
        </div>
        <Project data={project} projectRef={projectRef} />
      </div>
    </>
  );
};
