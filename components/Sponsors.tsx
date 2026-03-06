"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { SPONSORS_CONTENT } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading character reveal — dramatic stagger
      const headingSplit = new SplitType(".sponsors-heading", {
        types: "chars",
      });
      if (headingSplit.chars) {
        gsap.from(headingSplit.chars, {
          y: 120,
          opacity: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".sponsors-heading",
            start: "top 85%",
          },
        });
      }

      // Full-width neon line draw
      gsap.from(".sponsors-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".sponsors-line",
          start: "top 90%",
        },
      });

      // Body text line reveal
      const bodyEl = section.querySelector("[data-split-body]");
      if (bodyEl) {
        const split = new SplitType(bodyEl as HTMLElement, { types: "lines" });
        if (split.lines) {
          split.lines.forEach((line) => {
            const wrapper = document.createElement("div");
            wrapper.style.overflow = "hidden";
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });

          gsap.from(split.lines, {
            y: "100%",
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: bodyEl,
              start: "top 85%",
            },
          });
        }
      }

      // CTA reveal
      gsap.from(".sponsors-cta", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sponsors-cta",
          start: "top 90%",
        },
      });

      // Note fade in
      gsap.from(".sponsors-note", {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".sponsors-note",
          start: "top 95%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative overflow-hidden bg-charcoal py-28 sm:py-40"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Label */}
        <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.4em] text-neon-dim">
          Partners
        </span>

        {/* Heading — massive typography */}
        <h2 className="sponsors-heading font-display text-[clamp(3rem,10vw,9rem)] font-bold uppercase leading-[0.85] tracking-tight text-offwhite">
          Partners
        </h2>

        {/* Full-width neon line */}
        <div className="sponsors-line my-12 h-[1px] w-full bg-neon/40" />

        {/* Body text */}
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p
              data-split-body
              className="text-lg leading-relaxed text-offwhite/50 sm:text-xl"
            >
              {SPONSORS_CONTENT.body}
            </p>
          </div>

          <div className="flex flex-col justify-between">
            {/* CTA */}
            <div className="sponsors-cta">
              <MagneticButton
                href="#contact"
                className="group inline-flex items-center gap-4 border border-neon/30 px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon transition-all duration-300 hover:bg-neon hover:text-charcoal"
                strength={0.4}
                threshold={200}
              >
                {SPONSORS_CONTENT.cta}
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
              </MagneticButton>
            </div>

            {/* Note */}
            <p className="sponsors-note mt-12 max-w-sm text-xs leading-relaxed text-offwhite/25">
              {SPONSORS_CONTENT.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
