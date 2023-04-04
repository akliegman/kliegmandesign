import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { MainLayout } from "../layouts/MainLayout";
import { projectsData } from "./data/projectsData";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProjectPage = () => {
  const { projectName } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((project) => {
    return project.name === projectName;
  });

  useEffect(() => {
    if (!project || project?.protected === true) {
      navigate("/404");
    }
  }, [project, navigate]);

  return (
    <>
      <PageHelmet title="Projects" />
      <MainLayout className="ProjectPage">{projectName}</MainLayout>
    </>
  );
};
