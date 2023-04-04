import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { MainLayout } from "../layouts/MainLayout";
import { Projects } from "../components/Projects/Projects";
import { projectsPageData } from "./data/projectsPageData";

export const ProjectsPage = () => {
  return (
    <>
      <PageHelmet title="Projects" />
      <MainLayout className="ProjectsPage">
        <Projects data={projectsPageData} />
      </MainLayout>
    </>
  );
};
