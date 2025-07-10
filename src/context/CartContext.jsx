import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ✅ Add to Cart (with quantity management)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const newItem = { ...product, id: uuidv4(), quantity: 1 };
      return [...prevCart, newItem];
    });
  };

  // ✅ Toggle Wishlist (NO TOAST here)
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((item) => item.name === product.name);
      if (exists) {
        return prevWishlist.filter((item) => item.name !== product.name);
      }
      const wishedItem = { ...product, id: uuidv4() };
      return [...prevWishlist, wishedItem];
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, wishlist, toggleWishlist }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
