import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, CreditCard, Search, ArrowLeft } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Eco Tote Bag",
    price: "Rp120.000",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop",
    category: "Accessories",
  },
  {
    id: 2,
    name: "Reusable Water Bottle",
    price: "Rp90.000",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=200&h=200&fit=crop",
    category: "Home & Garden",
  },
  {
    id: 3,
    name: "Bamboo Sunglasses",
    price: "Rp150.000",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: "Rp180.000",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    category: "Clothing",
  },
  {
    id: 5,
    name: "Wooden Phone Case",
    price: "Rp130.000",
    image:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=200&h=200&fit=crop",
    category: "Accessories",
  },
  {
    id: 6,
    name: "Straw Set",
    price: "Rp50.000",
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-81ztn-mf98nbw8jr4d21.webp",
    category: "Home & Garden",
  },
  {
    id: 7,
    name: "Natural Lip Balm",
    price: "Rp70.000",
    image:
      "https://luxeluna.co.uk/cdn/shop/files/F71FBA61-CD7B-4001-92E2-7500FCE6C173.jpg?v=1750604077&width=533",
    category: "Beauty",
  },
];

const ProductsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "" || p.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 hover:bg-green-600 px-3 py-2 rounded"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-2xl font-bold">EcoShop 🌿</h1>
        </div>

        <div className="flex items-center gap-4">
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
            className="relative p-2 hover:bg-green-600 rounded-full"
          >
            <ShoppingCart size={22} />
          </Link>

          <button className="relative p-2 hover:bg-green-600 rounded-full">
            <CreditCard size={22} />
          </button>
        </div>
      </header>

      {/* Categories */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <button
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Accessories" ? "" : "Accessories"
                )
              }
              className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200 text-center ${
                selectedCategory === "Accessories"
                  ? "ring-2 ring-green-500"
                  : ""
              }`}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
              <h3 className="font-semibold">Accessories</h3>
            </button>
            <button
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Clothing" ? "" : "Clothing"
                )
              }
              className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200 text-center ${
                selectedCategory === "Clothing" ? "ring-2 ring-green-500" : ""
              }`}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👕</span>
              </div>
              <h3 className="font-semibold">Clothing</h3>
            </button>
            <button
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Home & Garden" ? "" : "Home & Garden"
                )
              }
              className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200 text-center ${
                selectedCategory === "Home & Garden"
                  ? "ring-2 ring-green-500"
                  : ""
              }`}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="font-semibold">Home & Garden</h3>
            </button>
            <button
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === "Beauty" ? "" : "Beauty"
                )
              }
              className={`bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200 text-center ${
                selectedCategory === "Beauty" ? "ring-2 ring-green-500" : ""
              }`}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💄</span>
              </div>
              <h3 className="font-semibold">Beauty</h3>
            </button>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Our Products
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-200 overflow-hidden block"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.name}
                  </h3>
                  <p className="text-green-600 font-medium mt-2">
                    {item.price}
                  </p>
                  <Link
                    to="/cart"
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 inline-block text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Add to Cart
                  </Link>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">No products found.</p>
        )}
      </main>
    </div>
  );
};

export default ProductsPage;
