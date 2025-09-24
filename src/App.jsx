import React from "react";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import Gallery from "./Gallery.jsx";
import Packages from "./Packages.jsx";
import BookingForm from "./Bookingform.jsx";
import Footer from "./Footer.jsx";
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen scroll-smooth" style={{
      backgroundColor: "var(--background)",
      color: "var(--foreground)",
    }}>

      <Header />
      <main>
        <Hero />
        <Gallery />
        <Packages />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
