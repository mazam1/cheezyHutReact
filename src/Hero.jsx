import React from "react";

export default function Hero() {
  return (
    <section id="top" className="text-white py-6">
      <div className="max-w-[1320px] mx-auto px-5 grid lg:grid-cols-2 gap-6 items-center">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-4">
            {/* Badge 1 */}
            <div className="bg-[#6c757d] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
              ✨ <span className="ml-1">Studio-quality lighting</span>
            </div>

            {/* Badge 2 */}
            <div className="bg-[#6c757d] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
              ⚡ <span className="ml-1">Instant prints &amp; sharing</span>
            </div>

            {/* Badge 3 */}
            <div className="bg-[#6c757d] text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center">
              📸 <span className="ml-1">Detroit &amp; beyond</span>
            </div>
          </div>

          <h1 className="text-6xl leading-tight">Say Cheezy!</h1>

          {/* Fixed size paragraph */}
          <p className="text-xl text-gray-300 leading-relaxed w-[624px] h-[96px] overflow-hidden">
            Cheezy Hut brings big-time energy with pro lighting, custom overlays,
            and instant prints! Perfect for weddings, corporate events, schools,
            and parties.
          </p>

          {/* Compact Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#book"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200 text-center"
            >
              Book Cheezy Hut
            </a>
            <a
              href="#packages"
              className="bg-slate-700 text-white px-6 py-3 rounded-full font-semibold border border-slate-600 hover:bg-slate-600 transition-all duration-200 text-center"
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
