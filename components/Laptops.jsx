import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Laptops = () => {
  const outletContext = useOutletContext();
  const cart = outletContext?.cart || [];
  const setCart = outletContext?.setCart || (() => {});
  const { wishlist, toggleWishlist } = useCart();

  const [products] = useState([
    {
      name: "Apple MacBook Pro 16-inch (2023)",
      price: 2499,
      screenSize: '16.2" Liquid Retina XDR',
      color: "Space Gray",
      image: "/assets/lapaa.png",
    },
    {
      name: "Dell XPS 13",
      price: 1299,
      screenSize: '13.4" Full HD+',
      color: "Platinum Silver",
      image: "/assets/dell.png",
    },
    {
      name: "Lenovo ThinkPad X1 Carbon",
      price: 1499,
      screenSize: '14.0" WQXGA',
      color: "Black",
      image: "/assets/thinkpad.png",
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
        <h2 className="text-3xl font-bold mb-6 text-center">Laptops</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((laptop) => {
            const isWished = wishlist.some((item) => item.name === laptop.name);

            return (
              <div
                key={laptop.name}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={laptop.image}
                  alt={laptop.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{laptop.name}</h3>
                    <button onClick={() => handleWishlistToggle(laptop)}>
                      {isWished ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600">Price: ${laptop.price}</p>
                  <p className="text-gray-600">Screen: {laptop.screenSize}</p>
                  <p className="text-gray-600">Color: {laptop.color}</p>
                  <button
                    onClick={() => handleAddToCart(laptop)}
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

export default Laptops;
