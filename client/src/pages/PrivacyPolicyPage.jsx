import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { StaticLayout } from "../layouts/StaticLayout";
import { TextBlock, TextBlockItem } from "../components/reusables";
import { privacyPageData } from "./data/privacyPageData";
import { useMountPage } from "../hooks/useMountPage";

export const PrivacyPolicyPage = () => {
  useMountPage();
  return (
    <>
      <PageHelmet title="Privacy Policy" />
      <StaticLayout className="PrivacyPolicyPage">
        <TextBlock>
          {privacyPageData?.map((item, index) => (
            <TextBlockItem item={item} key={index} />
          ))}
        </TextBlock>
      </StaticLayout>
    </>
  );
};
