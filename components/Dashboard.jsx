import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";

function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Load FAQs when chatbot opens
  useEffect(() => {
    if (isOpen) {
      const faqs = [
        {
          sender: "bot",
          text:
            "Hi! I can help with:\n" +
            "1. Where is my order?\n" +
            "2. How do I return an item?\n" +
            "3. What is the delivery time?\n" +
            "4. How to cancel my order?\n" +
            "5. Can I track my shipment?\n" +
            "6. I received the wrong item.\n" +
            "7. How to contact support?\n" +
            "8. Can I change my address?",
        },
      ];
      setMessages(faqs);
    }
  }, [isOpen]);

  // Handle message send
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    const lower = input.toLowerCase();
    let botReply = "I'm sorry, I didn't understand. Could you rephrase?";

    if (lower.includes("where is my order")) {
      botReply = "Please provide your order ID to check the status.";
    } else if (lower.includes("return")) {
      botReply =
        "You can return items within 7 days from delivery. Need help starting a return?";
    } else if (lower.includes("cancel")) {
      botReply = "To cancel, go to your orders > select item > Cancel.";
    } else if (lower.includes("delivery time")) {
      botReply = "Delivery typically takes 3–5 business days.";
    } else if (lower.includes("track") || lower.includes("shipment")) {
      botReply = "Please provide your tracking number or order ID.";
    } else if (lower.includes("wrong item")) {
      botReply =
        "Sorry about that! You can request a replacement from your order page.";
    } else if (lower.includes("support") || lower.includes("contact")) {
      botReply =
        "You can reach customer support at support@flipmart.com or 1800-000-000.";
    } else if (lower.includes("change address")) {
      botReply =
        "You can change the address before shipment. Please provide your order ID.";
    }

    const botMessage = { sender: "bot", text: botReply };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
    }, 800);

    setInput("");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <p className="text-center text-gray-600 text-lg">
          Welcome to your Customer Help! Know your account details, get help
          with orders, and more. Let us know how we can assist you today.
        </p>

        {/* Chatbot Centered Button */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white rounded-full px-6 py-3 shadow-lg text-lg"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "Close Chat" : "Chat with Flipmart Assistant 🤖"}
          </button>
        </div>

        {/* Chatbot Modal */}
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="w-[500px] h-[600px] bg-white border shadow-lg rounded-lg flex flex-col relative">
              {/* Close Button (optional) */}
              <button
                className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
                onClick={() => setIsOpen(false)}
              >
                ×
              </button>

              <div className="bg-blue-600 text-white text-center p-3 text-xl font-semibold rounded-t-lg">
                Flipmart Assistant 🤖
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 text-lg rounded whitespace-pre-wrap ${
                      msg.sender === "user"
                        ? "bg-blue-100 text-right"
                        : "bg-gray-100 text-left"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 border rounded px-3 py-2 text-base"
                  placeholder="Ask something..."
                />
                <button
                  onClick={handleSend}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded text-base"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
