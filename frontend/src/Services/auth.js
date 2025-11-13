import api from "./api";

export const loginUser = async (username, password) => {
  const response = await api.post("/login/", { username, password });
  if (response.data.access) {
    localStorage.setItem("token", response.data.access);
  }
  return response;
};

export const signupUser = async (name, username, email, password) => {
  const response = await api.post("/register/", { name, username, email, password });
  return response;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const response = await api.get("/user/");
  return response;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
