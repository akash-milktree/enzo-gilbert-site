"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-left > *", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".contact-form", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-charcoal py-28 sm:py-36"
    >
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-neon/5 blur-[150px]" />

      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-12">
        {/* Left — Info */}
        <div className="contact-left flex flex-col justify-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-neon">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-offwhite sm:text-5xl">
            {CONTACT_CONTENT.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-offwhite/60">
            {CONTACT_CONTENT.body}
          </p>

          {/* Contact details */}
          <div className="mt-10 space-y-6">
            <a
              href={`mailto:${CONTACT_CONTENT.email}`}
              className="group flex items-center gap-4"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neon/10 transition-colors group-hover:bg-neon/20">
                <svg
                  className="h-5 w-5 text-neon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-offwhite/40">
                  Email
                </p>
                <p className="text-sm text-offwhite/80 transition-colors group-hover:text-neon">
                  {CONTACT_CONTENT.email}
                </p>
              </div>
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-offwhite/40">
              Follow Enzo
            </p>
            <div className="flex gap-3">
              {CONTACT_CONTENT.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-offwhite/5 text-offwhite/60 transition-all hover:bg-neon/20 hover:text-neon"
                  aria-label={social.label}
                >
                  {social.label === "YouTube" && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                  {social.label === "Instagram" && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  )}
                  {social.label === "TikTok" && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          <p className="mt-8 text-xs italic text-offwhite/30">
            {CONTACT_CONTENT.safetyNote}
          </p>
        </div>

        {/* Right — Form */}
        <div className="contact-form">
          {submitted ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-neon/20 bg-graphite p-12">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neon/10">
                  <svg
                    className="h-8 w-8 text-neon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold uppercase text-offwhite">
                  Message Sent
                </h3>
                <p className="mt-2 text-sm text-offwhite/50">
                  Thank you! We&apos;ll get back to you soon.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl border border-offwhite/5 bg-graphite p-8 sm:p-10"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-offwhite/50"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-offwhite/10 bg-charcoal px-4 py-3 text-sm text-offwhite placeholder-offwhite/20 outline-none transition-colors focus:border-neon/50 focus:ring-1 focus:ring-neon/20"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-offwhite/50"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-offwhite/10 bg-charcoal px-4 py-3 text-sm text-offwhite placeholder-offwhite/20 outline-none transition-colors focus:border-neon/50 focus:ring-1 focus:ring-neon/20"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-offwhite/50"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full resize-none rounded-lg border border-offwhite/10 bg-charcoal px-4 py-3 text-sm text-offwhite placeholder-offwhite/20 outline-none transition-colors focus:border-neon/50 focus:ring-1 focus:ring-neon/20"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="magnetic-btn w-full rounded-full bg-neon px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-neon-dim hover:shadow-lg hover:shadow-neon/20"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
