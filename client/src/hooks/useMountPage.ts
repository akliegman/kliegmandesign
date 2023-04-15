// @ts-nocheck
import { useEffect } from "react";
import { useLoading } from "../context/LoadingContext";

export const useMountPage = () => {
  const { setPageLoading } = useLoading();

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    setPageLoading(false);
  }, []);

  return;
};
