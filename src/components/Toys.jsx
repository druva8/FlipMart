// src/components/Toys.jsx
import React from "react";

const topCategories = [
  {
    name: "Remote Control Toys",
    image: "/assets/remote.png",
    offer: "UP TO 80% OFF",
  },
  {
    name: "Soft Toys",
    image: "/assets/soft.png",
    offer: "UP TO 80% OFF",
  },
  {
    name: "Board games & Puzzles",
    image: "/assets/maind.png",
    offer: "UP TO 80% OFF",
  },
];

const Toys = () => {
  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-8">
        TOP CATEGORIES
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {topCategories.map((category, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden shadow-lg border hover:scale-105 transition-transform duration-300"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.offer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Learning & STEM Toys</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          VIEW ALL
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <img src="/assets/toptoy.jpg" alt="STEM 1" className="rounded shadow" />
        <img src="/assets/lertoy.jpg" alt="STEM 2" className="rounded shadow" />
        <img src="/assets/tt.jpg" alt="STEM 3" className="rounded shadow" />
        <img src="/assets/retoy.jpg" alt="STEM 4" className="rounded shadow" />
        <img src="/assets/toylap.jpg" alt="STEM 5" className="rounded shadow" />
      </div>
    </div>
  );
};

export default Toys;
