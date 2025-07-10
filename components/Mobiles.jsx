import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Mobiles = () => {
  const outletContext = useOutletContext();
  const cart = outletContext?.cart || [];
  const setCart = outletContext?.setCart || (() => {});
  const { wishlist, toggleWishlist } = useCart();

  const [products] = useState([
    {
      name: "iPhone 14 Pro",
      price: 1199,
      screenSize: '6.1" Super Retina XDR',
      color: "Deep Purple",
      image: "/assets/iphone_14.png",
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      price: 1399,
      screenSize: '6.8" QHD+ AMOLED',
      color: "Titanium Gray",
      image: "/assets/mobile2.jpg",
    },
    {
      name: "OnePlus 12",
      price: 799,
      screenSize: '6.7" Fluid AMOLED',
      color: "Silky Black",
      image: "/assets/download phh.jpg",
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
        <h2 className="text-3xl font-bold mb-6 text-center">Mobiles</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((mobile) => {
            const isWished = wishlist.some((item) => item.name === mobile.name);

            return (
              <div
                key={mobile.name}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={mobile.image}
                  alt={mobile.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{mobile.name}</h3>
                    <button onClick={() => handleWishlistToggle(mobile)}>
                      {isWished ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600">Price: ${mobile.price}</p>
                  <p className="text-gray-600">Screen: {mobile.screenSize}</p>
                  <p className="text-gray-600">Color: {mobile.color}</p>
                  <button
                    onClick={() => handleAddToCart(mobile)}
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

export default Mobiles;
