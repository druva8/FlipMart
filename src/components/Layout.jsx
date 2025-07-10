import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";

function Layout() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/Home"); // Redirect to Home after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCart([]); // Clear cart on logout
    navigate("/login");
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {isAuthenticated && <Navbar cart={cart} />}
      <Outlet
        context={{
          cart,
          setCart,
          addToCart,
          isAuthenticated,
          handleLogin,
          handleLogout,
        }}
      />
    </div>
  );
}

export default Layout;
