import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { MainLayout } from "../layouts/MainLayout";
import { Projects } from "../components/Projects/Projects";
import { projectsPageData } from "./data/projectsPageData";
import { useMountPage } from "../hooks/useMountPage";

export const ProjectsPage = () => {
  useMountPage();

  return (
    <>
      <PageHelmet title="Projects" />
      <MainLayout className="ProjectsPage">
        <Projects data={projectsPageData} />
      </MainLayout>
    </>
  );
};
