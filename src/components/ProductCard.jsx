import React from "react";
import { useCart } from "../context/CartContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const ProductCard = ({ product, addToCart }) => {
  const { wishlist, toggleWishlist } = useCart();

  const isWished = wishlist.some((item) => item.name === product.name);

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    toast[isWished ? "info" : "success"](
      isWished
        ? `💔 Removed from wishlist: ${product.name}`
        : `💖 ${product.name} added to wishlist!`
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`🛒 ${product.name} added to cart!`);
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="flex justify-between items-center mt-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <button onClick={handleWishlistToggle}>
          {isWished ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-500" />
          )}
        </button>
      </div>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
