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
    console.log(error);
  }
};

const authUser = async () => {
  try {
    const response = await api.get("/auth");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async () => {
  try {
    const response = await api.get("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { authUser, loginUser, logoutUser };
