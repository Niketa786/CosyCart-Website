import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const isExisting = prevCart.find(
                (item) => item.id === product.id && item.size === product.size
            );

            if (isExisting) {
                return prevCart.map((item) =>
                    (item.id === product.id && item.size === product.size)
                    ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                    : item
                );
            }
            return [...prevCart, { ...product, quantity: product.quantity || 1 }];
        });
    };

    const removeFromCart = (productId, size, productName) => {
        alert(productName + " (Size: " + size + ") removed from cart!");
        setCart(cart.filter(item => !(item.id === productId && item.size === size)));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);