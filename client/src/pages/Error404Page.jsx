import { QuestionOutlined } from "@ant-design/icons";
import { Button } from "../components/reusables/";

import styles from "./Error404Page.module.less";

export const Error404Page = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Main}>
        <div className={styles.Image}>
          <QuestionOutlined className={styles.Icon} />
        </div>
        <div className={styles.Content}>
          <h1 className={styles.Header}>How'd you get here?</h1>
          <p className={styles.Description}>
            Sorry, this page doesn't exist. You'd be better off going back to
            the homepage.
          </p>
          <Button
            type="link"
            to="/"
            variant="primary"
            className={styles.Button}
            size="lg"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};
