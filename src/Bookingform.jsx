import React, { useState, useEffect } from "react";

// helper function to generate 15-min interval slots
function generateTimeSlots(start = "08:00", end = "22:00") {
  const slots = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  while (h < endH || (h === endH && m <= endM)) {
    const formattedH = String(h).padStart(2, '0');
    const formattedM = String(m).padStart(2, '0');
    slots.push(`${formattedH}:${formattedM}`);

    m += 15;
    if (m >= 60) {
      h++;
      m = 0;
    }
  }
  return slots;
}

// Utility functions
function parseTimeToHM(timeString) {
  const [H, M] = (timeString || '').split(':').map(Number);
  return isNaN(H) ? null : { H, M: M || 0 };
}

function formatTime12(H, M) {
  const h12 = ((H + 11) % 12) + 1;
  const ampm = H >= 12 ? 'PM' : 'AM';
  return h12 + ':' + String(M).padStart(2, '0') + ' ' + ampm;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0);
}

const CONFIG = {
  DEPOSIT_PERCENT: 50,
  FULL_BONUS_MINUTES: 30,
  BALANCE_DAYS_BEFORE: 14
};

export default function BookingForm() {
  const [step, setStep] = useState(0); // 0-indexed for array access
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "",
    duration: "3", // Default to 3 hours
    venue: "",
    city: "",
    address: "",
    notes: "",
    package: "Simple",
    addons: [],
    coupon_code: "",
    payplan: "deposit", // 'deposit' or 'full'
    terms_accepted: false,
  });
  
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [availabilityMessageType, setAvailabilityMessageType] = useState("info");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const stepsContent = [
    { label: "Contact", validator: validateStep1 },
    { label: "Date & Time", validator: validateStep2 },
    { label: "Venue Details", validator: validateStep3 },
    { label: "Package & Payment", validator: validateStep4 },
  ];

  // Validation Functions
  function validateStep1() {
    const isValid = form.name.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
      form.phone.replace(/\D/g, '').length >= 7 &&
      form.company.trim().length > 1;
    return isValid;
  }

  function validateStep2() {
    const isValidBasic = !!form.date && !!form.time && parseInt(form.duration, 10) > 0;
    const isValidAdvance = validateAdvanceBooking();
    return isValidBasic && isValidAdvance;
  }

  function validateStep3() {
    const isValid = !!form.venue.trim() && !!form.city.trim() && !!form.address.trim();
    return isValid;
  }

  function validateStep4() {
    const isValidPackage = !!form.package;
    const isValidTerms = form.terms_accepted;
    return isValidPackage && isValidTerms;
  }

  function validateAdvanceBooking() {
    if (!form.date || !form.time) return true;

    const eventDateTime = new Date(form.date + 'T' + form.time + ':00');
    const now = new Date();
    const sixHoursFromNow = new Date(now.getTime() + (6 * 60 * 60 * 1000));

    return eventDateTime >= sixHoursFromNow;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "addons") {
      setForm((prev) => ({
        ...prev,
        addons: checked
          ? [...prev.addons, value]
          : prev.addons.filter((addon) => addon !== value),
      }));
    } else if (name === "payplan") {
      setForm({ ...form, [name]: value });
    } else if (name === "terms_accepted") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleNext = () => {
    if (stepsContent[step].validator()) {
      setStep((prev) => Math.min(prev + 1, stepsContent.length - 1));
      setAvailabilityMessage("");
    } else {
      // Display error message for current step
      if (step === 0) setAvailabilityMessage("Please fill name, a valid email, phone, and company/school to continue.");
      if (step === 1) setAvailabilityMessage("Please add an event date, start time, and duration.");
      if (step === 2) setAvailabilityMessage("Please add venue, city, and address.");
      if (step === 3) setAvailabilityMessage("Please choose a package and accept the terms of service.");
      setAvailabilityMessageType("danger");
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 0));
    setAvailabilityMessage("");
  };

  const handleStepClick = (index) => {
    // Allow navigation only to completed or current step
    let canNavigate = true;
    for (let i = 0; i < index; i++) {
      if (!stepsContent[i].validator()) {
        canNavigate = false;
        setAvailabilityMessage(`Please complete step ${i + 1} first.`);
        setAvailabilityMessageType("danger");
        break;
      }
    }
    if (canNavigate) {
      setStep(index);
      setAvailabilityMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep4()) {
      setAvailabilityMessage("Please choose a package and accept the terms of service.");
      setAvailabilityMessageType("danger");
      return;
    }

    // Simulate submission
    alert("Booking Submitted! (This is a demo, no actual booking made)");
    console.log("Form Data:", form);
  };

  // Calculate end time
  const getEndTime = () => {
    if (!form.time || !form.duration) return "—";
    
    const timeObj = parseTimeToHM(form.time);
    if (!timeObj) return "—";
    
    const duration = parseInt(form.duration, 10);
    if (!duration) return "—";

    let H = timeObj.H;
    let M = timeObj.M;
    H += Math.floor(duration);
    M += Math.round((duration % 1) * 60);
    H += Math.floor(M / 60);
    M = M % 60;
    H = ((H % 24) + 24) % 24;

    return formatTime12(H, M);
  };

  const today = new Date();
  const minDate = today.toISOString().split('T')[0];

  // Package pricing (simplified for demo)
  const packagePricing = {
    "Simple": { price: 449, hours: 2 },
    "Starter": { price: 549, hours: 3 },
    "Party Favorite": { price: 799, hours: 3 },
    "All-Out": { price: 1149, hours: 4 }
  };

  const selectedPackagePrice = packagePricing[form.package]?.price || 0;
  const paymentNowAmount = form.payplan === 'full' ? selectedPackagePrice : Math.round(selectedPackagePrice * (CONFIG.DEPOSIT_PERCENT / 100));
  const balanceDueAmount = selectedPackagePrice - paymentNowAmount;

  return (
    <section id="book" className="py-12 lg:py-20">
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
            Book Cheezy Hut
          </h2>
          <p 
            className="leading-relaxed"
            style={{ 
              fontSize: 'clamp(1.05rem, 1rem + 0.6vw, 1.25rem)',
              color: 'var(--muted)'
            }}
          >
            This quick 4-step request helps us lock your date, collect a deposit, and tailor your package.
          </p>
        </div>

        <div 
          className="p-8"
          style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            background: 'var(--card)',
            boxShadow: 'var(--shadow)'
          }}
        >
          {/* Step Navigation */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stepsContent.map((stepItem, index) => (
              <button
                key={index}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200`}
                onClick={() => handleStepClick(index)}
                style={{
                  border: '1px solid var(--border)',
                  background: step === index ? 'color-mix(in srgb, var(--primary) 12%, var(--card))' : 'var(--card)',
                  color: 'var(--card-foreground)',
                  borderColor: step === index ? 'color-mix(in srgb, var(--primary) 50%, var(--border))' : 'var(--border)',
                  boxShadow: step === index ? '0 0 0 2px color-mix(in srgb, var(--primary) 20%, transparent)' : 'none'
                }}
              >
                <span 
                  className="flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold"
                  style={{ 
                    background: 'color-mix(in srgb, var(--primary) 26%, transparent)',
                    color: 'var(--primary)'
                  }}
                >
                  {index + 1}
                </span>
                <span className="hidden sm:inline">{stepItem.label}</span>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Content */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} noValidate>
                {/* Step 1: Contact */}
                {step === 0 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label 
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--card-foreground)' }}
                          htmlFor="name"
                        >
                          Your name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Jordan Smith"
                          value={form.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                          style={{
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                          }}
                        />
                      </div>
                      <div>
                        <label 
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--card-foreground)' }}
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                          style={{
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                          }}
                        />
                      </div>
                      <div>
                        <label 
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--card-foreground)' }}
                          htmlFor="phone"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          placeholder="(313) 555-0139"
                          value={form.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                          style={{
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                          }}
                        />
                      </div>
                      <div>
                        <label 
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--card-foreground)' }}
                          htmlFor="company"
                        >
                          Company / School
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          required
                          placeholder="Your organization"
                          value={form.company}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                          style={{
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label 
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--card-foreground)' }}
                          htmlFor="date"
                        >
                          Event date
                        </label>
                        <input
                          id="date"
                          name="date"
                          type="date"
                          required
                          min={minDate}
                          value={form.date}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                          style={{
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                          }}
                        />
                      </div>
                      <div>
                        <label 
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--card-foreground)' }}
                          htmlFor="time"
                        >
                          Event Start Time
                        </label>
                        <select
                          id="time"
                          name="time"
                          required
                          value={form.time}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                          style={{
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                          }}
                        >
                          <option value="" disabled>Select a time</option>
                          {generateTimeSlots().map((slot) => (
                            <option key={slot} value={slot}>
                              {formatTime12(parseInt(slot.split(':')[0]), parseInt(slot.split(':')[1]))}
                            </option>
                          ))}
                        </select>
                        <p 
                          className="text-sm mt-1"
                          style={{ color: 'var(--muted)' }}
                        >
                          Start between 8:00 AM and 10:00 PM.
                        </p>
                      </div>
                    </div>
                    {!validateAdvanceBooking() && (
                      <div 
                        className="p-3 rounded-lg"
                        style={{ 
                          background: 'color-mix(in srgb, var(--warning) 10%, transparent)',
                          border: '1px solid color-mix(in srgb, var(--warning) 30%, transparent)',
                          color: 'var(--warning)'
                        }}
                      >
                        Bookings must be made at least 6 hours in advance.
                      </div>
                    )}
                  </div>
                )}

                {/* Step 3: Venue Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label 
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--card-foreground)' }}
                          htmlFor="venue"
                        >
                          Where is your event being hosted?
                        </label>
                        <input
                          id="venue"
                          name="venue"
                          type="text"
                          required
                          placeholder="Venue name"
                          value={form.venue}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                          style={{
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                          }}
                        />
                      </div>
                      <div>
                        <label 
                          className="block text-sm font-medium mb-2"
                          style={{ color: 'var(--card-foreground)' }}
                          htmlFor="city"
                        >
                          What city is your event in?
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          required
                          placeholder="Detroit, MI"
                          value={form.city}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                          style={{
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--card-foreground)' }}
                        htmlFor="address"
                      >
                        Event address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        required
                        placeholder="1234 Main St, Suite 200"
                        value={form.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                        style={{
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                          color: 'var(--card-foreground)',
                        }}
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--card-foreground)' }}
                        htmlFor="notes"
                      >
                        Anything else?
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={4}
                        placeholder="Theme, guest count, special requests…"
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                        style={{
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                          color: 'var(--card-foreground)',
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Package & Payment */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--card-foreground)' }}
                        htmlFor="package"
                      >
                        Package
                      </label>
                      <select
                        id="package"
                        name="package"
                        required
                        value={form.package}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                        style={{
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                          color: 'var(--card-foreground)',
                        }}
                      >
                        <option value="Simple">Simple — $449.00 / 2 hrs</option>
                        <option value="Starter">Starter — $549.00 / 3 hrs</option>
                        <option value="Party Favorite">Party Favorite — $799.00 / 3 hrs</option>
                        <option value="All-Out">All-Out — $1,149.00 / 4 hrs</option>
                      </select>
                    </div>

                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--card-foreground)' }}
                        htmlFor="duration"
                      >
                        How long are we partying for?
                      </label>
                      <select
                        id="duration"
                        name="duration"
                        required
                        value={form.duration}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
                        style={{
                          border: '1px solid var(--border)',
                          background: 'var(--card)',
                          color: 'var(--card-foreground)',
                        }}
                      >
                        {[...Array(12).keys()].map(i => (
                          <option key={i + 1} value={String(i + 1)}>
                            {i + 1} hour{i + 1 > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                      <p 
                        className="text-sm mt-1"
                        style={{ color: 'var(--muted)' }}
                      >
                        Max based on your start time: up to 12 hours (we leave by midnight).
                      </p>
                    </div>

                    {/* Add-ons */}
                    <div 
                      className="rounded-lg overflow-hidden"
                      style={{
                        border: '1px solid var(--border)',
                        background: 'var(--card)'
                      }}
                    >
                      <div 
                        className="px-4 py-3 font-semibold"
                        style={{ 
                          borderBottom: '1px solid var(--border)',
                          color: 'var(--card-foreground)'
                        }}
                      >
                        Add-ons
                      </div>
                      <div className="p-0">
                        {[
                          ["Glam Filter", "$100.00"],
                          ["Photo Slideshow", "$400.00"],
                          ["Premium Backdrop", "$200.00"],
                          ["Prints", "$150.00"],
                          ["Sharing Kiosk", "$120.00"],
                        ].map(([label, price], index) => (
                          <div 
                            key={label}
                            className="flex items-center justify-between px-4 py-3"
                            style={{ 
                              borderTop: index > 0 ? '1px dashed var(--border)' : 'none'
                            }}
                          >
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="addons"
                                value={label}
                                checked={form.addons.includes(label)}
                                onChange={handleChange}
                                className="mr-3 accent-current"
                                style={{ color: 'var(--primary)' }}
                              />
                              <span style={{ color: 'var(--card-foreground)' }}>{label}</span>
                            </label>
                            <span 
                              className="font-semibold"
                              style={{ color: 'var(--card-foreground)' }}
                            >
                              {price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Coupon Code */}
                    <div>
                      <label 
                        className="block text-sm font-medium mb-2"
                        style={{ color: 'var(--card-foreground)' }}
                        htmlFor="coupon_code"
                      >
                        Coupon Code (Optional)
                      </label>
                      <div className="flex gap-2">
                        <input
                          id="coupon_code"
                          name="coupon_code"
                          type="text"
                          placeholder="Enter coupon code"
                          value={form.coupon_code}
                          onChange={handleChange}
                          className="flex-1 px-3 py-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 uppercase"
                          style={{
                            border: '1px solid var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                          }}
                        />
                        <button
                          type="button"
                          className="px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                          style={{
                            background: 'var(--primary)',
                            color: 'var(--primary-foreground)',
                            border: '1px solid transparent'
                          }}
                        >
                          Apply
                        </button>
                      </div>
                      <p 
                        className="text-sm mt-1"
                        style={{ color: 'var(--muted)' }}
                      >
                        Enter a coupon code to get a discount
                      </p>
                    </div>

                    {/* Payment Options */}
                    <div 
                      className="p-4 rounded-lg"
                      style={{
                        border: '1px solid var(--border)',
                        background: 'var(--card)'
                      }}
                    >
                      <h4 
                        className="font-semibold mb-3"
                        style={{ color: 'var(--card-foreground)' }}
                      >
                        Payment
                      </h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="payplan"
                            value="deposit"
                            checked={form.payplan === 'deposit'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <span style={{ color: 'var(--card-foreground)' }}>
                            50% deposit now + 50% due 14 days before event (industry standard)
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="payplan"
                            value="full"
                            checked={form.payplan === 'full'}
                            onChange={handleChange}
                            className="mr-3"
                          />
                          <span style={{ color: 'var(--card-foreground)' }}>
                            Pay in full now — <strong>+30 minutes free</strong>
                          </span>
                        </label>
                      </div>
                      <div className="mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                        <div className="flex justify-between">
                          <span style={{ color: 'var(--card-foreground)' }}>Payment now:</span>
                          <span 
                            className="font-semibold"
                            style={{ color: 'var(--card-foreground)' }}
                          >
                            {formatCurrency(paymentNowAmount)}
                          </span>
                        </div>
                        {form.payplan === 'deposit' && (
                          <p 
                            className="text-sm mt-1"
                            style={{ color: 'var(--muted)' }}
                          >
                            Remaining balance: {formatCurrency(balanceDueAmount)}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="flex items-center">
                      <input
                        id="terms_accepted"
                        name="terms_accepted"
                        type="checkbox"
                        required
                        checked={form.terms_accepted}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <label 
                        htmlFor="terms_accepted"
                        className="text-sm"
                        style={{ color: 'var(--card-foreground)' }}
                      >
                        I agree to the{" "}
                        <button
                          type="button"
                          onClick={() => setShowTermsModal(true)}
                          className="underline hover:no-underline"
                          style={{ color: 'var(--primary)' }}
                        >
                          Terms of Service
                        </button>
                        {" "}and{" "}
                        <button
                          type="button"
                          onClick={() => setShowPrivacyModal(true)}
                          className="underline hover:no-underline"
                          style={{ color: 'var(--primary)' }}
                        >
                          Privacy Policy
                        </button>
                      </label>
                    </div>
                  </div>
                )}

                {/* Error/Success Messages */}
                {availabilityMessage && (
                  <div 
                    className={`p-3 rounded-lg mt-4 ${
                      availabilityMessageType === 'success' 
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : availabilityMessageType === 'danger'
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-yellow-500 bg-yellow-50 text-yellow-700'
                    }`}
                    style={{
                      border: `1px solid ${
                        availabilityMessageType === 'success' ? 'var(--success)' :
                        availabilityMessageType === 'danger' ? 'var(--destructive)' :
                        'var(--warning)'
                      }`,
                      background: `color-mix(in srgb, ${
                        availabilityMessageType === 'success' ? 'var(--success)' :
                        availabilityMessageType === 'danger' ? 'var(--destructive)' :
                        'var(--warning)'
                      } 10%, transparent)`,
                      color: availabilityMessageType === 'success' ? 'var(--success)' :
                             availabilityMessageType === 'danger' ? 'var(--destructive)' :
                             'var(--warning)'
                    }}
                  >
                    {availabilityMessage}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0}
                    className="px-6 py-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50"
                    style={{
                      background: 'var(--card)',
                      color: 'var(--card-foreground)',
                      border: '1px solid var(--border)'
                    }}
                  >
                    ← Back
                  </button>
                  <div className="flex gap-3">
                    {step < stepsContent.length - 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: 'var(--primary)',
                          color: 'var(--primary-foreground)',
                          boxShadow: 'var(--shadow)',
                          border: '1px solid transparent'
                        }}
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5"
                        style={{
                          background: 'var(--primary)',
                          color: 'var(--primary-foreground)',
                          boxShadow: 'var(--shadow)',
                          border: '1px solid transparent'
                        }}
                      >
                        Complete Order
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div 
                className="sticky top-8 p-6 rounded-lg"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--card)',
                  boxShadow: 'var(--shadow)'
                }}
              >
                <h3 
                  className="font-semibold mb-4"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  Summary
                </h3>
                <div className="space-y-3 text-sm">
                  {[
                    ['Name', form.name || '—'],
                    ['Email', form.email || '—'],
                    ['Date', form.date || '—'],
                    ['Start', form.time ? formatTime12(parseInt(form.time.split(':')[0]), parseInt(form.time.split(':')[1])) : '—'],
                    ['Duration', form.duration ? `${form.duration}h` : '—'],
                    ['End (est.)', getEndTime()],
                    ['Venue', form.venue || '—'],
                    ['City', form.city || '—'],
                    ['Address', form.address || '—'],
                    ['Package', form.package || '—'],
                    ['Add-ons', form.addons.length ? form.addons.join(', ') : 'None'],
                    ['Estimated total', formatCurrency(selectedPackagePrice)],
                    ['Payment plan', form.payplan === 'full' ? 'Pay in full' : '50% deposit'],
                    ['Payment now', formatCurrency(paymentNowAmount)],
                  ].map(([label, value], i) => (
                    <div 
                      key={i}
                      className={`flex justify-between py-2 ${i !== 13 ? 'border-b' : ''}`}
                      style={{ 
                        borderColor: 'var(--border)',
                        color: 'var(--card-foreground)'
                      }}
                    >
                      <span>{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowTermsModal(false)}
        >
          <div 
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)'
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-xl font-bold"
                style={{ color: 'var(--card-foreground)' }}
              >
                Terms of Service
              </h2>
              <button
                onClick={() => setShowTermsModal(false)}
                className="text-2xl font-bold hover:opacity-70 transition-opacity"
                style={{ color: 'var(--card-foreground)' }}
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6 text-sm">
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  1. Service Agreement
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  By booking Cheezy Hut photo booth services, you agree to these terms and conditions.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  2. Payment Terms
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  Deposit payments are non-refundable. Final balance is due 14 days before your event.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  3. Cancellation Policy
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  Cancellations made more than 14 days before the event will forfeit the deposit. Cancellations within 14 days require full payment.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  4. Equipment and Setup
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  Client must provide adequate power supply and setup space. Weather-related cancellations for outdoor events are subject to rescheduling.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  5. Liability
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  Cheezy Hut is not liable for damages to venue or injuries during the event. Client assumes responsibility for guest behavior.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  6. Image Rights
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  Cheezy Hut reserves the right to use photos taken during events for marketing purposes unless otherwise specified.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowTermsModal(false)}
                className="px-6 py-2 rounded-lg font-semibold"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => e.target === e.currentTarget && setShowPrivacyModal(false)}
        >
          <div 
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg p-6"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)'
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 
                className="text-xl font-bold"
                style={{ color: 'var(--card-foreground)' }}
              >
                Privacy Policy
              </h2>
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="text-2xl font-bold hover:opacity-70 transition-opacity"
                style={{ color: 'var(--card-foreground)' }}
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6 text-sm">
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  1. Information Collection
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  We collect personal information necessary for booking services including name, email, phone number, and event details.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  2. Information Use
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  Your information is used solely for service delivery, communication about your booking, and payment processing.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  3. Information Sharing
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  We do not sell, trade, or share your personal information with third parties except as required for service delivery (payment processing, etc.).
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  4. Data Security
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </div>
              
              <div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  5. Contact Information
                </h3>
                <p style={{ color: 'var(--muted)' }}>
                  For privacy-related questions, contact us at bookings@cheezyhut.com
                </p>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-6 py-2 rounded-lg font-semibold"
                style={{
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}