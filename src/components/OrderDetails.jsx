import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AddressBlock from "./AddressBlock";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useOutletContext } from "react-router-dom";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ✅ Fix Leaflet grey area issue on render
const ResizeMapOnReady = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
};

const OrderDetails = () => {
  const { cart } = useOutletContext(); // ✅ cart from context

  const initialAddress = {
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    email: "",
  };

  const [address, setAddress] = useState(initialAddress);
  const [tempAddress, setTempAddress] = useState(initialAddress);
  const [editMode, setEditMode] = useState(true);
  const [coordinates, setCoordinates] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");

  const fetchCoordinatesFromAddress = async (addr) => {
    const query = `${addr.street}, ${addr.city}, ${addr.state}, ${addr.zip}, ${addr.country}`;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setCoordinates([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        alert("📍 Location not found. Please check the address.");
        setCoordinates(null);
      }
    } catch (error) {
      console.error("🌐 Geocoding error:", error);
      setCoordinates(null);
    }
  };

  const handleEditToggle = () => {
    setTempAddress(address);
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setTempAddress({ ...tempAddress, [e.target.name]: e.target.value });
  };

  const saveAddress = () => {
    setAddress(tempAddress);
    setEditMode(false);
    fetchCoordinatesFromAddress(tempAddress);
  };

  // ✅ Get totals from cart
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar cart={cart} />
      <div className="p-6 font-sans">
        <h1 className="text-3xl font-bold mb-2">Order #15</h1>
        <p className="mb-4">
          Order <strong>#15</strong> was placed on{" "}
          <strong>{currentDate}</strong> and is currently{" "}
          <strong className="text-yellow-600">Processing</strong>.
        </p>

        {/* Order Table */}
        <h2 className="text-2xl font-semibold mb-3">Order details</h2>
        <table className="w-full mb-6 border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-2">Shipping:</td>
              <td className="p-2" colSpan="3">
                Flat rate
              </td>
            </tr>
            <tr>
              <td className="p-2">Payment method:</td>
              <td className="p-2" colSpan="3">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="border p-1 rounded"
                >
                  <option>Cash on delivery</option>
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>Online Banking</option>
                  <option>PhonePe</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Total Quantity:</td>
              <td className="p-2 font-bold" colSpan="3">
                {totalQuantity}
              </td>
            </tr>
            <tr>
              <td className="p-2 font-bold">Total Price:</td>
              <td className="p-2 font-bold" colSpan="3">
                ${totalPrice.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Map */}
        {coordinates && (
          <div className="h-[300px] w-full mb-6">
            <MapContainer
              center={coordinates}
              zoom={14}
              style={{ height: "100%", width: "100%" }}
            >
              <ResizeMapOnReady />
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={coordinates}>
                <Popup>
                  📍 {address.street}, {address.city}, {address.zip}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        )}

        {/* Address Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <AddressBlock title="Billing Address" address={address} />
          <AddressBlock title="Shipping Address" address={address} />
        </div>

        {/* Address Edit */}
        {!editMode ? (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleEditToggle}
          >
            Edit Address
          </button>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <input
                name="name"
                value={tempAddress.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="border p-2 rounded"
              />
              <input
                name="street"
                value={tempAddress.street}
                onChange={handleInputChange}
                placeholder="Street Address"
                className="border p-2 rounded"
              />
              <input
                name="city"
                value={tempAddress.city}
                onChange={handleInputChange}
                placeholder="City"
                className="border p-2 rounded"
              />
              <input
                name="state"
                value={tempAddress.state}
                onChange={handleInputChange}
                placeholder="State"
                className="border p-2 rounded"
              />
              <input
                name="zip"
                value={tempAddress.zip}
                onChange={handleInputChange}
                placeholder="ZIP Code"
                className="border p-2 rounded"
              />
              <input
                name="country"
                value={tempAddress.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="border p-2 rounded"
              />
            </div>
            <button
              onClick={saveAddress}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Address & Update Map
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
