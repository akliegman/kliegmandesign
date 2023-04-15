// @ts-nocheck
import "./HomeLayout.less";
import { Masthead } from "../components/Masthead/Masthead";

export const HomeLayout = ({ data }) => {
  return (
    <div className="HomeLayout">
      <Masthead data={data} />
    </div>
  );
};
