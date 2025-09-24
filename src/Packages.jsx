import React from "react";

export default function Packages() {
  const plans = [
    {
      name: "Simple",
      price: "$449",
      duration: "/ 2 hrs",
      features: [
        "Professional photo booth setup",
        "Digital gallery access",
        "Basic props included",
        "Professional attendant",
        "Setup and breakdown"
      ],
      description: "Perfect for intimate gatherings and smaller events.",
    },
    {
      name: "Starter",
      price: "$549",
      duration: "/ 3 hrs",
      features: [
        "Everything in Simple package",
        "Extended 3-hour service",
        "Expanded prop collection",
        "Custom photo templates"
      ],
      description: "Ideal for birthday parties, small weddings, and corporate events.",
    },
    {
      name: "Party Favorite",
      price: "$799",
      duration: "/ 3 hrs",
      features: [
        "Everything in Starter package",
        "Multiple backdrop choices",
        "Extensive prop collection",
        "Custom branding options",
        "Live slideshow display",
        "Instant social sharing",
        "Instant Prints",
        "Professional attendant"
      ],
      description: "Most popular choice! Perfect for weddings, graduations, and special celebrations.",
    },
    {
      name: "All-Out",
      price: "$1,149",
      duration: "/ 4 hrs",
      features: [
        "Everything in Party Favorite package",
        "Extended 4-hour premium service",
        "Premium backdrop collection",
        "Custom photo templates & branding",
        "Live photo slideshow",
        "Professional attendant throughout",
        "Same-day photo delivery",
        "Custom props and signage"
      ],
      description: "The ultimate photo booth experience! Perfect for large weddings, corporate events, and milestone celebrations.",
    },
  ];

  return (
    <section id="packages" className="py-12 lg:py-20">
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
            Packages
          </h2>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: 'clamp(1.05rem, 1rem + 0.6vw, 1.25rem)',
              color: 'var(--muted)'
            }}
          >
            Straightforward pricing. Every package includes pro lighting, an attentive host, and instant sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div 
              key={i}
              className="flex flex-col h-full"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: 'var(--card)',
                boxShadow: 'var(--shadow)',
                padding: 'var(--spacing-6)'
              }}
            >
              <div className="mb-6">
                <h3 
                  className="font-bold mb-2"
                  style={{
                    fontSize: '1.25rem',
                    color: 'var(--card-foreground)'
                  }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span 
                    className="font-bold"
                    style={{
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: 'var(--card-foreground)'
                    }}
                  >
                    {plan.price}
                  </span>
                  <span 
                    className="font-normal"
                    style={{ color: 'var(--muted)' }}
                  >
                    {plan.duration}
                  </span>
                </div>
              </div>

              <div className="flex-grow mb-6">
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, j) => (
                    <li 
                      key={j} 
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--card-foreground)' }}
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
                <p 
                  className="text-sm font-medium"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  {plan.description.includes('!') ? (
                    <>
                      <strong>{plan.description.split('!')[0]}!</strong>
                      {plan.description.split('!')[1]}
                    </>
                  ) : (
                    plan.description
                  )}
                </p>
              </div>

              <a
                href="#book"
                className="w-full text-center font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  padding: '0.75rem 1rem',
                  borderRadius: '9999px',
                  boxShadow: 'var(--shadow)',
                  border: '1px solid transparent',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                Go To Booking
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
