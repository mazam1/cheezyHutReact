import React, { useState, useEffect } from "react";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Initialize YouTube Player API when component mounts
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <span 
                className="rounded-full px-3 py-2 text-sm font-medium"
                style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}
              >
                ✨ Studio-quality lighting
              </span>
              <span 
                className="rounded-full px-3 py-2 text-sm font-medium"
                style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}
              >
                ⚡ Instant prints & sharing
              </span>
              <span 
                className="rounded-full px-3 py-2 text-sm font-medium"
                style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}
              >
                📸 Detroit & beyond
              </span>
            </div>

            <h1 
              className="mb-3 font-bold leading-tight"
              style={{ 
                fontSize: 'clamp(2.4rem, 1rem + 4vw, 4rem)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                color: 'var(--foreground)'
              }}
            >
              Say Cheezy!
            </h1>

            <p 
              className="mb-4 leading-relaxed"
              style={{ 
                fontSize: 'clamp(1.05rem, 1rem + 0.6vw, 1.25rem)',
                color: 'var(--muted)'
              }}
            >
              Cheezy Hut brings big-time energy with pro lighting, custom overlays, and instant prints! Perfect for weddings, corporate events, schools, and parties.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#book"
                className="rounded-full px-4 py-2 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  boxShadow: 'var(--shadow)',
                  border: '1px solid transparent'
                }}
              >
                Book Cheezy Hut
              </a>
              <a
                href="#packages"
                className="rounded-full px-4 py-2 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--card)',
                  color: 'var(--card-foreground)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow)'
                }}
              >
                See packages
              </a>
            </div>
          </div>

          <div className="relative">
            <div 
              className="relative overflow-hidden"
              style={{
                aspectRatio: '16 / 9',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border)',
                background: 'linear-gradient(180deg, color-mix(in srgb, var(--primary) 10%, transparent), transparent)',
                boxShadow: 'var(--shadow)'
              }}
            >
              {/* Static Image - shown initially and as fallback */}
              <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
                alt="Cheezy Hut Photo Booth Setup" 
                className="w-full h-full object-cover transition-opacity duration-800"
                style={{ 
                  borderRadius: '12px',
                  opacity: videoLoaded ? 0.3 : 1
                }}
                loading="lazy"
              />

              {/* YouTube video - initially hidden */}
              <iframe
                src="https://www.youtube-nocookie.com/embed/YQ0lXxebH1c?si=flLzpplPdOiwzrVr&autoplay=1&enablejsapi=1&mute=1&playsinline=1&loop=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1&start=0&playlist=YQ0lXxebH1c"
                title="Cheezy Hut Video"
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-800"
                style={{ 
                  borderRadius: '12px',
                  opacity: videoLoaded ? 1 : 0,
                  pointerEvents: 'none'
                }}
                onLoad={() => setVideoLoaded(true)}
              />

              {/* Transparent overlay to block interactions */}
              <div 
                className="absolute top-0 left-0 w-full h-full bg-transparent z-10 transition-opacity duration-800"
                style={{ 
                  borderRadius: '12px',
                  opacity: 1,
                  pointerEvents: 'none'
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
