import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, CreditCard, Search, Home, LogIn } from "lucide-react";
import { getProducts, handleLogout as serviceLogout } from "../services/produkService";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const navigate = useNavigate();

  // Fetch products dengan polling
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getProducts();
        const dataWithFullUrl = data.map((p) => ({
          ...p,
          foto: p.foto?.startsWith("http") ? p.foto : `http://127.0.0.1:8000${p.foto}`,
        }));
        setProducts(dataWithFullUrl);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // reload tiap 5 detik
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase())
  );

  // Logout handler
  const handleLogout = () => {
    serviceLogout(); // hapus token dari localStorage
    setToken(null);
    navigate("/"); // redirect ke login page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">EcoShop 🌿</h1>
        <div className="flex items-center gap-4">
          <Link to="/homepage" className="text-white hover:text-green-200">
            <Home size={22} />
          </Link>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-lg text-gray-700 focus:outline-none"
            />
          </div>
          <Link to="/cart" className="relative p-2 hover:bg-green-600 rounded-full block">
            <ShoppingCart size={22} />
          </Link>
          <button className="relative p-2 hover:bg-green-600 rounded-full">
            <CreditCard size={22} />
          </button>

          {/* Login / Signup / Logout */}
          {!token ? (
            <>
              <Link
                to="/"
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

      {/* Products Section */}
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          All Products
        </h2>

        {isLoading ? (
          <p className="text-gray-500 text-center mt-10">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 overflow-hidden block"
              >
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.nama}
                  </h3>
                  <p className="text-green-600 font-medium mt-2">
                    Rp{item.harga}
                  </p>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700">
                    View Details
                  </button>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No products found 🌱
          </p>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
