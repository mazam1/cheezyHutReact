import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // hamburger + close icons

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === "light") setTheme("dull");
    else if (theme === "dull") setTheme("dark");
    else setTheme("light");
  };

  useEffect(() => {
    document.body.classList.remove("light", "dull", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <header className="sticky top-0 z-60 h-[59px] bg-black/75 backdrop-blur-md border-b border-white/10">
      <div className="max-w-[1320px] mx-auto px-6 md:px-8 h-full flex items-center justify-between">
        

        <div className="flex items-center gap-8">
          <a href="#top" className="text-white font-bold text-xl font-inter">
            Cheezy Hut
          </a>
          <nav className="hidden md:block">
            <ul className="flex gap-6">
              <li>
                <a
                  href="#gallery"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                >
                  Packages
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
                >
                  Book
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Side: Theme Button + Book Now + Hamburger */}
        <div className="flex items-center gap-4">
          <button
            className="h-[35px] px-4 flex items-center justify-center rounded-full 
               bg-slate-700 text-slate-200 font-semibold text-sm 
               hover:bg-slate-600 transition-colors duration-200"
            onClick={toggleTheme}
          >
            {theme === "light"
              ? "☀️ Light"
              : theme === "dull"
              ? "🌗 Dull"
              : "🌙 Dark"}
          </button>

          <a
            href="#book"
            className="hidden sm:flex h-[35px] px-6 items-center justify-center rounded-full 
               bg-blue-600 text-white font-semibold text-sm shadow-lg 
               hover:bg-blue-700 transition-all duration-200"
          >
            Book now
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-white/10">
          <ul className="flex flex-col gap-4 p-4">
            <li>
              <a
                href="#gallery"
                className="block text-gray-300 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#packages"
                className="block text-gray-300 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Packages
              </a>
            </li>
            <li>
              <a
                href="#book"
                className="block text-gray-300 hover:text-white transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Book
              </a>
            </li>
            <li>
              <a
                href="#book"
                className="block h-[35px] px-6 flex items-center justify-center rounded-full 
                  bg-blue-600 text-white font-semibold text-sm shadow-lg 
                  hover:bg-blue-700 transition-all duration-200"
                onClick={() => setMenuOpen(false)}
              >
                Book now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
