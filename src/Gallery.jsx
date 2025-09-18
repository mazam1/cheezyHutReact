import React from "react";
import "./Gallery.css";

export default function Gallery() {
  const images = [

    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=800&h=500&q=80",
    "https://images.unsplash.com/photo-1438557068880-c5f474830377?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511389026070-a14ae610a1be?q=80&w=800&auto=format&fit=crop",
  ];



  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <h2 className="gallery-title">Gallery</h2>
        <p className="gallery-subtitle">Highlights we love.</p>

        <div className="gallery-grid">
          {images.map((src, i) => (
            <div key={i} className="gallery-card">
              <img src={src} alt={`Gallery ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

