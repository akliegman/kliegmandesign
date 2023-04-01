import { PageHelmet } from "../components/PageHelmet/PageHelmet";
import { StaticLayout } from "../layouts/StaticLayout";

export const SandboxPage = () => {
  return (
    <>
      <PageHelmet title="Sandbox" />
      <StaticLayout className="SandboxPage">
        <h1>Sandbox</h1>
      </StaticLayout>
    </>
  );
};
