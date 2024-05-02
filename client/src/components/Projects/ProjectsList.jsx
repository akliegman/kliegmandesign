import { routeNames } from "../../routes";
import { ProjectsItem } from "./ProjectsItem/ProjectsItem";
import styles from "./ProjectsList.module.less";

export const ProjectsList = ({ data }) => {
  return (
    <div className={styles.Container}>
      {data?.map((project, index) => {
        const to = routeNames?.PROJECT?.replace(":projectName", project.name);
        return <ProjectsItem data={project} key={index} to={to} />;
      })}
    </div>
  );
};
