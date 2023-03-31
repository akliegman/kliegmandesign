import { HomeLayout } from "../layouts/HomeLayout";
import { homePageData } from "./data/homePageData";
export const HomePage = () => {
  return <HomeLayout data={homePageData} />;
};
