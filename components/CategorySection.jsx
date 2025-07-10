// src/components/CategorySection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategorySection.css"; // <-- Import CSS

const categories = [
  { name: "TVs", image: "/assets/tv.jpg", path: "/tvs" },
  { name: "Mobiles", image: "/assets/iphone.jpg", path: "/mobiles" },
  { name: "Tablets", image: "/assets/tablet.jpg", path: "/tablets" },
  { name: "Watches", image: "/assets/watch.jpg", path: "/watches" },
  {
    name: "Accessories",
    image: "/assets/access.jpg",
    path: "/accessories",
  },
  {
    name: "Appliances",
    image: "/assets/appliance.jpg",
    path: "/appliances",
  },
  { name: "Flights", image: "/assets/flight.jpg", path: "/flights" },
  { name: "Toys & More", image: "/assets/toy.jpg", path: "/toys" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <div className="category-container">
      {categories.map((cat) => (
        <div
          key={cat.name}
          onClick={() => navigate(cat.path)}
          className="category-card"
        >
          <img src={cat.image} alt={cat.name} />
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;
