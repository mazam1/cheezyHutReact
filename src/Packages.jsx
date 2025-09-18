import React from "react";
import "./Packages.css";

export default function Packages() {
  const plans = [
    {
      name: "Simple",
      price: "$449 / 2 hrs",
      features: [
        "Professional photo booth setup",
        "Digital gallery access",
        "Basic props included",
        "Professional attendant",
        "Setup and breakdown",
        "Perfect for intimate gatherings and smaller events."
      ],
    },
    {
      name: "Starter",
      price: "$549 / 3 hrs",
      features: [
        "Everything in Simple package",
        "Extended 3-hour service",
        "Expanded prop collection",
        "Custom photo templates",
        "Ideal for birthday parties, small weddings, and corporate events."
      ],
    },
    {
      name: "Party Favorite",
      price: "$799 / 3 hrs",
      features: [
        "Everything in Starter package",
        "Multiple backdrop choices",
        "Extensive prop collection",
        "Custom branding options",
        "Live slideshow display",
        "Instant social sharing",
        "Instant Prints",
        "Professional attendant",
        "Most popular choice! Perfect for weddings, graduations, and special celebrations."
      ],
    },
    {
      name: "All-Out",
      price: "$1,149 / 4 hrs",
      features: [
        "Everything in Party Favorite package",
        "Extended 4-hour premium service",
        "Premium backdrop collection",
        "Custom photo templates & branding",
        "Live photo slideshow",
        "Professional attendant throughout",
        "Same-day photo delivery",
        "Custom props and signage",
        "The ultimate photo booth experience! Perfect for large weddings, corporate events, and milestone celebrations."
      ]
    },
  ];

  return (
    <section id="packages" className="packages">
      <div className="packages-header">
        <h1 className="packages-main">Packages</h1>
        <h2 className="packages-title">
          Straightforward pricing. Every package includes pro lighting, an
          attentive host, and instant sharing.
        </h2>
      </div>

      <div className="packages-grid">
        {plans.map((plan, i) => (
          <div key={i} className="package-card">
            <h3 className="package-name">{plan.name}</h3>
            <p className="package-price">{plan.price}</p>
            <ul className="package-features">
              {plan.features.map((f, j) => (
                <li key={j}
                  className={f.includes("Perfect") || f.includes("choice!") || f.includes("experience!") ? "highlight" : ""}>
                  {f}
                </li>
              ))}
            </ul>
            <a href="#book" className="package-button">
              Go To Booking
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
