import { api } from "../api/api";

const getEnvVars = async () => {
  try {
    const response = await api.get("/env");
    return response.data;
  } catch (error) {
    return { error: error?.response?.data };
  }
};

export { getEnvVars };
