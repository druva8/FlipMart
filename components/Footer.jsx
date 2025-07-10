import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
            <li>
              <a href="#about-us">About Us</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#flipkart-stores">Flipmart Stores</a>
            </li>
            <li>
              <a href="#press">Press</a>
            </li>
            <li>
              <a href="#corporate-info">Corporate Information</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Group Companies</h4>
          <ul>
            <li>
              <a href="#myntra">Myntra</a>
            </li>
            <li>
              <a href="#cleartrip">Cleartrip</a>
            </li>
            <li>
              <a href="#shopsy">Shopsy</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Help</h4>
          <ul>
            <li>
              <a href="#payments">Payments</a>
            </li>
            <li>
              <a href="#shipping">Shipping</a>
            </li>
            <li>
              <a href="#cancellation-returns">Cancellation & Returns</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Consumer Policy</h4>
          <ul>
            <li>
              <a href="#cancellation-returns-policy">Cancellation & Returns</a>
            </li>
            <li>
              <a href="#terms-of-use">Terms Of Use</a>
            </li>
            <li>
              <a href="#security">Security</a>
            </li>
            <li>
              <a href="#privacy">Privacy</a>
            </li>
            <li>
              <a href="#sitemap">Sitemap</a>
            </li>
            <li>
              <a href="#grievance-redressal">Grievance Redressal</a>
            </li>
            <li>
              <a href="#epr-compliance">EPR Compliance</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Mail Us:</h4>
          <p>Flipmart Internet Private Limited,</p>
          <p>Buildings Alyssa, Begonia &</p>
          <p>Clover Embassy Tech Village,</p>
          <p>Outer Ring Road, Devarabeesanahalli Village,</p>
          <p>Bengaluru, 560103,</p>
          <p>Karnataka, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-info">
          <p>&copy; 2007-2025 Flipmart.com</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/flipkart">
              <FaFacebookF className="icon" />
            </a>
            <a href="https://x.com/flipkart">
              <FaTwitter className="icon" />
            </a>
            <a href="https://www.youtube.com/flipkart">
              <FaYoutube className="icon" />
            </a>
            <a href="https://www.instagram.com/flipkart/#">
              <FaInstagram className="icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
