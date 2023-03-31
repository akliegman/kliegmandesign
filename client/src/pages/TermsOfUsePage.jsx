import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { StaticLayout } from "../layouts/StaticLayout";
import {
  LegalContent,
  LegalContentItem,
} from "../components/LegalContent/LegalContent";
import { termsOfUsePageData } from "./data/termsOfUsePageData";

export const TermsOfUsePage = () => {
  return (
    <>
      <PageHelmet title="Terms Of Use" />
      <StaticLayout className="TermsOfUsePage">
        <LegalContent>
          {termsOfUsePageData?.map((item, index) => (
            <LegalContentItem item={item} key={index} />
          ))}
        </LegalContent>
      </StaticLayout>
    </>
  );
};
