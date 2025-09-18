import React, { useState } from "react";
import "./BookingForm.css";

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
    date: "",
    time: "",
    duration: "3",
    location: "",
    address: "",
    guests: "",
    package: "basic",
    extras: {
    chairs: false,
    decor: false,
    live_music: false,
    },
    depositPercentage: 50, // %
  });

 
  const PRICING = {
    packages: {
      basic: 200,
      premium: 400,
      ultimate: 700,
    },
    extras: {
      chairs: 30,
      decor: 150,
      live_music: 250,
    },
  };

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("extras.")) {
      const key = name.split(".")[1];
      setForm((f) => ({ ...f, extras: { ...f.extras, [key]: checked } }));
    } else {
      update({ [name]: type === "number" ? Number(value) : value });
    }
  };

  const validateStep = () => {
    // Simple required validations per step
    if (step === 0) {
      if (!form.name.trim() || !form.email.trim()) return "Please fill name & email.";
    }
    if (step === 1) {
      if (!form.date || !form.time) return "Please choose date and time.";
    }
    if (step === 2) {
      if (!form.location.trim()) return "Please provide venue location.";
    }
    // step 3 has no required fields (you can add)
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) {
      alert(err);
      return;
    }
    if (step < STEP_TITLES.length - 1) setStep((s) => s + 1);
    else handleSubmit(); // final submit if at last step
  };

  const back = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const calculateTotals = () => {
    const pkg = PRICING.packages[form.package] || 0;
    const extras = Object.entries(form.extras).reduce((sum, [k, v]) => {
      return sum + (v ? (PRICING.extras[k] || 0) : 0);
    }, 0);
    const estimated = pkg + extras;
    const deposit = Math.round((form.depositPercentage / 100) * estimated);
    const balance = Math.max(0, estimated - deposit);
    return { pkg, extras, estimated, deposit, balance };
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const err = validateStep();
    if (err) {
      alert(err);
      return;
    }
    // For demo: alert JSON. Replace with API call.
    alert("Booking submitted:\n" + JSON.stringify(form, null, 2));
  };

  const totals = calculateTotals();
    return (
  <section className="booking-section">
    {/* 👇 Heading form box ke bahar hai */}
    <div className="booking-header">
      <h2 className="booking-title">Book Cheezy Hut</h2>
      <p className="booking-subtitle">
        This quick 4-step request helps us lock your date, collect a deposit, and tailor your package.
      </p>
    </div>

    <div className="booking-container">
      <div className="steps">
        {STEP_TITLES.map((t, i) => (
          <button
            key={t}
            className={`step ${i === step ? "active" : ""}`}
            onClick={() => setStep(i)}
            type="button"
          >
            {t}
          </button>
          
        ))}
      </div>

   

        <div className="booking-content">
          <form onSubmit={handleSubmit} className="booking-form" noValidate>
            {/* Step 1: Contact */}
            {step === 0 && (
              <>
                <label>
                  Your Name
                  <input name="name" value={form.name} onChange={handleChange} required />
                </label>

                <label>
                  Email
                  <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </label>

                <label>
                  Phone
                  <input name="phone" value={form.phone} onChange={handleChange} />
                </label>
              </>
            )}

            {/* Step 2: Date & Time */}
            {step === 1 && (
              <>
                <label>
                  Date
                  <input type="date" name="date" value={form.date} onChange={handleChange} required />
                </label>

                <label>
                  Start Time
                  <input type="time" name="time" value={form.time} onChange={handleChange} required />
                </label>

                <label>
                  Duration (hours)
                  <select name="duration" value={form.duration} onChange={handleChange}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                  </select>
                </label>
              </>
            )}

            {/* Step 3: Venue Details */}
            {step === 2 && (
              <>
                <label>
                  Location / Venue
                  <input name="location" value={form.location} onChange={handleChange} required />
                </label>

                <label>
                  Address (optional)
                  <textarea name="address" value={form.address} onChange={handleChange} rows="3" />
                </label>

                <label>
                  Guests (approx.)
                  <input type="number" name="guests" value={form.guests} onChange={handleChange} min="0" />
                </label>
              </>
            )}

            {/* Step 4: Package & Payment */}
            {step === 3 && (
              <>
                <label>
                  Package
                  <select name="package" value={form.package} onChange={handleChange}>
                    <option value="basic">Basic — ${PRICING.packages.basic}</option>
                    <option value="premium">Premium — ${PRICING.packages.premium}</option>
                    <option value="ultimate">Ultimate — ${PRICING.packages.ultimate}</option>
                  </select>
                </label>

                <fieldset className="extras">
                  <legend>Extras</legend>
                  <label>
                    <input
                      type="checkbox"
                      name="extras.chairs"
                      checked={form.extras.chairs}
                      onChange={handleChange}
                    />
                    Additional chairs (${PRICING.extras.chairs})
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="extras.decor"
                      checked={form.extras.decor}
                      onChange={handleChange}
                    />
                    Decor package (${PRICING.extras.decor})
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="extras.live_music"
                      checked={form.extras.live_music}
                      onChange={handleChange}
                    />
                    Live music (${PRICING.extras.live_music})
                  </label>
                </fieldset>

                <div className="pricing-preview">
                  <p><strong>Package:</strong> ${totals.pkg}</p>
                  <p><strong>Extras total:</strong> ${totals.extras}</p>
                  <p><strong>Estimated total:</strong> ${totals.estimated}</p>
                  <p><strong>Deposit ({form.depositPercentage}%):</strong> ${totals.deposit}</p>
                  <p><strong>Balance due:</strong> ${totals.balance}</p>
                </div>
              </>
            )}

            <div className="form-buttons">
              <button type="button" className="back-btn" onClick={back} disabled={step === 0}>
                ← Back
              </button>
              <button type="button" className="next-btn" onClick={next}>
                {step === STEP_TITLES.length - 1 ? "Submit" : "Next →"}
              </button>
            </div>
          </form>

          <aside className="summary-card">
            <h3>Summary</h3>
            <ul>
              <li><strong>Name:</strong> {form.name || "-"}</li>
              <li><strong>Email:</strong> {form.email || "-"}</li>
              <li><strong>Date:</strong> {form.date || "-"}</li>
              <li><strong>Start:</strong> {form.time || "12:00 AM"}</li>
              <li><strong>Duration:</strong> {form.duration} hrs</li>
              <li><strong>Location:</strong> {form.location || "None"}</li>
              <li><strong>Extras total:</strong> ${totals.extras.toFixed(2)}</li>
              <li><strong>Estimated total:</strong> ${totals.estimated.toFixed(2)}</li>
              <li><strong>Payment plan:</strong> {form.depositPercentage}% deposit</li>
              <li><strong>Payment now:</strong> ${totals.deposit.toFixed(2)}</li>
              <li><strong>Balance due:</strong> ${totals.balance.toFixed(2)}</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
