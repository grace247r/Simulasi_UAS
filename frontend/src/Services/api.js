import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products API
export const productsAPI = {
  getAll: () => api.get("/produk/"),
  getById: (id) => api.get(`/produk/${id}/`),
  create: (data) => api.post("/produk/", data),
  update: (id, data) => api.put(`/produk/${id}/`, data),
  delete: (id) => api.delete(`/produk/${id}/`),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get("/keranjang/"),
  addToCart: (data) => api.post("/keranjang/", data),
  updateCartItem: (id, data) => api.put(`/itemkeranjang/${id}/`, data),
  removeCartItem: (id) => api.delete(`/itemkeranjang/${id}/`),
  clearCart: () => api.delete("/keranjang/"),
};

// Checkout API
export const checkoutAPI = {
  createCheckout: (data) => api.post("/checkout/", data),
  getCheckout: (id) => api.get(`/checkout/${id}/`),
  updateCheckout: (id, data) => api.put(`/checkout/${id}/`, data),
};

export default api;
