import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const TVs = () => {
  const outletContext = useOutletContext();
  const cart = outletContext?.cart || [];
  const setCart = outletContext?.setCart || (() => {});
  const { wishlist, toggleWishlist } = useCart();

  const [products] = useState([
    {
      name: "MI 65-inch QLED 4K TV",
      price: 1299,
      screenSize: '65" QLED 4K',
      color: "Titan Black",
      image: "/assets/mi.png",
    },
    {
      name: "LG OLED 55-inch 4K Smart TV",
      price: 1499,
      screenSize: '55" OLED 4K',
      color: "Silver",
      image: "/assets/lg.png",
    },
    {
      name: "Sony Bravia 75-inch 8K TV",
      price: 2999,
      screenSize: '75" 8K LED',
      color: "Dark Silver",
      image: "/assets/sony.png",
    },
  ]);

  // ✅ Add to cart
  const handleAddToCart = (product) => {
    const newItem = {
      ...product,
      id: uuidv4(),
      quantity: 1,
    };
    setCart((prevCart) => [...prevCart, newItem]);
    toast.success(`🛒 ${product.name} added to cart!`);
  };

  // ✅ Toggle wishlist + single toast
  const handleWishlistToggle = (product) => {
    const isWished = wishlist.some((item) => item.name === product.name);
    toggleWishlist(product);

    toast[isWished ? "info" : "success"](
      isWished
        ? `💔 Removed from wishlist: ${product.name}`
        : `💖 ${product.name} added to wishlist!`
    );
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Smart TVs</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((tv) => {
            const isWished = wishlist.some((item) => item.name === tv.name);

            return (
              <div
                key={tv.name}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={tv.image}
                  alt={tv.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{tv.name}</h3>
                    <button onClick={() => handleWishlistToggle(tv)}>
                      {isWished ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600">Price: ${tv.price}</p>
                  <p className="text-gray-600">Screen: {tv.screenSize}</p>
                  <p className="text-gray-600">Color: {tv.color}</p>
                  <button
                    onClick={() => handleAddToCart(tv)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TVs;
