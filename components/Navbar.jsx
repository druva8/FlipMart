import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaShoppingCart,
  FaHome,
  FaSignOutAlt,
  FaSearch,
  FaHeart,
} from "react-icons/fa";

function Navbar({ cart = [] }) {
  const navigate = useNavigate();

  // 🔎 State for search input
  const [searchQuery, setSearchQuery] = useState("");

  // 🛒 Cart total quantity
  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Category dropdown change handler
  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value && value !== "Categories") {
      navigate(`/${value.toLowerCase()}`);
    }
  };

  // Search button click handler
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/${searchQuery.trim().toLowerCase()}`);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo + Search */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Flipmart</h1>

          {/* 🔍 Search Bar with Dropdown */}
          <div className="flex bg-white rounded overflow-hidden">
            <select
              onChange={handleCategoryChange}
              className="bg-gray-100 text-gray-700 px-2 py-1 border-r border-gray-300 text-sm focus:outline-none"
            >
              <option>Categories</option>
              <option>Mobiles</option>
              <option>TVs</option>
              <option>Tablets</option>
              <option>Laptops</option>
              <option>Accessories</option>
              <option>Watches</option>
            </select>
            <input
              type="text"
              placeholder="Search here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 text-sm focus:outline-none text-gray-700"
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-400 px-3 py-1 text-black font-bold text-sm"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Links + Cart + Account + Logout */}
        <div className="flex items-center space-x-4 mt-3 sm:mt-0">
          <Link to="/home" className="hover:text-gray-200 flex items-center">
            <FaHome className="mr-1" size={20} />
            Home
          </Link>

          <Link
            to="/cart"
            className="relative hover:text-gray-200 flex items-center"
          >
            <FaShoppingCart className="mr-1" size={18} />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/wishlist"
            className="hover:text-gray-200 flex items-center"
          >
            <FaHeart className="mr-1 text-red-400" size={18} />
            Wishlist
          </Link>

          <Link
            to="/Orderdetails"
            className="hover:text-gray-200 flex items-center"
          >
            {/* You can use any icon or text for order details */}
            <span className="mr-1" role="img" aria-label="Order">
              📦
            </span>
            Order Details
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-gray-200 flex items-center"
          >
            <FaUser className="mr-1" size={18} />
            Help
          </Link>

          <button
            onClick={() => navigate("/login")}
            className="flex items-center bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm"
          >
            <FaSignOutAlt className="mr-2" size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
