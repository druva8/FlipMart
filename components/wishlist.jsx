import React from "react";
import { useCart } from "../context/CartContext";
import Navbar from "./Navbar";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify"; // ✅ import toast

const Wishlist = () => {
  const { wishlist, toggleWishlist, setCart } = useCart();

  const handleAddToCart = (item) => {
    const newItem = { ...item, id: uuidv4(), quantity: 1 };
    setCart((prevCart) => [...prevCart, newItem]);
    toast.success(`🛒 ${item.name} added to cart!`);
  };

  const handleRemoveWishlist = (item) => {
    toggleWishlist(item);
    toast.info(`💔 Removed from wishlist: ${item.name}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-4 max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Wishlist</h2>
        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((item) => (
              <div
                key={item.uuid}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-[200px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveWishlist(item)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
