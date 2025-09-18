import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} Cheezy Hut (Clone)</div>
        <div className="footer-links">
          <a href="#gallery">Gallery</a>
          <a href="#packages">Packages</a>
          <a href="#book">Book</a>
        </div>
      </div>
    </footer>
  );
}
