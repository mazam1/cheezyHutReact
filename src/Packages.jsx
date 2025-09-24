import React from "react";

export default function Packages() {
  const plans = [
    {
      name: "Simple",
      price: "$449",
      duration: "/ 2 hrs",
      features: [
        "Simple Package - $449 / 2 hours",
        "Professional photo booth setup",
        "Digital gallery access",
        "Basic props included",
        "Professional attendant",
        "Setup and breakdown"
      ],
      description: "Perfect for intimate gatherings and smaller events.",
      isPopular: false
    },
    {
      name: "Starter",
      price: "$549",
      duration: "/ 3 hrs",
      features: [
        "Starter Package - $549 / 3 hours",
        "Everything in Simple package",
        "Extended 3-hour service",
        "Expanded prop collection",
        "Custom photo templates"
      ],
      description: "Ideal for birthday parties, small weddings, and corporate events.",
      isPopular: false
    },
    {
      name: "Party Favorite",
      price: "$799",
      duration: "/ 3 hrs",
      features: [
        "Party Favorite Package - $799 / 3 hours",
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
      isPopular: false
    },
    {
      name: "All-Out",
      price: "$1,149",
      duration: "/ 4 hrs",
      features: [
        "All-Out Package - $1,149 / 4 hours",
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
      isPopular: false
    },
  ];

  return (
    <section
      id="packages"
      className="py-20 px-5 flex justify-center font-sans"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div className="w-[1320px] mx-auto">
        {/* Heading Section */}
        <div className="mb-16 text-left">
          <h2 className="text-4xl font-bold mb-4">Packages</h2>
          <p className="text-xl text-gray-400 max-w-3xl">
            Straightforward pricing. Every package includes pro lighting, an attentive host, and instant sharing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <div
              key={i}
              className="relative bg-slate-900 border border-slate-700 rounded-xl p-6 flex flex-col hover:border-slate-600 transition-all duration-300 font-sans"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.duration}</span>
                </div>
              </div>

              <ul className="flex-grow space-y-3 mb-6">
                {plan.features.map((feature, j) => (
                  <li key={j} className="text-gray-300 text-sm leading-relaxed">
                    • {feature}
                  </li>
                ))}
                <li className="text-white font-medium text-sm italic mt-4">
                  {plan.description}
                </li>
              </ul>

              <a
                href="#book"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-full font-semibold text-center hover:bg-blue-700 transition-all duration-200"
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
