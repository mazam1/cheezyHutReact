import React from "react";

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
    <section id="gallery" className="py-20 px-5 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Gallery</h2>
          <p className="text-xl text-gray-400">Highlights we love.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="aspect-square overflow-hidden">
                <img
                  src={src}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

