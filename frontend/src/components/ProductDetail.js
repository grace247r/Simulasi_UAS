// src/components/ProductDetail.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Truck,
  Shield,
  Heart,
  LogIn,
} from "lucide-react";
import productService from "../services/produkService";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Fetch produk by id
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        setQuantity(1);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleLogout = () => {
    productService.handleLogout();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    if (!product || !product.id) {
      alert("Product data is missing.");
      return;
    }

    try {
      // Kirim product.id dan quantity ke backend
      const addedItem = await productService.addToCart(product.id, quantity);
      alert(`${addedItem.nama || "Product"} added to cart!`);
      navigate("/cart");
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("Failed to add product to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  // Pastikan harga valid
  const displayHarga = Number(product.harga) || 0;
  const displayStok = Number(product.stok) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            to="/products"
            className="flex items-center gap-2 hover:bg-green-600 px-3 py-2 rounded"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
          <h1 className="text-2xl font-bold">EcoShop 🌿</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative p-2 hover:bg-green-600 rounded-full"
          >
            <ShoppingCart size={22} />
          </Link>
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-1 hover:text-green-200 font-medium"
              >
                <LogIn size={18} /> Login
              </Link>
              <Link
                to="/signup"
                className="bg-white text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-white text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition"
            >
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Product Detail */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={product.foto || ""}
              alt={product.nama}
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.nama || "Unnamed Product"}
              </h1>
              <p className="text-green-600 text-2xl font-semibold">
                Rp{displayHarga.toLocaleString("id-ID")}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating?.toFixed(1) || 0} ({product.reviews || 0}{" "}
                  reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.deskripsi || "No description available"}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-semibold">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(displayStok, quantity + 1))
                    }
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-500">Stock: {displayStok}</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 font-semibold text-center"
                >
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-100">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="text-green-600" size={20} />
                <span className="text-sm">
                  Free shipping on orders over Rp200.000
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-green-600" size={20} />
                <span className="text-sm">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
