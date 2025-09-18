import React from "react";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-container">
        <div className="hero-left">
          <div className="hero-tags">
            <span>✨ <strong>Studio-quality lighting</strong></span>
            <span>⚡ <strong>Instant prints & sharing</strong></span>
            <span>📸 <strong>Detroit & beyond</strong></span>
          </div>

          <h1 className="hero-title">Say Cheezy!</h1>

          <p className="hero-text">
            Cheezy Hut brings big-time energy with pro lighting, custom overlays,
            and instant prints! Perfect for weddings, corporate events, schools,
            and parties.
          </p>

          <div className="hero-buttons">
            <a href="#book" className="btn-primary">Book Cheezy Hut</a>
            <a href="#packages" className="btn-secondary">See packages</a>
          </div>
        </div>

        <div className="hero-video">
          <iframe
            src="https://www.youtube.com/embed/YQ0lXxebH1c?si=flLzpplPdOiwzrVr"
            title="Cheezy Hut highlight"
            loading="lazy"
            allow="autoplay; encrypted-media; picture-in-picture"
          
          />
        </div>
      </div>
    </section>
  );
}
