import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { StaticLayout } from "../layouts/StaticLayout";
import {
  LegalContent,
  LegalContentItem,
} from "../components/LegalContent/LegalContent";
import { privacyPageData } from "./data/privacyPageData";

export const PrivacyPolicyPage = () => {
  return (
    <>
      <PageHelmet title="Privacy Policy" />
      <StaticLayout className="PrivacyPolicyPage">
        <LegalContent>
          {privacyPageData?.map((item, index) => (
            <LegalContentItem item={item} key={index} />
          ))}
        </LegalContent>
      </StaticLayout>
    </>
  );
};
