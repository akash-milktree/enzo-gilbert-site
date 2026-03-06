"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { CONTACT_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading word reveal
      const headingSplit = new SplitType(".contact-heading", {
        types: "words",
      });
      if (headingSplit.words) {
        gsap.from(headingSplit.words, {
          y: 120,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".contact-heading",
            start: "top 80%",
          },
        });
      }

      // Form slides up from below
      if (formContainerRef.current) {
        gsap.from(formContainerRef.current, {
          y: "100%",
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: "top 95%",
          },
        });
      }

      // Social links stagger in
      gsap.from(".contact-social", {
        x: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-socials",
          start: "top 90%",
        },
      });
    }, section);

    // Cursor spotlight effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !section) return;
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(204,255,0,0.04), transparent 60%)`;
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => {
      ctx.revert();
      section.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen overflow-hidden bg-charcoal py-28 sm:py-40"
    >
      {/* Cursor spotlight overlay */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute inset-0 z-0"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Label */}
        <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.4em] text-neon-dim">
          Get In Touch
        </span>

        {/* Massive heading */}
        <h2 className="contact-heading font-display text-[clamp(3rem,12vw,10rem)] font-bold uppercase leading-[0.85] tracking-tight text-offwhite">
          Let&apos;s Connect
        </h2>

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          {/* Form — left side */}
          <div className="overflow-hidden md:col-span-7">
            <div ref={formContainerRef}>
              <p className="mb-10 max-w-lg text-base leading-relaxed text-offwhite/40">
                {CONTACT_CONTENT.body}
              </p>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="underline-input w-full border-b border-offwhite/10 bg-transparent pb-4 font-display text-lg text-offwhite placeholder:text-offwhite/20 focus:border-neon focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="underline-input w-full border-b border-offwhite/10 bg-transparent pb-4 font-display text-lg text-offwhite placeholder:text-offwhite/20 focus:border-neon focus:outline-none"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="underline-input w-full resize-none border-b border-offwhite/10 bg-transparent pb-4 font-display text-lg text-offwhite placeholder:text-offwhite/20 focus:border-neon focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex items-center gap-4 border border-neon/30 px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon transition-all duration-300 hover:bg-neon hover:text-charcoal"
                >
                  Send Message
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Socials + info — right side */}
          <div className="flex flex-col justify-between md:col-span-4 md:col-start-9">
            <div className="contact-socials space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-offwhite/30">
                Follow Enzo
              </p>
              {CONTACT_CONTENT.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social group flex items-center justify-between border-b border-offwhite/5 pb-4 transition-colors hover:border-neon/30"
                >
                  <span className="font-display text-lg font-bold uppercase text-offwhite/60 transition-colors group-hover:text-neon">
                    {social.label}
                  </span>
                  <svg
                    className="h-4 w-4 text-offwhite/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-neon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </a>
              ))}

              {/* Email */}
              <a
                href={`mailto:${CONTACT_CONTENT.email}`}
                className="mt-8 block font-display text-sm text-offwhite/30 transition-colors hover:text-neon"
              >
                {CONTACT_CONTENT.email}
              </a>
            </div>

            {/* Safety note */}
            <p className="mt-16 text-[10px] leading-relaxed text-offwhite/15">
              {CONTACT_CONTENT.safetyNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
