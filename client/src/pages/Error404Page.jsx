import { StaticLayout } from "../layouts/StaticLayout";
import { Button } from "../components/reusables/";
import { LeftCircleFilled } from "@ant-design/icons";
import { QuestionCircleFilled } from "@ant-design/icons";

export const Error404Page = () => {
  return (
    <StaticLayout className="Error404Page" alignItems="center">
      <QuestionCircleFilled />
      <h1>How'd you get here?</h1>
      <p>
        Sorry, this page doesn't exist. You'd be better off going back to the
        homepage.
      </p>
      <Button
        type="link"
        to="/"
        className="Error404Page__back"
        icon={<LeftCircleFilled />}
      >
        Return Home
      </Button>
    </StaticLayout>
  );
};
