import React, { useState } from "react";
import "./Flight.css"; // Import CSS for background image and styling

const FlightBooking = () => {
  const [formData, setFormData] = useState({
    departureCity: "",
    arrivalCity: "",
    departureDate: new Date().toISOString().split("T")[0], // Default to today: 2025-07-10
    returnDate: "",
    travelerClass: "Economy",
    passengers: 1,
    tripType: "one-way", // Default to One Way as per image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Flight Search Data:", formData);
    alert("Flight search submitted! Check console for data.");
  };

  const handleSwap = () => {
    setFormData((prev) => ({
      ...prev,
      departureCity: prev.arrivalCity,
      arrivalCity: prev.departureCity,
    }));
  };

  const cities = [
    "from where?",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Kerala",
    "Bali",
    "Malaysia",
    "Sydney",
  ];

  return (
    <div className="bg-container">
      <header className="header">
        <div className="logo">Flipkart Travel</div>
        <div className="nav-links">
          <button>Login</button>
          <button>More</button>
        </div>
      </header>
      <div className="flight-form">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Get. Set. Travel.
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={formData.tripType === "one-way"}
                onChange={handleChange}
                className="mr-2"
              />
              One Way
            </label>
            <label>
              <input
                type="radio"
                name="tripType"
                value="round-trip"
                checked={formData.tripType === "round-trip"}
                onChange={handleChange}
                className="mr-2"
              />
              Round Trip
            </label>
          </div>
          <div className="form-group">
            <select
              name="departureCity"
              value={formData.departureCity}
              onChange={handleChange}
              className="input-field"
              required
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <button type="button" onClick={handleSwap} className="swap-btn">
              ⇔
            </button>
            <select
              name="arrivalCity"
              value={formData.arrivalCity}
              onChange={handleChange}
              className="input-field"
              required
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="date-travelers">
            <div className="field">
              <span>Depart On</span>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            {formData.tripType === "round-trip" && (
              <div className="field">
                <span>Return On</span>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  min={
                    formData.departureDate ||
                    new Date().toISOString().split("T")[0]
                  }
                />
              </div>
            )}
            <div className="field">
              <span>Travellers | Class</span>
              <div className="mt-1">
                <strong>{formData.passengers} | </strong>
                <select
                  name="travelerClass"
                  value={formData.travelerClass}
                  onChange={handleChange}
                  className="inline-block p-2 border border-gray-300 rounded-md"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                  <option value="First Class">First Class</option>
                </select>
                <select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="hidden"
                  min="1"
                  max="9"
                  required
                >
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="search-btn">
              SEARCH
            </button>
          </div>
        </form>
      </div>
      <footer className="footer">
        <div>Flipkart Travel</div>
      </footer>
    </div>
  );
};

export default FlightBooking;
