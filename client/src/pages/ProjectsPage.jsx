import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { MainLayout } from "../layouts/MainLayout";
import { Projects } from "../components/Projects/Projects";
import { projectsData } from "./data/projectsData";

export const ProjectsPage = () => {
  return (
    <>
      <PageHelmet title="Projects" />
      <MainLayout className="ProjectsPage">
        <Projects data={projectsData} />
      </MainLayout>
    </>
  );
};
