import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, LogIn } from "lucide-react";
import { getProducts } from "../services/produkService";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-green-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link to="/" className="text-3xl font-bold tracking-wide">
            EcoShop 🌿
          </Link>

          {/* Search Bar */}
          <div className="relative w-1/3">
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search eco-friendly products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <Link
              to="/products"
              className="hover:text-green-200 font-medium transition"
            >
              Products
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-green-200 font-medium transition"
            >
              <LogIn size={18} /> Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-green-700 px-4 py-2 rounded-full font-semibold hover:bg-green-100 transition"
            >
              Sign Up
            </Link>
            <Link
              to="/cart"
              className="relative p-2 hover:bg-green-600 rounded-full transition"
            >
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 bg-red-500 text-xs px-1 rounded-full">
                2
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-green-100 py-16 text-center">
        <h1 className="text-4xl font-extrabold text-green-800 mb-4">
          Sustainable Shopping Made Easy 🌎
        </h1>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Discover eco-friendly products that care for you and the planet. Shop
          smart, live sustainably, and make every purchase matter.
        </p>
        <Link
          to="/products"
          className="bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition"
        >
          Start Shopping
        </Link>
      </section>

      {/* Product Section */}
      <main className="max-w-7xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Featured Products
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <img
                  src={item.foto}
                  alt={item.nama}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5 flex flex-col items-center text-center">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.nama}
                  </h3>
                  <p className="text-green-600 font-bold mb-3">
                    Rp{Number(item.harga).toLocaleString("id-ID")}
                  </p>
                  <button className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition font-medium">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10 text-lg">
            Loading or no products found 🌱
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-gray-100 text-center py-6 mt-12">
        <p className="text-sm">
          © {new Date().getFullYear()} EcoShop. Made with 💚 for a better
          planet.
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
