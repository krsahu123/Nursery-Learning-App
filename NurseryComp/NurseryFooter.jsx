import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'; // Icons for social links
import './NurseryFooter.css'; // CSS for colorful, child-friendly design

function NurseryFooter() {
  return (
    <footer className="nursery-footer">
      <div className="footer-content">
        <div className="footer-section social-media">
          <h3>Follow Us!</h3>
          <div className="social-icons">
            <FaFacebookF className="social-icon" />
            <FaInstagram className="social-icon" />
            <FaTwitter className="social-icon" />
          </div>
        </div>
        <div className="footer-section contact-us">
          <h3>Contact Us</h3>
          <p>Email: contact@nursery.com</p>
          <p>Phone: +123 456 7890</p>
        </div>
        <div className="footer-section fun-quote">
          <h3>Daily Fun Quote</h3>
          <p>"Learning is fun when it's done with a smile!"</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Nursery World. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default NurseryFooter;
