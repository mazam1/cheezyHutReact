import React from "react";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import Gallery from "./Gallery.jsx";
import Package from "./Packages.jsx";  
import Bookingform from "./Bookingform.jsx";
import Footer from "./Footer.jsx";
import theme from  "./theme.jsx";
import './index.css';

export default function App() {
  return (
    <div className="bg-[#0b1220] text-white min-h-screen">

      <Header />
      <Hero />
      <Gallery />
      <Package />
      <Bookingform />
      <Footer />
    </div>
  );
}
