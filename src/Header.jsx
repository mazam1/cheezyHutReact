import React, { useState, useEffect } from "react";

export default function Header() {
  const [theme, setTheme] = useState("auto");

  // Cookie utility functions
  const setCookie = (name, value, days = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const getSystemTheme = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (themeValue) => {
    let actualTheme;
    
    if (themeValue === 'auto') {
      actualTheme = getSystemTheme();
    } else {
      actualTheme = themeValue;
    }
    
    document.documentElement.setAttribute('data-theme', actualTheme);
    return actualTheme;
  };

  const toggleTheme = () => {
    let newTheme;
    
    if (theme === 'light') {
      newTheme = 'dark';
    } else if (theme === 'dark') {
      newTheme = 'auto';
    } else {
      newTheme = 'light';
    }
    
    applyTheme(newTheme);
    setCookie('theme', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    // Initialize theme from cookie or default to 'auto'
    const savedTheme = getCookie('theme') || 'auto';
    applyTheme(savedTheme);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    // Listen for system theme changes when in auto mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'auto') {
        applyTheme('auto');
      }
    };

    if (theme === 'auto') {
      mediaQuery.addListener(handleSystemThemeChange);
    }
    
    return () => {
      mediaQuery.removeListener(handleSystemThemeChange);
    };
  }, [theme]);

  const getThemeLabel = () => {
    if (theme === 'dark') {
      return '☀️ Theme';
    } else if (theme === 'auto') {
      return '🌓 Theme';
    } else {
      return '🌙 Theme';
    }
  };

  return (
    <header className="sticky top-0 z-50" style={{ 
      backdropFilter: 'saturate(1.2) blur(8px)',
      background: 'color-mix(in srgb, var(--background) 86%, transparent)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center py-3">
          <div className="flex items-center gap-8">
            <a 
              href="#top" 
              className="font-bold text-xl flex items-center gap-2" 
              style={{ color: 'var(--foreground)' }}
              aria-label="Cheezy Hut Home"
            >
              <span>Cheezy Hut</span>
            </a>
            <div className="hidden lg:block">
              <ul className="flex flex-row gap-6">
                <li>
                  <a 
                    href="#gallery" 
                    className="hover:underline"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a 
                    href="#packages" 
                    className="hover:underline"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Packages
                  </a>
                </li>
                <li>
                  <a 
                    href="#book" 
                    className="hover:underline"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Book
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="rounded-full px-3 py-2 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--card)',
                color: 'var(--card-foreground)'
              }}
              title="Toggle light/dark"
            >
              {getThemeLabel()}
            </button>
            <a
              href="#book"
              className="rounded-full px-3 py-2 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
                border: '1px solid var(--border)'
              }}
            >
              Book now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
