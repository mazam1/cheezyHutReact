import React from "react";

export default function Hero() {
  return (
    <section id="top" className="min-h-screen flex items-center justify-center py-20 px-5 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium">
              ✨ <strong>Studio-quality lighting</strong>
            </div>
            <div className="bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium">
              ⚡ <strong>Instant prints & sharing</strong>
            </div>
            <div className="bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium">
              📸 <strong>Detroit & beyond</strong>
            </div>
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
            Say Cheezy!
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
            Cheezy Hut brings big-time energy with pro lighting, custom overlays,
            and instant prints! Perfect for weddings, corporate events, schools,
            and parties.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#book"
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all duration-200 text-center"
            >
              Book Cheezy Hut
            </a>
            <a
              href="#packages"
              className="bg-slate-700 text-white px-8 py-4 rounded-full font-semibold text-lg border border-slate-600 hover:bg-slate-600 transition-all duration-200 text-center"
            >
              See packages
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/YQ0lXxebH1c?si=flLzpplPdOiwzrVr"
              title="Cheezy Hut highlight"
              className="w-full h-full"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
