import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { StaticLayout } from "../layouts/StaticLayout";
import { useMountPage } from "../context/LoadingContext";

export const SandboxPage = () => {
  useMountPage();
  return (
    <>
      <PageHelmet title="Sandbox" />
      <StaticLayout className="SandboxPage">
        <h1>Sandbox</h1>
      </StaticLayout>
    </>
  );
};
