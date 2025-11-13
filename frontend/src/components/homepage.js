import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, CreditCard, Search } from "lucide-react"; // hapus yang nggak kepakai
import { getProducts } from "../services/produkService"; // pastikan file ini ada

const Homepage = () => {
  const [products, setProducts] = useState([]); // awalnya kosong
  const [search, setSearch] = useState("");

  // Fetch produk dari backend waktu komponen dimount
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
      {/* Header */}
      <header className="bg-green-700 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <h1 className="text-2xl font-bold">EcoShop 🌿</h1>
        <div className="flex items-center gap-4">
          <Link to="/products" className="text-white hover:text-green-200">
            Products
          </Link>
          <div className="relative">
            <Search
              className="absolute left-2 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-lg text-gray-700 focus:outline-none"
            />
          </div>
          <Link
            to="/cart"
            className="relative p-2 hover:bg-green-600 rounded-full block"
          >
            <ShoppingCart size={22} />
          </Link>
          <button className="relative p-2 hover:bg-green-600 rounded-full">
            <CreditCard size={22} />
          </button>
        </div>
      </header>

      {/* Produk Section */}
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Featured Products
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 overflow-hidden"
              >
                <img
                  src={`http://127.0.0.1:8000${item.foto}`} // gunakan foto dari backend
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
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            Loading or no products found.
          </p>
        )}
      </main>
    </div>
  );
};

export default Homepage;
