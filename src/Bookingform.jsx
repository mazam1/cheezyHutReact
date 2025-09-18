import React, { useState } from "react";

const STEP_TITLES = [
  "Contact",
  "Date & Time",
  "Venue Details",
  "Package & Payment",
];

export default function BookingForm() {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "",
    duration: "3",
    city: "",
    address: "",
    notes: "",
    package: "Simple",
    addons: {
      glamFilter: false,
      photoSlideshow: false,
      premiumBackdrop: false,
      prints: false,
      sharingKiosk: false,
    },
    couponCode: "",
    paymentOption: "deposit", // deposit or full
    termsAccepted: false,
  });

  const PACKAGES = {
    "Simple": { price: 449, duration: 2 },
    "Starter": { price: 549, duration: 3 },
    "Party Favorite": { price: 799, duration: 3 },
    "All-Out": { price: 1149, duration: 4 },
  };

  const ADDONS = {
    glamFilter: { name: "Glam Filter", price: 100 },
    photoSlideshow: { name: "Photo Slideshow", price: 400 },
    premiumBackdrop: { name: "Premium Backdrop", price: 200 },
    prints: { name: "Prints", price: 150 },
    sharingKiosk: { name: "Sharing Kiosk", price: 120 },
  };

  const TIME_SLOTS = [
    "8:00 AM", "8:15 AM", "8:30 AM", "8:45 AM", "9:00 AM", "9:15 AM", "9:30 AM", "9:45 AM",
    "10:00 AM", "10:15 AM", "10:30 AM", "10:45 AM", "11:00 AM", "11:15 AM", "11:30 AM", "11:45 AM",
    "12:00 PM", "12:15 PM", "12:30 PM", "12:45 PM", "1:00 PM", "1:15 PM", "1:30 PM", "1:45 PM",
    "2:00 PM", "2:15 PM", "2:30 PM", "2:45 PM", "3:00 PM", "3:15 PM", "3:30 PM", "3:45 PM",
    "4:00 PM", "4:15 PM", "4:30 PM", "4:45 PM", "5:00 PM", "5:15 PM", "5:30 PM", "5:45 PM",
    "6:00 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7:00 PM", "7:15 PM", "7:30 PM", "7:45 PM",
    "8:00 PM", "8:15 PM", "8:30 PM", "8:45 PM", "9:00 PM", "9:15 PM", "9:30 PM", "9:45 PM",
    "10:00 PM"
  ];

  const DURATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const updateAddon = (addon, checked) => {
    setForm(prev => ({
      ...prev,
      addons: { ...prev.addons, [addon]: checked }
    }));
  };

  const calculateTotals = () => {
    const packagePrice = PACKAGES[form.package]?.price || 0;
    const addonsTotal = Object.entries(form.addons).reduce((sum, [key, checked]) => {
      return sum + (checked ? ADDONS[key].price : 0);
    }, 0);
    const subtotal = packagePrice + addonsTotal;
    const paymentNow = form.paymentOption === "full" ? subtotal + 60 : Math.round(subtotal * 0.5); // 50% deposit + $60 bonus for full payment
    const balanceDue = subtotal - paymentNow;

    return {
      packagePrice,
      addonsTotal,
      subtotal,
      paymentNow,
      balanceDue,
      bonusTime: form.paymentOption === "full" ? "+30 minutes" : null
    };
  };

  const validateStep = () => {
    if (step === 0) {
      if (!form.name.trim() || !form.email.trim() || !form.phone.trim() || !form.company.trim()) {
        return "Please fill name, a valid email, phone, and company/school to continue.";
      }
    }
    if (step === 1) {
      if (!form.date) return "Please add an event date, start time, and duration.";
      if (!form.time) return "Please select a start time.";
    }
    if (step === 2) {
      if (!form.city.trim() || !form.address.trim()) {
        return "Please add venue, city, address, and notes.";
      }
    }
    if (step === 3) {
      if (!form.termsAccepted) {
        return "Please choose a package and accept the terms of service.";
      }
    }
    return null;
  };

  const next = () => {
    const error = validateStep();
    if (error) {
      alert(error);
      return;
    }
    if (step < STEP_TITLES.length - 1) {
      setStep(step + 1);
    }
  };

  const back = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    const error = validateStep();
    if (error) {
      alert(error);
      return;
    }
    alert("Booking submitted successfully!");
  };

  const totals = calculateTotals();

  return (
    <section id="book" className="py-20 px-5 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Book Cheezy Hut</h2>
          <p className="text-xl text-gray-400">
            This quick 4-step request helps us lock your date, collect a deposit, and tailor your package.
          </p>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-2">
            {STEP_TITLES.map((title, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  i === step
                    ? 'bg-blue-600 text-white'
                    : i < step
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-gray-400'
                }`}
              >
                {i + 1} {title}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
          {/* Step 1: Contact */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => updateForm('name', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm('email', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company / School</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => updateForm('company', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Company or school name"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Event date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => updateForm('date', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Event Start Time</label>
                  <select
                    value={form.time}
                    onChange={(e) => updateForm('time', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">How long are we partying for?</label>
                  <select
                    value={form.duration}
                    onChange={(e) => updateForm('duration', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {DURATIONS.map(hours => (
                      <option key={hours} value={hours}>{hours} hour{hours !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              <p className="text-sm text-gray-400">Start between 8:00 AM and 10:00 PM. Max based on your start time: up to 8 hours (we leave by midnight).</p>
            </div>
          )}

          {/* Step 3: Venue Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">What city is your event in?</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => updateForm('city', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="City name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Event address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => updateForm('address', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Full address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Anything else?</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => updateForm('notes', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
                  placeholder="Special instructions or notes..."
                />
              </div>
            </div>
          )}

          {/* Step 4: Package & Payment */}
          {step === 3 && (
            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium mb-4">Package</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(PACKAGES).map(([name, details]) => (
                    <button
                      key={name}
                      onClick={() => updateForm('package', name)}
                      className={`p-4 border rounded-lg text-left transition-all ${
                        form.package === name
                          ? 'border-blue-500 bg-blue-600 text-white'
                          : 'border-slate-600 bg-slate-900 text-gray-300 hover:border-slate-500'
                      }`}
                    >
                      <div className="font-medium">{name}</div>
                      <div className="text-sm opacity-75">${details.price} / {details.duration} hrs</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <h3 className="text-lg font-medium mb-4">Add-ons</h3>
                <div className="space-y-3">
                  {Object.entries(ADDONS).map(([key, addon]) => (
                    <label key={key} className="flex items-center justify-between p-3 bg-slate-900 border border-slate-600 rounded-lg cursor-pointer hover:border-slate-500">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={form.addons[key]}
                          onChange={(e) => updateAddon(key, e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm">{addon.name}</span>
                      </div>
                      <span className="text-sm font-medium">${addon.price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Coupon Code */}
              <div>
                <label className="block text-sm font-medium mb-2">Coupon Code (Optional)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.couponCode}
                    onChange={(e) => updateForm('couponCode', e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter coupon code"
                  />
                  <button className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Payment Options */}
              <div>
                <h3 className="text-lg font-medium mb-4">Payment</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentOption === 'deposit'}
                      onChange={() => updateForm('paymentOption', 'deposit')}
                      className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">50% deposit now + 50% due 14 days before event (industry standard)</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentOption === 'full'}
                      onChange={() => updateForm('paymentOption', 'full')}
                      className="w-4 h-4 text-blue-600 bg-slate-900 border-slate-600 focus:ring-blue-500"
                    />
                    <span className="text-sm">Pay in full now — +30 minutes free</span>
                  </label>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.termsAccepted}
                  onChange={(e) => updateForm('termsAccepted', e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 bg-slate-900 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-400">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-700">
            <button
              onClick={back}
              disabled={step === 0}
              className="px-6 py-3 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Back
            </button>

            <button
              onClick={step === STEP_TITLES.length - 1 ? handleSubmit : next}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              {step === STEP_TITLES.length - 1 ? 'Complete Order' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Summary */}
        {step === STEP_TITLES.length - 1 && (
          <div className="mt-8 bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold mb-4">Summary</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <div><strong>Name:</strong> {form.name || '—'}</div>
                <div><strong>Email:</strong> {form.email || '—'}</div>
                <div><strong>Date:</strong> {form.date || '—'}</div>
                <div><strong>Start:</strong> {form.time || '—'}</div>
                <div><strong>Duration:</strong> {form.duration} hours</div>
                <div><strong>Venue:</strong> {form.address || '—'}</div>
                <div><strong>City:</strong> {form.city || '—'}</div>
              </div>
              <div className="space-y-2">
                <div><strong>Package:</strong> {form.package}</div>
                <div><strong>Add-ons:</strong> ${totals.addonsTotal}</div>
                <div><strong>Estimated total:</strong> ${totals.subtotal}</div>
                <div><strong>Payment now:</strong> ${totals.paymentNow}</div>
                <div><strong>Balance due:</strong> ${totals.balanceDue > 0 ? `$${totals.balanceDue}` : '—'}</div>
                {totals.bonusTime && <div><strong>Bonus time:</strong> {totals.bonusTime}</div>}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
