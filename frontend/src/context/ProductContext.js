// src/context/ProductContext.js

import React, { createContext, useState, useEffect } from 'react';
import { getProducts } from '../services/produkService';

// 1. Buat Context
export const ProductContext = createContext();

// 2. Buat Provider Component
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data hanya sekali di sini
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Fungsi yang akan digunakan untuk menambah produk baru
    const addProduct = (newProduct) => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
    };

    return (
        <ProductContext.Provider value={{ products, isLoading, setProducts, addProduct }}>
            {children}
        </ProductContext.Provider>
    );
};