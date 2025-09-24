import React from "react";

export default function Gallery() {
  const images = [
    "https://www.cheezyhut.com/assets/images/gallery_1.png",
    "https://www.cheezyhut.com/assets/images/gallery_2.png", 
    "https://www.cheezyhut.com/assets/images/gallery_3.png",
    "https://www.cheezyhut.com/assets/images/gallery_4.png",
    "https://www.cheezyhut.com/assets/images/gallery_5.png",
    "https://www.cheezyhut.com/assets/images/gallery_6.png",
  ];

  return (
    <section id="gallery" className="py-12 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 mb-12">
          <h2 
            className="font-bold leading-tight"
            style={{
              fontSize: 'clamp(1.6rem, 1rem + 2.2vw, 2.4rem)',
              lineHeight: '1.2',
              color: 'var(--foreground)'
            }}
          >
            Gallery
          </h2>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: 'clamp(1.05rem, 1rem + 0.6vw, 1.25rem)',
              color: 'var(--muted)'
            }}
          >
            Highlights we love.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, i) => (
            <div key={i} className="gallery-item">
              <img
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                src={src}
                alt={`Gallery Image ${i + 1}`}
                loading="lazy"
                style={{
                  aspectRatio: '3 / 2',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  background: 'var(--card)'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
