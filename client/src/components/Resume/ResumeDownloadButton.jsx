import { IconButton } from "../reusables";
import { DownloadOutlined } from "@ant-design/icons";
import "./ResumeDownloadButton.less";
export const ResumeDownloadButton = () => {
  return (
    <IconButton
      className="ResumeDownloadButton"
      type="download"
      variant="primary"
      size="large"
      to={process.env.PUBLIC_URL + "/resume_kliegman_adam_2023.pdf"}
      icon={<DownloadOutlined />}
      withShadow
    >
      Download
    </IconButton>
  );
};
