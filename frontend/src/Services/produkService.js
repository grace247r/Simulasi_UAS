import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/produk/";
const CART_URL = "http://127.0.0.1:8000/api/item-keranjang/";

// Fungsi pembantu untuk mendapatkan header otorisasi token DRF
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Authentication Error: Token is missing from localStorage.");
    throw new Error("Authentication credentials were not provided. Please log in.");
  }

  // Gunakan format Token <token> untuk DRF
  return {
    headers: {
      Authorization: `Token ${token}`, 
    },
  };
};

// ---------- Produk ----------
export const getProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err.response?.data || err.message);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}${id}/`);
    return res.data;
  } catch (err) {
    console.error("Error fetching product:", err.response?.data || err.message);
    throw err; 
  }
};

// ---------- Cart ----------
export const getCart = async () => {
  try {
    const res = await axios.get(CART_URL, getAuthHeaders());
    return res.data;
  } catch (err) {
    console.error("Failed to fetch cart:", err.response?.data || err.message);
    return [];
  }
};

export const addToCart = async (productId, jumlah = 1) => {
  try {
    const res = await axios.post(
      CART_URL,
      { produk: productId, jumlah },
      getAuthHeaders()
    );
    return res.data;
  } catch (err) {
    console.error("Failed to add to cart:", err.response?.data || err.message);
    throw err;
  }
};

export const updateCartItem = async (id, jumlah) => {
  try {
    await axios.put(
      `${CART_URL}${id}/`,
      { jumlah },
      getAuthHeaders()
    );
  } catch (err) {
    console.error("Failed to update cart item:", err.response?.data || err.message);
    throw err; 
  }
};

export const removeFromCart = async (id) => {
  try {
    await axios.delete(`${CART_URL}${id}/`, getAuthHeaders());
  } catch (err) {
    console.error("Failed to remove cart item:", err.response?.data || err.message);
    throw err; 
  }
};

// ---------- Logout ----------
export const handleLogout = () => {
  localStorage.removeItem("token");
};

export default {
  getProducts,
  getProductById,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  handleLogout,
};
