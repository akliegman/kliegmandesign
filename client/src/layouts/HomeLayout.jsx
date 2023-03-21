import { Link } from "react-router-dom";

export const HomeLayout = ({ data }) => {
  return (
    <div className="HomeLayout">
      <h1>Home Page</h1>
      <p>Here is some data from the server:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Link to="/resume">Resume</Link>
    </div>
  );
};
