import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/produk/";
const CART_URL = "http://127.0.0.1:8000/api/item-keranjang/";

// -------- Authorization Header ----------
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token missing from localStorage!");
    throw new Error("Please log in first.");
  }

  return {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
};

// -------- Produk ----------
export const getProducts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}${id}/`);
    return res.data;
  } catch (err) {
    console.error("Error fetching product:", err);
    throw err;
  }
};

// -------- Cart ----------
export const getCart = async () => {
  try {
    const res = await axios.get(CART_URL, getAuthHeaders());

    return res.data.map((item) => mapCartItem(item));
  } catch (err) {
    console.error("Failed to fetch cart:", err);
    return [];
  }
};

// -------- Add To Cart ----------
export const addToCart = async (productId, jumlah = 1) => {
  try {
    const res = await axios.post(
      CART_URL,
      {
        produk: productId,
        jumlah,
      },
      getAuthHeaders()
    );

    return mapCartItem(res.data);
  } catch (err) {
    console.log("Failed to add to cart:", err.response?.data || err.message);
    throw err;
  }
};

// -------- Update Cart Item ----------
export const updateCartItem = async (id, jumlah, produkId) => {
  try {
    const res = await axios.put(
      `${CART_URL}${id}/`,
      {
        jumlah,
        produk: produkId,
      },
      getAuthHeaders()
    );

    return mapCartItem(res.data);
  } catch (err) {
    console.error(
      "Failed to update cart item:",
      err.response?.data || err.message
    );
    throw err;
  }
};

// -------- Remove From Cart ----------
export const removeFromCart = async (id) => {
  try {
    await axios.delete(`${CART_URL}${id}/`, getAuthHeaders());
    return true;
  } catch (err) {
    console.error("Failed to remove cart item:", err);
    throw err;
  }
};

// -------- Checkout ----------
export const checkoutCart = async () => {
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/checkout/",
      {},
      getAuthHeaders()
    );

    return res.data;
  } catch (err) {
    console.error("Checkout failed:", err);
    throw err;
  }
};

// -------- Mapping Function ----------
const mapCartItem = (item) => {
  const img = item.produk_detail?.foto?.startsWith("http")
    ? item.produk_detail.foto
    : item.produk_detail?.foto
    ? `http://127.0.0.1:8000${item.produk_detail.foto}`
    : "";

  return {
    id: item.id,
    quantity: item.jumlah,
    nama: item.produk_detail?.nama,
    price: item.produk_detail?.harga,
    stok: item.produk_detail?.stok,
    produkId: item.produk,
    image: img,
  };
};

// -------- Logout ----------
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
  checkoutCart,
  handleLogout,
};
