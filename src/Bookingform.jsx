import React, { useState } from "react";

// helper function to generate 15-min interval slots
function generateTimeSlots(start = "08:00", end = "23:45") {
  const slots = [];
  let [h, m] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);

  while (h < endH || (h === endH && m <= endM)) {
    const date = new Date();
    date.setHours(h, m, 0);

    let hours = date.getHours();
    let minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    slots.push(`${hours}:${minutes} ${ampm}`);

    m += 15;
    if (m >= 60) {
      h++;
      m = 0;
    }
  }
  return slots;
}

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    // Step 1
    name: "",
    email: "",
    phone: "",
    company: "",

    // Step 2
    date: "",
    time: "",
    duration: "3.5h",
    end: "12:30 PM",

    // Step 3
    venue: "",
    city: "",
    address: "",
    notes: "",

    // Step 4
    package: "Simple",
    addons: [],
    coupon: "",
    payNow: false,
  });

  const isStepValid = () => {
    if (step === 1) return form.name && form.email && form.phone && form.company;
    if (step === 2) return form.date && form.time;
    if (step === 3) return form.venue && form.city && form.address;
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        addons: checked
          ? [...prev.addons, value]
          : prev.addons.filter((a) => a !== value),
      }));
    } else if (type === "radio") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  return (
    <section
      id="booking"
      className="py-20 px-5 bg-[var(--bg)] text-white min-h-[1023.69px]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">Book Cheezy Hut</h2>
        <p className="text-gray-400 mb-8">
          This quick 4-step request helps us lock your date, collect a deposit,
          and tailor your package.
        </p>

        <div className="bg-[#161b22] border border-gray-700 rounded-lg p-6">
          {/* Step Buttons */}
          <div className="flex gap-3 mb-6">
            {["Contact", "Date & Time", "Venue Details", "Package & Payment"].map(
              (label, i) => (
                <button
                  key={i}
                  className={`flex-1 px-4 py-2 rounded border text-sm font-medium ${
                    step === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-transparent border-gray-600 text-gray-400"
                  }`}
                  disabled
                >
                  {i + 1}. {label}
                </button>
              )
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: Form */}
            <div className="flex-1">
              {/* Step 1 */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["name", "email", "phone", "company"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm mb-1 capitalize">
                        {field === "company" ? "Company / School" : field}
                      </label>
                      <input
                        type="text"
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 rounded border border-gray-700 bg-[#0d1117] focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Event date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded border border-gray-700 bg-[#0d1117]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Event start time</label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded border border-gray-700 bg-[#0d1117]"
                    >
                      <option value="">Select a time</option>
                      {generateTimeSlots("08:00", "23:45").map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="grid grid-cols-1 gap-4">
                  {[
                    ["venue", "Where is your event being hosted?"],
                    ["city", "What city is your event in?"],
                    ["address", "Event address"],
                  ].map(([field, label]) => (
                    <div key={field}>
                      <label className="block text-sm mb-1">{label}</label>
                      <input
                        type="text"
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        placeholder={field === "city" ? "Detroit, MI" : ""}
                        className="w-full px-3 py-2 rounded border border-gray-700 bg-[#0d1117]"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm mb-1">Anything else?</label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-3 py-2 rounded border border-gray-700 bg-[#0d1117]"
                    />
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Package */}
                  <div>
                    <label className="block text-sm mb-1">Package</label>
                    <select
                      name="package"
                      value={form.package}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded border border-gray-700 bg-[#0d1117]"
                    >
                      <option>Simple</option>
                      <option>Starter</option>
                      <option>Party Favorite</option>
                      <option>All-Out</option>
                    </select>
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm mb-1">
                      How long are we partying for?
                    </label>
                    <p className="text-gray-400 text-xs mb-1">
                      Max based on your start time: up to 8 hours (we leave by
                      midnight).
                    </p>
                    <input
                      type="text"
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded border border-gray-700 bg-[#0d1117]"
                    />
                  </div>

                  {/* Add-ons */}
                  <div>
                    <label className="block text-sm mb-2">Add-ons</label>
                    {[
                      ["Glam Filter", "$100.00"],
                      ["Photo Slideshow", "$400.00"],
                      ["Premium Backdrop", "$200.00"],
                      ["Prints", "$150.00"],
                      ["Sharing Kiosk", "$120.00"],
                    ].map(([label, price]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between mb-2"
                      >
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            value={label}
                            checked={form.addons.includes(label)}
                            onChange={handleChange}
                          />
                          <span>{label}</span>
                        </label>
                        <span className="text-gray-300">{price}</span>
                      </div>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div>
                    <label className="block text-sm mb-1">
                      Coupon Code (Optional)
                    </label>
                    <input
                      type="text"
                      name="coupon"
                      value={form.coupon}
                      onChange={handleChange}
                      placeholder="Enter coupon code"
                      className="w-full px-3 py-2 rounded border border-gray-700 bg-[#0d1117]"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Enter a coupon code to get a discount
                    </p>
                  </div>

                  {/* Slot */}
                  <div>
                    <h4 className="font-medium mb-2">Your slot</h4>
                    <p className="text-sm text-gray-300">
                      Date: {form.date || "—"} <br />
                      Start: {form.time || "—"} <br />
                      Duration: {form.duration || "—"} <br />
                      End (est.): {form.end || "—"} <br />
                      Venue: {form.venue || "—"} <br />
                      City: {form.city || "—"} <br />
                      Address: {form.address || "—"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      We'll hold your slot once payment is made.
                    </p>
                  </div>

                  {/* Payment */}
                  <div>
                    <h4 className="font-medium mb-2">Payment</h4>
                    <label className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name="payNow"
                        value="full"
                        checked={form.payNow === "full"}
                        onChange={handleChange}
                      />
                      Pay in full now — +30 minutes free
                    </label>
                    <p className="text-sm text-gray-300">Payment now: $0.00</p>
                    {form.payNow === "full" && (
                      <p className="text-xs text-green-400 mt-1">
                        Thanks for paying in full! We'll add +30 minutes to your
                        session.
                      </p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="flex items-center gap-2 mt-4">
                    <input type="checkbox" id="tos" />
                    <label htmlFor="tos" className="text-sm text-gray-300">
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  disabled={step === 1}
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded bg-gray-700 text-gray-300 disabled:opacity-50"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepValid()}
                  className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                >
                  {step === 4 ? "Submit" : "Next →"}
                </button>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="w-full lg:w-80 bg-[#161b22] border border-gray-700 rounded-lg p-4 text-sm">
              <h3 className="font-medium mb-3">Summary</h3>
              <ul className="space-y-2 text-gray-300">
                {[
                  ["Name", form.name || "—"],
                  ["Email", form.email || "—"],
                  ["Date", form.date || "—"],
                  ["Start", form.time || "—"],
                  ["Duration", form.duration || "—"],
                  ["End (est.)", form.end || "—"],
                  ["Venue", form.venue || "—"],
                  ["City", form.city || "—"],
                  ["Address", form.address || "—"],
                  ["Package", form.package || "—"],
                  ["Add-ons", form.addons.join(", ") || "None"],
                  ["Coupon", form.coupon || "—"],
                ].map(([label, value], i) => (
                  <li
                    key={i}
                    className={`flex justify-between ${
                      i !== 12 ? "border-b border-gray-700 pb-1" : ""
                    }`}
                  >
                    <span>{label}:</span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
