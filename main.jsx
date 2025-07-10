import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext"; // ✅ Make sure path is correct

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
      {" "}
      {/* ✅ Must wrap App */}
      <App />
    </CartProvider>
  </StrictMode>
);
