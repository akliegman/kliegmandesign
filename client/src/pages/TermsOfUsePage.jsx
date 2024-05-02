import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { TextBlock, TextBlockItem } from "../components/reusables";
import { termsOfUsePageData } from "./data/termsOfUsePageData";

import styles from "./TermsOfUsePage.module.less";

export const TermsOfUsePage = () => {
  return (
    <>
      <PageHelmet title="Terms Of Use" />
      <div className={styles.Container}>
        <div className={styles.Main}>
          <TextBlock>
            {termsOfUsePageData?.map((item, index) => (
              <TextBlockItem item={item} key={index} />
            ))}
          </TextBlock>
        </div>
      </div>
    </>
  );
};
