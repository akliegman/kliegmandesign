import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { StaticLayout } from "../layouts/StaticLayout";

export const ProjectsPage = () => {
  return (
    <>
      <PageHelmet title="Projects" />
      <StaticLayout className="ProjectsPage">
        <h1>Projects</h1>
      </StaticLayout>
    </>
  );
};
