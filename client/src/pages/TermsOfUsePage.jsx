import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { StaticLayout } from "../layouts/StaticLayout";
import { TextBlock, TextBlockItem } from "../components/reusables";
import { termsOfUsePageData } from "./data/termsOfUsePageData";
import { useMountPage } from "../context/LoadingContext";

export const TermsOfUsePage = () => {
  useMountPage();
  return (
    <>
      <PageHelmet title="Terms Of Use" />
      <StaticLayout className="TermsOfUsePage">
        <TextBlock>
          {termsOfUsePageData?.map((item, index) => (
            <TextBlockItem item={item} key={index} />
          ))}
        </TextBlock>
      </StaticLayout>
    </>
  );
};
