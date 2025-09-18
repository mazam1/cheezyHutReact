import React, { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    if (theme === "light") setTheme("dull");
    else if (theme === "dull") setTheme("dark");
    else setTheme("light");
  };

  useEffect(() => {
    document.body.classList.remove("light","dull","dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="nav-left">
          <a href="#top" className="logo">Cheezy Hut</a>
          <nav>
            <ul className="nav-links">
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#packages">Packages</a></li>
              <li><a href="#book">Book</a></li>
            </ul>
          </nav>
        </div>

        <div className="nav-right">
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "light" ? "☀️ Light" : theme === "dull" ? "🌗 Dull" : "🌙 Dark"}
          </button>
          <a href="#book" className="book-btn">Book now</a>
        </div>
      </div>
    </header>
  );
}
