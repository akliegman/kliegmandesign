import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { TextBlock, TextBlockItem } from "../components/reusables";
import { privacyPageData } from "./data/privacyPageData";

import styles from "./PrivacyPolicyPage.module.less";

export const PrivacyPolicyPage = () => {
  return (
    <>
      <PageHelmet title="Privacy Policy" />
      <div className={styles.Container}>
        <div className={styles.Main}>
          <TextBlock>
            {privacyPageData?.map((item, index) => (
              <TextBlockItem item={item} key={index} />
            ))}
          </TextBlock>
        </div>
      </div>
    </>
  );
};
