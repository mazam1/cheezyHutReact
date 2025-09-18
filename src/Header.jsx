import React, { useState, useEffect } from "react";

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
    <header className="sticky top-0 z-60 bg-black/75 backdrop-blur-md border-b border-white/3">
      <div className="max-w-[1227px] mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#top" className="text-white font-bold text-xl font-inter">
            Cheezy Hut
          </a>
          <nav>
            <ul className="flex gap-6">
              <li><a href="#gallery" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Gallery</a></li>
              <li><a href="#packages" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Packages</a></li>
              <li><a href="#book" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">Book</a></li>
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            className="bg-slate-700 text-slate-200 px-4 py-2 rounded-full font-semibold text-sm hover:bg-slate-600 transition-colors duration-200"
            onClick={toggleTheme}
          >
            {theme === "light" ? "☀️ Light" : theme === "dull" ? "🌗 Dull" : "🌙 Dark"}
          </button>
          <a
            href="#book"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-lg hover:bg-blue-700 transition-all duration-200"
          >
            Book now
          </a>
        </div>
      </div>
    </header>
  );
}
