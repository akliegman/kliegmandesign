import { routeNames } from "../../routes";
import { ProjectsItem } from "./ProjectsItem/ProjectsItem";
import "./Projects.less";

export const Projects = ({ data }) => {
  return (
    <div className="Projects">
      {data?.map((project, index) => {
        const to = routeNames?.PROJECT?.replace(":projectName", project.name);
        return <ProjectsItem data={project} key={index} to={to} />;
      })}
    </div>
  );
};
