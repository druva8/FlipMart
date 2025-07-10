import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Accessories = () => {
  const outletContext = useOutletContext();
  const cart = outletContext?.cart || [];
  const setCart = outletContext?.setCart || (() => {});
  const { wishlist, toggleWishlist } = useCart();

  const [products] = useState([
    {
      name: "lenovo Smart Clock 2",
      price: 399,
      displayType: "Always-On Retina LTPO OLED",
      color: "Midnight",
      image: "/assets/colck.jpg",
    },
    {
      name: "boat headphones",
      price: 58,
      displayType: "Super AMOLED",
      color: "Graphite",
      image: "/assets/head.jpg",
    },
    {
      name: "samsung Galaxy Buds 2 Pro",
      price: 67,
      displayType: "AMOLED",
      color: "Slate Gray",
      image: "/assets/buds.jpg",
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
        <h2 className="text-3xl font-bold mb-6 text-center">Accessories</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((accessory) => {
            const isWished = wishlist.some(
              (item) => item.name === accessory.name
            );

            return (
              <div
                key={accessory.name}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={accessory.image}
                  alt={accessory.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{accessory.name}</h3>
                    <button onClick={() => handleWishlistToggle(accessory)}>
                      {isWished ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600">Price: ${accessory.price}</p>
                  <p className="text-gray-600">
                    Display: {accessory.displayType}
                  </p>
                  <p className="text-gray-600">Color: {accessory.color}</p>
                  <button
                    onClick={() => handleAddToCart(accessory)}
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

export default Accessories;
