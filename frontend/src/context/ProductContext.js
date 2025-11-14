import React, { createContext, useState, useEffect } from 'react';
import { getProducts } from '../services/produkService';

// 1. Buat Context
export const ProductContext = createContext();

// 2. Buat Provider Component
export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data pertama kali dan polling setiap 5 detik
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

        // Fetch pertama
        fetchData();

        const interval = setInterval(fetchData, 5000);

        // Bersihkan interval saat component unmount
        return () => clearInterval(interval);
    }, []);

    // Fungsi untuk menambah produk baru secara manual (jika dibutuhkan)
    const addProduct = (newProduct) => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
    };

    return (
        <ProductContext.Provider value={{ products, isLoading, setProducts, addProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
