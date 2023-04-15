// @ts-nocheck
import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { MainLayout } from "../layouts/MainLayout";
import { projectsPageData } from "./data/projectsPageData";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Project } from "../components/Project/Project";
import { useMountPage } from "../hooks/useMountPage";

export const ProjectPage = () => {
  useMountPage();
  const { projectName } = useParams();
  const navigate = useNavigate();

  const project = projectsPageData.find((project) => {
    return project.name === projectName;
  });

  useEffect(() => {
    if (!project || project?.protected === true) {
      navigate("/404");
    }
  }, [project, navigate]);

  return (
    <>
      <PageHelmet title={`${project?.title} Project`} />
      <MainLayout className="ProjectPage">
        <Project data={project} />
      </MainLayout>
    </>
  );
};
