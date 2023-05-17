export const readError = (error) => {
  return {
    status: error?.response?.status || 500,
    code: error?.response?.data?.code || error?.code || "UNKNOWN_ERROR",
    message:
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong",
  };
};
