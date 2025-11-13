import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/produk/";

export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("Fetched data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

export const createProduct = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}/`);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
