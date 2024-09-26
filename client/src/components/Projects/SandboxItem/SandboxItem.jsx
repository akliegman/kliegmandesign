import { GithubOutlined } from "@ant-design/icons";
import { IconButton } from "../../reusables";

import styles from "./SandboxItem.module.less";

export const SandboxItem = ({ data }) => {
  return (
    <a href={data.url} target="_blank" className={styles.Item} rel="noreferrer">
      <div className={styles.MainLink}>
        <h2 className={styles.Title}>{data?.title}</h2>
        <p className={styles.Summary}>{data?.summary}</p>
      </div>
      <IconButton
        type="external"
        className={styles.GithubLink}
        to={data.github_url}
        size="sm"
        icon={<GithubOutlined />}
      />
    </a>
  );
};
