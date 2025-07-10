import React from "react";
import Navbar from "./Navbar.jsx";
import { useOutletContext, useNavigate } from "react-router-dom";

function Cart() {
  // Use context to get cart and setCart
  const { cart, setCart } = useOutletContext();
  const navigate = useNavigate();
  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return (
    <>
      <Navbar cart={cart} />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
        {!Array.isArray(cart) || cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 py-1 rounded"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right">
              <p className="text-xl font-bold">
                Total: ${totalPrice.toFixed(2)}
              </p>
              <button className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Total Quantity:{" "}
                {Array.isArray(cart)
                  ? cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
                  : 0}
              </button>
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => navigate("/orderdetails")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
