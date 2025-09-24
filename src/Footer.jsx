import React, { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer 
      className="py-8"
      style={{ 
        borderTop: '1px solid var(--border)',
        color: 'var(--muted)'
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-3">
          <div>
            © <span id="year">{currentYear}</span> Cheezy Hut by Black Pepper Studios • Detroit, MI •{" "}
            <a
              href="mailto:bookings@cheezyhut.com"
              className="text-decoration-none"
              style={{ color: 'var(--muted)' }}
            >
              bookings@cheezyhut.com
            </a>
          </div>
          <div style={{ color: 'var(--muted)' }}>
            Follow us:{" "}
            <a 
              href="#" 
              aria-label="Instagram" 
              className="text-decoration-none" 
              style={{ color: 'var(--muted)' }}
            >
              Instagram
            </a>{" "}
            ·{" "}
            <a 
              href="#" 
              aria-label="TikTok" 
              className="text-decoration-none" 
              style={{ color: 'var(--muted)' }}
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
