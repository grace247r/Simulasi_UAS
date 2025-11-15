import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext"; // <--- WAJIB ADA

import Homepage from "./components/homepage";
import ProductsPage from "./components/ProductsPage";
import ProductDetail from "./components/ProductDetail";
import Keranjang from "./components/keranjang";
import Checkout from "./components/checkout";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  return (
    <ProductProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Keranjang />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App;
