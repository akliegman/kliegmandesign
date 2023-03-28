import { StaticLayout } from "../layouts/StaticLayout";
import { Button } from "../components/reusables/";
import { LeftCircleFilled } from "@ant-design/icons";

export const Error404Page = () => {
  return (
    <StaticLayout className="Error404Page">
      <div>
        <h1>How'd you get here?</h1>
        <h2>Page Not Found</h2>
        <Button
          type="link"
          to="/"
          className="Error404Page__Back"
          icon={<LeftCircleFilled />}
        >
          Return Home
        </Button>
      </div>
    </StaticLayout>
  );
};
