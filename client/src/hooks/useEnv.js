import { api } from "../api/api";

const getEnvVars = async () => {
  const { data } = await api.get("/env");
  return data;
};

export const useEnv = () => {
  return { getEnvVars };
};
