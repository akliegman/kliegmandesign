import { Link } from "react-router-dom";
import "./ProjectsItem.less";
import { HorizontalRule } from "../../reusables";

const ProjectsItemContent = ({ data }) => {
  return (
    <>
      <img
        className="ProjectsItem__thumbnail"
        src={data?.thumbnail}
        alt={data?.name}
      />

      <div className="ProjectsItem__content">
        <h2>{data?.title}</h2>
        <p>{data?.summary}</p>
        <HorizontalRule type="small" color="gray-500" />
        <ul className="ProjectsItem__stack">
          {data?.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const ProjectsItem = ({ data, to }) => {
  return (
    <>
      {!data?.protected ? (
        <Link className="ProjectsItem" to={to}>
          <ProjectsItemContent data={data} />
        </Link>
      ) : (
        <div className="ProjectsItem ProjectsItem--protected">
          <div className="ProjectsItem__comingSoon">
            <span>Coming Soon</span>
          </div>
          <ProjectsItemContent data={data} />
        </div>
      )}
    </>
  );
};
