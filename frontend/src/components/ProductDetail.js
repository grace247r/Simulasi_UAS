import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowLeft,
  Star,
  Truck,
  Shield,
  Heart,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Eco Tote Bag",
    price: "Rp120.000",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accessories",
    description:
      "A stylish and eco-friendly tote bag made from recycled materials. Perfect for carrying your daily essentials while reducing environmental impact.",
    features: [
      "Recycled polyester",
      "Water-resistant",
      "Adjustable straps",
      "Multiple compartments",
    ],
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Reusable Water Bottle",
    price: "Rp90.000",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Home & Garden",
    description:
      "Stay hydrated with this durable, BPA-free reusable water bottle. Keeps drinks cold for 24 hours or hot for 12 hours.",
    features: [
      "BPA-free plastic",
      "Insulated",
      "Leak-proof lid",
      "Easy to clean",
    ],
    rating: 4.7,
    reviews: 95,
  },
  {
    id: 3,
    name: "Bamboo Sunglasses",
    price: "Rp150.000",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f17ab?w=400&h=400&fit=crop",
    category: "Accessories",
    description:
      "Protect your eyes with these sustainable bamboo frame sunglasses. UV protection with a stylish, eco-conscious design.",
    features: [
      "UV400 protection",
      "Bamboo frames",
      "Polarized lenses",
      "Lightweight",
    ],
    rating: 4.3,
    reviews: 67,
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: "Rp180.000",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Clothing",
    description:
      "Comfortable and sustainable organic cotton t-shirt. Soft, breathable, and perfect for everyday wear.",
    features: [
      "100% organic cotton",
      "Fair trade certified",
      "Pre-shrunk",
      "Available in multiple sizes",
    ],
    rating: 4.6,
    reviews: 203,
  },
  {
    id: 5,
    name: "Wooden Phone Case",
    price: "Rp130.000",
    image:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop",
    category: "Accessories",
    description:
      "Protect your phone with this elegant wooden case. Made from sustainable bamboo with a minimalist design.",
    features: [
      "Bamboo construction",
      "Wireless charging compatible",
      "Shock-absorbent",
      "Slim profile",
    ],
    rating: 4.4,
    reviews: 89,
  },
  {
    id: 6,
    name: "Straw Set",
    price: "Rp50.000",
    image:
      "https://down-id.img.susercontent.com/file/id-11134207-81ztn-mf98nbw8jr4d21.webp",
    category: "Home & Garden",
    description:
      "Eco-friendly straw set made from stainless steel. Durable, reusable, and perfect for sustainable living.",
    features: [
      "Stainless steel",
      "Dishwasher safe",
      "Set of 4",
      "Cleaning brush included",
    ],
    rating: 4.2,
    reviews: 156,
  },
  {
    id: 7,
    name: "Natural Lip Balm",
    price: "Rp70.000",
    image:
      "https://luxeluna.co.uk/cdn/shop/files/F71FBA61-CD7B-4001-92E2-7500FCE6C173.jpg?v=1750604077&width=533",
    category: "Beauty",
    description:
      "Moisturize your lips with this natural lip balm made from organic ingredients. SPF protection included.",
    features: [
      "Organic ingredients",
      "SPF 15",
      "Beeswax base",
      "Long-lasting moisture",
    ],
    rating: 4.8,
    reviews: 312,
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
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
        </div>
      </header>

      {/* Product Detail */}
      <main className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-green-600 text-2xl font-semibold">
                {product.price}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
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
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  to="/cart"
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 font-semibold text-center"
                >
                  Add to Cart
                </Link>
                <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-100">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Shipping Info */}
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
