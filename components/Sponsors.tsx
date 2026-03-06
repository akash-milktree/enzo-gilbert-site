"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPONSORS_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sponsor-content > *", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".sponsor-image", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sponsors"
      className="relative overflow-hidden bg-charcoal py-28 sm:py-36"
    >
      {/* Accent stripe */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-neon via-neon/30 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Text */}
        <div className="sponsor-content flex flex-col justify-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-neon">
            Partners
          </span>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-offwhite sm:text-5xl">
            {SPONSORS_CONTENT.heading}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-offwhite/60 sm:text-lg">
            {SPONSORS_CONTENT.body}
          </p>
          <p className="mt-4 text-sm text-offwhite/40">
            {SPONSORS_CONTENT.note}
          </p>
          <a
            href="#contact"
            className="magnetic-btn mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-neon px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-charcoal transition-all duration-300 hover:bg-neon-dim hover:shadow-lg hover:shadow-neon/20"
          >
            {SPONSORS_CONTENT.cta}
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        {/* Image */}
        <div className="sponsor-image relative">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-graphite">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal to-graphite">
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-offwhite/10">
                  <svg
                    className="h-8 w-8 text-offwhite/20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-offwhite/30">Team group photo</p>
              </div>
            </div>
          </div>
          {/* Neon accent corner */}
          <div className="absolute -bottom-3 -left-3 h-24 w-24 rounded-bl-2xl border-b-2 border-l-2 border-neon/40" />
        </div>
      </div>
    </section>
  );
}
