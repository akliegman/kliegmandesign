import { Link } from "react-router-dom";
import "./ProjectsItem.less";

const ProjectsItemContent = ({ data }) => {
  return (
    <>
      <img
        className="ProjectsItem__Thumbnail"
        src={data.thumbnail}
        alt={data.name}
      />
      <div className="ProjectsItem__Content">
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <ul className="ProjectsItem__Stack">
          {data.stack.map((tech) => {
            return <li key={tech}>{tech}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export const ProjectsItem = ({ data, to }) => {
  return (
    <>
      {!data.protected ? (
        <Link className="ProjectsItem" to={to}>
          <ProjectsItemContent data={data} />
        </Link>
      ) : (
        <div className="ProjectsItem ProjectsItem--Protected">
          <div className="ProjectsItem__ComingSoon">
            <span>Coming Soon</span>
          </div>
          <ProjectsItemContent data={data} />
        </div>
      )}
    </>
  );
};
