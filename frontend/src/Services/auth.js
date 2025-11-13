import api from "./api";

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/login/", { email, password });
  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }
  return response;
};

export const signupUser = async (name, email, password) => {
  const response = await api.post("/auth/register/", { name, email, password });
  return response;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/user/");
  return response;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
