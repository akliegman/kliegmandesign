import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

const loginUser = async (user, password, email) => {
  try {
    const response = await api.get("/login", {
      auth: {
        username: user,
        password: password,
      },
      params: {
        email: email,
      },
    });

    return response.data;
  } catch (error) {
    return { error: error.response.data };
  }
};

const authUser = async () => {
  try {
    const response = await api.get("/auth");
    return response.data;
  } catch (error) {
    return { error: error.response.data };
  }
};

const logoutUser = async () => {
  try {
    const logout = await api.get("/logout");

    try {
      if (logout.data.error) {
        return logout.data;
      }
      const response = await api.get("/auth");
      return response.data;
    } catch (error) {
      return { error: error.response.data };
    }
  } catch (error) {
    return { error: error.response.data };
  }
};

export { authUser, loginUser, logoutUser };
