import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true,
});

const loginUser = async (user, password, email) => {
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
};

const authUser = async () => {
  const response = await api.get("/auth");
  return response.data;
};

const logoutUser = async () => {
  const response = await api.post("/logout");
  return response.data;
};

export { authUser, loginUser, logoutUser };
