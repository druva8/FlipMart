import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "./Navbar";

const Watches = () => {
  const outletContext = useOutletContext();
  const cart = outletContext?.cart || [];
  const setCart = outletContext?.setCart || (() => {});
  const { wishlist, toggleWishlist } = useCart();

  const [products] = useState([
    {
      name: "Apple Watch Series 9",
      price: 399,
      displayType: "Always-On Retina LTPO OLED",
      color: "Midnight",
      image: "/assets/wa.jpg",
    },
    {
      name: "Samsung Galaxy Watch 6",
      price: 299,
      displayType: "Super AMOLED",
      color: "Graphite",
      image: "/assets/sam.jpg",
    },
    {
      name: "Garmin Venu 3",
      price: 449,
      displayType: "AMOLED",
      color: "Slate Gray",
      image: "/assets/we.jpg",
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
        <h2 className="text-3xl font-bold mb-6 text-center">Watches</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((watch) => {
            const isWished = wishlist.some((item) => item.name === watch.name);

            return (
              <div
                key={watch.name}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={watch.image}
                  alt={watch.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{watch.name}</h3>
                    <button onClick={() => handleWishlistToggle(watch)}>
                      {isWished ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-gray-600">Price: ${watch.price}</p>
                  <p className="text-gray-600">Display: {watch.displayType}</p>
                  <p className="text-gray-600">Color: {watch.color}</p>
                  <button
                    onClick={() => handleAddToCart(watch)}
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

export default Watches;
