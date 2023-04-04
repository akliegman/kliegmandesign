import { routes } from "../../routes";
import { ProjectsItem } from "./ProjectsItem/ProjectsItem";
import "./Projects.less";

export const Projects = ({ data }) => {
  return (
    <div className="Projects">
      {data?.map((project, index) => {
        const [projectRoute] = Object.entries(routes).filter(
          ([key, value]) => value.name === "Project"
        )[0];
        const to = projectRoute.replace(":projectName", project.name);
        return <ProjectsItem data={project} key={index} to={to} />;
      })}
    </div>
  );
};
