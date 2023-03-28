import { ResumeLayout } from "../layouts/ResumeLayout";
import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { Resume } from "../components/Resume/Resume";
import { ResumeDownloadButton } from "../components/Resume/ResumeDownloadButton";
export const ResumePage = () => {
  return (
    <>
      <PageHelmet
        title="Resume"
        description={`Seeking a position that will leverage my expertise in \
        product development & frontend engineering to create user-friendly \
        web apps on a cutting-edge technology stack.`}
      />
      <ResumeLayout>
        <Resume />
        <ResumeDownloadButton />
      </ResumeLayout>
    </>
  );
};
