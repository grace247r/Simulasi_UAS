import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Plus, Minus, Trash2 } from "lucide-react";
import {
  getCart,
  updateCartItem,
  removeFromCart,
} from "../services/produkService";

const Keranjang = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect ke login kalau belum login
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Fetch cart dari backend
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const data = await getCart();
        setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantityHandler = async (id, newQuantity) => {
    if (newQuantity === 0) {
      await removeItemHandler(id);
      return;
    }
    try {
      await updateCartItem(id, newQuantity);
      setCartItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItemHandler = async (id) => {
    try {
      await removeFromCart(id);
      setCartItems((items) => items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200000 ? 0 : 15000;
  const total = subtotal + shipping;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading cart...</p>
      </div>
    );
  }

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
            Continue Shopping
          </Link>
          <h1 className="text-2xl font-bold">EcoShop 🌿</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingCart size={22} />
            <span className="bg-green-600 px-2 py-1 rounded-full text-sm">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-4">
              Your cart is empty
            </h3>
            <Link
              to="/products"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-6 border-b border-gray-200 last:border-b-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-green-600 font-medium">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantityHandler(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantityHandler(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="ml-6 text-right">
                      <p className="text-lg font-semibold text-gray-800">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => removeItemHandler(item.id)}
                        className="text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  {subtotal < 200000 && (
                    <p className="text-sm text-gray-500">
                      Add {formatPrice(200000 - subtotal)} more for free
                      shipping
                    </p>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 text-center block mt-6"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Keranjang;
