import { HomeLayout } from "../layouts/HomeLayout";
import { homePageData } from "./data/homePageData";
import { useMountPage } from "../context/LoadingContext";

export const HomePage = () => {
  useMountPage();

  return <HomeLayout data={homePageData} />;
};
