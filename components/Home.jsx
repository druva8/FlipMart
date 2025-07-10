import React, { useState } from "react";
import ProductCard from "./ProductCard.jsx";
import Navbar from "./Navbar.jsx";
import { useOutletContext } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CategorySection from "./CategorySection.jsx";
import "./Home.css";
import Footer from "./Footer.jsx";

const products = [
  {
    id: 1,
    name: "Smartphone Pro",
    price: 699,
    image: "/assets/SAMT.jpg",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    price: 129,
    image: "/assets/ear.jpg",
  },
  {
    id: 3,
    name: "4K Smart TV",
    price: 999,
    image: "/assets/tv.jpg",
  },
  {
    id: 4,
    name: "Gaming Laptop",
    price: 1499,
    image: "/assets/laptop.jpg",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 89,
    image: "/assets/speaker.jpg",
  },
  {
    id: 6,
    name: "Smart Watch",
    price: 199,
    image: "/assets/watch.jpg",
  },
  {
    id: 7,
    name: "Wireless Mouse",
    price: 49,
    image: "/assets/mouse1.jpg",
  },
  {
    id: 8,
    name: "LED Monitor",
    price: 299,
    image: "/assets/monitor.jpg",
  },
];

function Home() {
  const { addToCart, cart } = useOutletContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  return (
    <>
      <Navbar cart={cart} />
      <div className="container mx-auto py-8">
        {/* Category Section */}
        <CategorySection />

        {/* Swipable Flipkart-Style Banner */}
        <div className="mb-8 rounded overflow-hidden">
          <Carousel
            className="banner-carousel"
            autoPlay
            infiniteLoop
            interval={2000}
            showThumbs={false}
            showStatus={false}
            showArrows={true}
          >
            <div>
              <img src="/assets/banner1.jpg" alt="Banner 1" />
            </div>
            <div>
              <img src="/assets/banner2.jpg" alt="Banner 2" />
            </div>
            <div>
              <img src="/assets/banner4.jpg" alt="Banner 4" />
            </div>
          </Carousel>
        </div>

        {/* Product Carousel with Custom Arrows */}
        <div className="carousel-container">
          <h2 className="carousel-heading">Best Quality</h2>
          <div className="carousel-wrapper">
            <button onClick={prevProduct} className="carousel-button left">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="carousel-item">
                  <ProductCard
                    product={product}
                    addToCart={addToCart}
                    className="product-card"
                  />
                </div>
              ))}
            </div>
            <button onClick={nextProduct} className="carousel-button right">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <Footer /> {/* ✅ Add Footer component */}
    </>
  );
}

export default Home;
