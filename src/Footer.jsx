import React from "react";

export default function Footer() {
  return (
    <footer className="py-6 px-5 bg-slate-950 text-gray-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto text-center text-sm">
        © 2025 Cheezy Hut by Black Pepper Studios • Detroit, MI •{" "}
        <a
          href="mailto:bookings@cheezyhut.com"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          bookings@cheezyhut.com
        </a>{" "}
        • Follow us:{" "}
        <a
          href="https://instagram.com/cheezyhut"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          Instagram
        </a>{" "}
        ·{" "}
        <a
          href="https://tiktok.com/@cheezyhut"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          TikTok
        </a>
      </div>
    </footer>
  );
}
