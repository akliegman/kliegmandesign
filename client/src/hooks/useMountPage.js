import { useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

export const useMountPage = () => {
  const { setPageLoading } = useLoading();

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    setPageLoading(false);
  }, []);

  return;
};
