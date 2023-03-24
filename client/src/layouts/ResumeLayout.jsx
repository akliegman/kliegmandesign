import { Resume } from "../components/Resume/Resume";
import { ResumeDownloadButton } from "../components/Resume/ResumeDownloadButton";
import { Button } from "../components/reusables/Button/Button";
import { LeftCircleFilled } from "@ant-design/icons";
import { Footer } from "../components/Footer/Footer";
import "./ResumeLayout.less";

export const ResumeLayout = () => {
  return (
    <div className="ResumeLayout">
      <Button
        type="link"
        to="/"
        className="ResumeLayout__Back"
        icon={<LeftCircleFilled />}
      >
        Return Home
      </Button>
      <Resume />
      <ResumeDownloadButton />
      <Footer className="ResumeLayout__Footer" />
    </div>
  );
};
