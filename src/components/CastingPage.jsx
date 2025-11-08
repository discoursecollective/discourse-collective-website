import React, { useMemo, useState } from "react";
import Footer from './Footer';
import { sendCastingApplication } from '../utils/emailService';

const brand = {
  blue: "#5091dc",
  charcoal: "#1e1e1e",
  soft: "#f4f6f8",
  cool: "#b0bec5",
  coral: "#F26B38",
  teal: "#47B7B0",
  green: "#bad7a0",
  red: "#ec8181",
  turquoise: "#7fdbde",
};

const SHOWS = [
  {
    key: "The Spectrum",
    color: brand.turquoise,
    title: "The Spectrum",
    blurb:
      "Fearless in debate, interested in discussing politics, philosophy and today's pressing issues? " +

        "Sign up to participate in our new debate show!",
  },
  {
    key: "Political Blind Dates",
    color: brand.red,
    title: "Political Blind Dates",
    blurb:
      "Do you believe that intellectual intimacy can be a pathway to love? " +
        "We're exploring the overlap between deep conversation and connection.",
  },
  {
    key: "The Drop Off",
    color: brand.green,
    title: "The Drop Off",
    blurb:
      "Do you have an interesting story or a life‑changing experience you want heard? " +
        "We want to hear from you!",
  },
];

export default function CastingPage({ submitEndpoint = "/apply", logoSrc = "/dc-logo.svg" }) {
  const [selected, setSelected] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const selectedList = useMemo(() => Array.from(selected), [selected]);

  function toggleShow(key) {
    setSelected((prev) => {
      const copy = new Set(prev);
      if (copy.has(key)) copy.delete(key);
      else copy.add(key);
      return copy;
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("shows", selectedList.join(", "));
    const payload = Object.fromEntries(fd.entries());

    try {
      setSubmitting(true);
      
      // Send email with form data
      console.log("Attempting to send email...", payload);
      const emailResult = await sendCastingApplication(payload);
      console.log("Email result:", emailResult);
      
      if (emailResult.success) {
        console.log("Email sent successfully!");
        setSelected(new Set());
        setToast("Thanks — your application has been submitted successfully!");
        setTimeout(() => setToast(""), 3200);
        return; // Important: exit the function here
      } else {
        setToast("Application submitted but email notification failed. We'll still review your application.");
        setTimeout(() => setToast(""), 4200);
        return; // Important: exit the function here
      }
    } catch (err) {
      console.error("Caught error:", err);
      setToast("Something went wrong. Please try again or email info@discoursecollective.co.uk.");
      setTimeout(() => setToast(""), 4200);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      <header className="max-w-6xl mx-auto px-5 py-7 flex items-center justify-between">
        <a href="#" className="inline-flex items-center gap-3">
          <img src={logoSrc} alt="Discourse Collective" className="h-28 w-auto" />
        </a>
      </header>

      <main className="max-w-6xl mx-auto px-5 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">
        <section>
          <span className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 text-slate-700 px-3 py-2 rounded-full font-semibold text-sm">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: brand.blue }} />
            Casting now open
          </span>
          <div className="mt-2 text-sm text-slate-600">
            Selected: <strong>{selectedList.length}</strong>
          </div>
          <h1 className="mt-3 text-5xl/tight sm:text-6xl/tight font-black tracking-tight">CASTING CALL!</h1>
          <p className="mt-3 text-lg text-slate-700 max-w-prose">
            Are you 18–35, fearless in debate, or carrying a story that demands to be heard? We're casting for a new series of talk shows that will facilitate thought‑provoking conversations.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 justify-items-center">
            {SHOWS.map((show) => {
              const isOn = selected.has(show.key);
              return (
                <article
                  key={show.key}
                  className="relative rounded-3xl shadow-xl overflow-hidden cursor-pointer select-none p-6 flex flex-col min-h-[260px] sm:min-h-[280px] lg:min-h-[320px]"
                  style={{ background: show.color }}
                  onClick={() => toggleShow(show.key)}
                >
                  <div className="flex flex-col gap-4">
                    <h2 className="text-white font-black drop-shadow-[0_6px_0_rgba(0,0,0,0.18)] text-4xl sm:text-5xl lg:text-5xl leading-tight">
                      {show.title}
                    </h2>
                    <p className="text-white/95 text-base sm:text-[17px]">{show.blurb}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShow(show.key);
                    }}
                    className={`mt-6 self-start rounded-full px-3.5 py-2 font-bold text-sm bg-white ${
                      isOn ? "text-slate-900" : "text-slate-700"
                    }`}
                    aria-pressed={isOn}
                    aria-label={`${isOn ? "Remove" : "Add"} ${show.title} from application`}
                  >
                    {isOn ? "Selected" : "Add to my application"}
                  </button>
                  {isOn && (
                    <div className="pointer-events-none absolute inset-0 ring-4 ring-white/90 rounded-3xl" />
                  )}
                </article>
              );
            })}
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Tip: tap any card to add that show to your application. You can choose more than one.
          </p>
        </section>

        <section className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-7">
          <h2 className="text-xl font-bold">Casting application</h2>

          <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="hidden" name="shows" value={selectedList.join(", ")} />

            <div className="sm:col-span-2" aria-live="polite">
              <label className="font-semibold text-sm">Selected shows</label>
              {selectedList.length ? (
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedList.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleShow(s)}
                      className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 text-sm"
                      title="Click to remove"
                    >
                      {s}
                      <span className="inline-block w-4 h-4 text-blue-900">×</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-sm text-slate-500">
                  No shows selected yet. Add them from the cards above.
                </p>
              )}
            </div>

            <div>
              <label className="font-semibold text-sm" htmlFor="name">
                First name
              </label>
              <input
                id="first name"
                name="first name"
                required
                placeholder="e.g., Sam"
                className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="font-semibold text-sm" htmlFor="name">
                Last name
              </label>
              <input
                id="last name"
                name="last name"
                required
                placeholder="e.g., Smith"
                className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="font-semibold text-sm" htmlFor="age">
                Age
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min={16}
                max={100}
                required
                placeholder="e.g., 25"
                className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="font-semibold text-sm" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="font-semibold text-sm" htmlFor="phone">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+44 7…"
                className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-sm" htmlFor="social">
                Instagram handle <span className="text-slate-500"></span>
              </label>
              <input
                id="social"
                name="social"
                placeholder="@yourhandle"
                className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-sm" htmlFor="tiktok">
                TikTok handle <span className="text-slate-500"></span>
              </label>
              <input
                  id="tiktok"
                  name="tiktok"
                  placeholder="@yourhandle"
                  className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-sm" htmlFor="reason">
                Why do you want to take part?
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                maxLength={1000}
                placeholder="Tell us a little bit about yourself and what draws you to Discourse Collective and what perspectives you'd bring."
                className="mt-1 w-full min-h-[140px] rounded-xl border border-slate-300 p-3 outline-none focus:ring-4 focus:ring-blue-200"
              />
              <p className="text-xs text-slate-500 mt-1">Max 1000 characters</p>
            </div>

            <label className="sm:col-span-2 inline-flex items-start gap-3 text-sm">
              <input type="checkbox" name="consent" required className="mt-1" />
              <span>
                I agree to be contacted about casting and understand my data will be handled according to the privacy policy.
              </span>
            </label>

            <div className="sm:col-span-2 flex items-center gap-3 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-blue-500 text-white font-bold px-5 py-3 shadow-lg hover:brightness-105 disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Submit application"}
              </button>
              <button type="reset" className="rounded-xl border border-slate-300 px-4 py-2">
                Reset
              </button>
            </div>
          </form>
        </section>
      </main>

      <Footer />

      {toast && (
        <div className="fixed left-1/2 -translate-x-1/2 bottom-6 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg text-sm">
          {toast}
        </div>
      )}
    </div>
  );
}