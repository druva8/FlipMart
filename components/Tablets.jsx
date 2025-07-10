import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Tablets = () => {
  const outletContext = useOutletContext();
  const cart = outletContext?.cart || [];
  const setCart = outletContext?.setCart || (() => {});
  const { wishlist, toggleWishlist } = useCart();

  const [products] = useState([
    {
      name: "Apple iPad Pro 12.9-inch (2023)",
      price: 1099,
      screenSize: '12.9" Liquid Retina',
      color: "Space Gray",
      image: "/assets/apple.png",
    },
    {
      name: "Samsung Galaxy Tab S9 Ultra",
      price: 1199,
      screenSize: '14.6" Dynamic AMOLED 2X',
      color: "Graphite",
      image: "/assets/samsong.png",
    },
    {
      name: "Lenovo Tab P11 Plus",
      price: 299,
      screenSize: '11.0" 2K Display',
      color: "Storm Grey",
      image: "/assets/lenovo.png",
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
        <h2 className="text-3xl font-bold mb-6 text-center">Tablets</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((tablet) => {
            const isWished = wishlist.some((item) => item.name === tablet.name);

            return (
              <div
                key={tablet.name}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={tablet.image}
                  alt={tablet.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{tablet.name}</h3>
                    <button onClick={() => handleWishlistToggle(tablet)}>
                      {isWished ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600">Price: ${tablet.price}</p>
                  <p className="text-gray-600">Screen: {tablet.screenSize}</p>
                  <p className="text-gray-600">Color: {tablet.color}</p>
                  <button
                    onClick={() => handleAddToCart(tablet)}
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

export default Tablets;
