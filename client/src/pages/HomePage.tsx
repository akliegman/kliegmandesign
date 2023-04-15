// @ts-nocheck
import { HomeLayout } from "../layouts/HomeLayout";
import { homePageData } from "./data/homePageData";
import { useMountPage } from "../hooks/useMountPage";

export const HomePage = () => {
  useMountPage();

  return <HomeLayout data={homePageData} />;
};
