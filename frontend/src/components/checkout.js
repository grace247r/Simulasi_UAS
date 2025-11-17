import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Truck, Wallet, Check } from "lucide-react";
import { checkoutAPI } from "../services/api.js"; // <- pastikan path sesuai
import { getCart } from "../services/produkService.js";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [selectedShipping, setSelectedShipping] = useState("regular");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const userAddress = "Jl. Mawar No. 123, Tangerang, Banten, Indonesia, 15118";

  // Redirect ke login kalau belum login
  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Fetch cart saat halaman dibuka
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCart();
        setCartItems(data);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading checkout...</p>
      </div>
    );
  }

  // Jika keranjang kosong
  if (cartItems.length === 0) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Keranjangmu kosong.</p>
        <Link to="/" className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Belanja Sekarang
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const shippingCost = selectedShipping === "regular" ? 15000 : 30000;
  const total = subtotal + shippingCost;

  const formatPrice = (price) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const handlePlaceOrder = async () => {
    try {
      setError(null);
      const checkoutData = {
        shipping_method: selectedShipping,
        payment_method: selectedPayment,
      };
      const response = await checkoutAPI.createCheckout(checkoutData);
      console.log("Checkout response:", response);
      setOrderPlaced(true);
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Gagal melakukan checkout. Silakan coba lagi.");
    }
  };

  // SUCCESS PAGE
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pesanan Berhasil Dibuat!
          </h2>
          <p className="text-gray-600 mb-6">
            Terima kasih! Pesananmu sedang diproses.
          </p>
          <Link
            to="/homepage"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-200 inline-block"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  // MAIN PAGE
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="flex items-center gap-2 hover:bg-green-600 px-3 py-2 rounded"
          >
            <ArrowLeft size={20} />
            Back to Cart
          </Link>
          <h1 className="text-2xl font-bold">EcoShop 🌿</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image || "/default-image.jpg"}
                    alt={item.name || "Product"}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name || "Product"}</h4>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold mt-2">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

          {/* Payment & Shipping */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={20} className="text-green-600" />
                <h3 className="text-xl font-semibold">Shipping Address</h3>
              </div>
              <p className="text-gray-700">{userAddress}</p>
            </div>

            {/* Shipping Options */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Truck size={20} className="text-green-600" />
                <h3 className="text-xl font-semibold">Shipping Method</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="regular"
                    checked={selectedShipping === "regular"}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="mr-2"
                  />
                  Regular Shipping (2-3 days) - {formatPrice(15000)}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="express"
                    checked={selectedShipping === "express"}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="mr-2"
                  />
                  Express Shipping (1 day) - {formatPrice(30000)}
                </label>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-2 mb-4">
                <Wallet size={20} className="text-green-600" />
                <h3 className="text-xl font-semibold">Payment Method</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="COD"
                    checked={selectedPayment === "COD"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-2"
                  />
                  Cash on Delivery (COD)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="transfer"
                    checked={selectedPayment === "transfer"}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="mr-2"
                  />
                  Bank Transfer
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 text-white py-4 rounded-lg hover:bg-green-700 transition duration-200 text-xl font-semibold"
            >
              Place Order - {formatPrice(total)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
