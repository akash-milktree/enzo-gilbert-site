"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function MeetEnzo() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(textRef.current!.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
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
      id="about"
      className="relative overflow-hidden bg-offwhite py-28 sm:py-36"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Image */}
        <div ref={imageRef} className="relative">
          <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-charcoal/10">
            {/* Placeholder until real photo */}
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal/5 to-charcoal/15">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-charcoal/20">
                  <span className="font-display text-2xl font-bold text-charcoal/30">
                    EG
                  </span>
                </div>
                <p className="text-sm text-charcoal/40">
                  Portrait photo of Enzo
                </p>
              </div>
            </div>
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl border-2 border-neon/30 -z-10" />
        </div>

        {/* Text content */}
        <div ref={textRef} className="flex flex-col justify-center">
          <span className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-neon-dim">
            About
          </span>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-charcoal sm:text-5xl">
            {ABOUT_CONTENT.heading}
          </h2>

          <div className="mt-8 space-y-5">
            {ABOUT_CONTENT.body.map((paragraph, i) => (
              <p
                key={i}
                className="text-base leading-relaxed text-charcoal/70 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Pull quote */}
          <blockquote className="mt-10 border-l-4 border-neon pl-6">
            <p className="font-display text-lg font-semibold italic text-charcoal sm:text-xl">
              &ldquo;{ABOUT_CONTENT.quote}&rdquo;
            </p>
            <cite className="mt-2 block text-sm text-charcoal/50 not-italic">
              — The Gilbert Family
            </cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
