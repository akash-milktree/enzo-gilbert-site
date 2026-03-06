"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { SPORTS_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function SportsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = cardsContainerRef.current;
    if (!section || !container) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      // Heading character reveal
      const headingSplit = new SplitType(".sports-heading", {
        types: "chars",
      });
      if (headingSplit.chars) {
        gsap.from(headingSplit.chars, {
          y: 80,
          opacity: 0,
          rotateX: -90,
          duration: 0.7,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".sports-heading",
            start: "top 85%",
          },
        });
      }

      if (!isMobile) {
        // Desktop: Stacked card peel effect
        const cards = container.querySelectorAll(".sport-card");
        const totalCards = cards.length;

        // Pin the section for the peel animation
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${totalCards * 80}vh`,
          pin: true,
          anticipatePin: 1,
        });

        // Each card peels away on scroll, revealing the one beneath
        cards.forEach((card, i) => {
          if (i < totalCards - 1) {
            gsap.to(card, {
              yPercent: -120,
              rotation: -3 + Math.random() * 6,
              scale: 0.9,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: () => `top+=${i * 80}vh top`,
                end: () => `top+=${(i + 1) * 80}vh top`,
                scrub: 1,
              },
            });
          }

          // Text reveal for each card as it becomes visible
          const nameEl = card.querySelector(".sport-name");
          if (nameEl) {
            const split = new SplitType(nameEl as HTMLElement, {
              types: "chars",
            });
            if (split.chars) {
              gsap.from(split.chars, {
                y: "100%",
                opacity: 0,
                duration: 0.5,
                stagger: 0.03,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: section,
                  start: () =>
                    i === 0 ? "top 20%" : `top+=${i * 80}vh top`,
                  toggleActions: "play none none none",
                },
              });
            }
          }
        });
      } else {
        // Mobile: Simple stagger reveal
        const cards = container.querySelectorAll(".sport-card-mobile");
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const sports = SPORTS_CONTENT.sports;

  // Positions for sport names — alternating corners for asymmetry
  const positions = [
    "bottom-8 left-8",
    "top-8 right-8 text-right",
    "bottom-8 right-8 text-right",
    "top-8 left-8",
  ];

  return (
    <section
      ref={sectionRef}
      id="sports"
      className="relative overflow-hidden bg-offwhite"
    >
      {/* Section header */}
      <div className="relative z-10 px-6 pt-28 sm:pt-40 lg:px-12">
        <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-neon-dim">
          Beyond Golf
        </span>
        <h2 className="sports-heading font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-charcoal">
          {SPORTS_CONTENT.heading}
        </h2>
        <p className="mt-4 max-w-md text-sm text-charcoal/50">
          {SPORTS_CONTENT.subheading}
        </p>
      </div>

      {/* Desktop: Stacked cards */}
      <div
        ref={cardsContainerRef}
        className="relative mt-12 hidden md:block"
        style={{ height: "85vh" }}
      >
        {sports.map((sport, i) => (
          <div
            key={sport.slug}
            className="sport-card absolute inset-0 overflow-hidden rounded-xl mx-6 lg:mx-12"
            style={{ zIndex: sports.length - i }}
            data-cursor="explore"
          >
            {/* Background placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-charcoal/[0.06] to-charcoal/[0.15]">
              <div className="flex h-full w-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full border border-charcoal/10">
                    <span className="font-display text-3xl font-bold text-charcoal/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="text-xs text-charcoal/20">
                    {sport.name} Media
                  </p>
                </div>
              </div>
            </div>

            {/* Sport name — large, mix-blend-difference */}
            <div className={`absolute ${positions[i]} z-10 p-4`}>
              <h3 className="sport-name blend-difference font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.9] text-offwhite">
                {sport.name}
              </h3>
            </div>
          </div>
        ))}

        {/* Mobile cards — visible only on mobile */}
      </div>

      {/* Mobile: Vertical cards */}
      <div className="mt-8 space-y-4 px-6 pb-28 md:hidden" ref={!cardsContainerRef.current ? cardsContainerRef : undefined}>
        {sports.map((sport, i) => (
          <div
            key={sport.slug}
            className="sport-card-mobile relative overflow-hidden rounded-lg bg-charcoal/[0.04] p-6"
          >
            {/* Placeholder */}
            <div className="mb-4 aspect-[16/10] overflow-hidden rounded bg-charcoal/[0.06]">
              <div className="flex h-full w-full items-center justify-center">
                <p className="text-xs text-charcoal/20">{sport.name}</p>
              </div>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-dim">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-2xl font-bold uppercase text-charcoal">
              {sport.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
