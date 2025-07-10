import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-700 to-white flex items-center justify-center p-6">
      <div className="text-center">
        <div className="mb-4">
          <span className="text-purple-200 text-2xl">👑</span>
          <span className="text-gray-500 ml-2">COMPANY</span>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-pink-600">
          ONLINE SHOPPING
        </h1>
        <p className="text-lg mb-6 text-gray-700">
          An e-commerce online shopping cart is a digital tool on an online
          store that allows you to select, review, and manage items before
          making a purchase. It serves as a virtual basket, holding selected
          products as you browse and providing a seamless way to checkout and
          accept payments when youre ready.
        </p>
        <Link
          to="/login"
          className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-6 rounded-full text-lg font-semibold"
        >
          KNOW MORE
        </Link>
        {/* Placeholder for isometric graphics - use CSS or an image asset */}
        <div className="mt-8 flex justify-center space-x-4 opacity-70">
          <div className="w-20 h-20 bg-purple-300 rounded-lg"></div>
          <div className="w-24 h-24 bg-yellow-300 rounded-lg"></div>
          <div className="w-16 h-16 bg-purple-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
