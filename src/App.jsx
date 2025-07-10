import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/signup";
import Mobiles from "./components/Mobiles";
import TVs from "./components/TVs";
import Tablets from "./components/Tablets";
import Laptops from "./components/Laptops";
import Watches from "./components/Watches";
import Accessories from "./components/Accessories";
import Flight from "./components/Flight";
import Toys from "./components/Toys";
import OrderDetails from "./components/OrderDetails";
import Wishlist from "./components/wishlist";

import { ToastContainer } from "react-toastify"; // ✅ import toast container
import "react-toastify/dist/ReactToastify.css"; // ✅ import CSS

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="home" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="mobiles" element={<Mobiles />} />
            <Route path="tvs" element={<TVs />} />
            <Route path="tablets" element={<Tablets />} />
            <Route path="laptops" element={<Laptops />} />
            <Route path="watches" element={<Watches />} />
            <Route path="accessories" element={<Accessories />} />
            <Route path="toys" element={<Toys />} />
            <Route path="flights" element={<Flight />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="orderdetails" element={<OrderDetails />} />
          </Route>
        </Routes>
        {/* ✅ ToastContainer always loaded for toasts */}
        <ToastContainer position="top-center" autoClose={2000} />
      </>
    </Router>
  );
}

export default App;
