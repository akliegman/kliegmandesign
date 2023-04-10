import { MainLayout } from "../layouts/MainLayout";
import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { Resume } from "../components/Resume/Resume";
import { ResumeDownloadButton } from "../components/Resume/ResumeDownloadButton";
import { useMountPage } from "../hooks/useMountPage";

export const ResumePage = () => {
  useMountPage();
  return (
    <>
      <PageHelmet
        title="Résumé"
        description={`Seeking a position that will leverage my expertise in \
        product development & frontend engineering to create user-friendly \
        web apps on a cutting-edge technology stack.`}
      />
      <MainLayout className="ResumePage">
        <Resume />
        <ResumeDownloadButton />
      </MainLayout>
    </>
  );
};
