"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SPORTS_CONTENT } from "@/lib/constants";

const SPORT_IMAGES = [
  "/media/beyond green/football/IMG_6780.jpeg",
  "/media/beyond green/motocross/IMG_0438.jpeg",
  "/media/beyond green/skiing/IMG_1309.jpeg",
  "/media/beyond green/karate/5ab00c87-184b-4142-8346-f7d83e93c915.jpg",
];

gsap.registerPlugin(ScrollTrigger);

export default function SportsShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        /* ── DESKTOP: Full-viewport scroll-pinned sport panels ── */
        const panels = panelsRef.current;
        if (!panels) return;

        const sportPanels =
          panels.querySelectorAll<HTMLElement>(".sport-panel");
        const totalPanels = sportPanels.length;
        // Title phase + one phase per panel transition (3 transitions) + hold
        const scrollLength = (totalPanels + 1) * 100;

        // Initial states
        gsap.set(titleRef.current, { opacity: 1, y: 0 });
        gsap.set(progressRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
        });

        // All panels except first start hidden (bottom-up wipe)
        sportPanels.forEach((panel, i) => {
          if (i > 0) {
            gsap.set(panel, {
              clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
            });
          }
          // Sport names start hidden
          const name = panel.querySelector(".sport-name");
          const num = panel.querySelector(".sport-num");
          if (name) gsap.set(name, { y: 50, opacity: 0 });
          if (num) gsap.set(num, { opacity: 0 });
        });

        // Pin
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${scrollLength}vh`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Master scrubbed timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${scrollLength}vh`,
            scrub: 1,
          },
        });

        const phase = 1 / (totalPanels + 1);

        // ── Title phase (0 → phase) ──
        // Title stays, then fades out
        tl.to(
          titleRef.current,
          { opacity: 0, y: -50, duration: phase * 0.5, ease: "none" },
          phase * 0.5
        );

        // First panel's name + number reveal as title fades
        const firstName = sportPanels[0]?.querySelector(".sport-name");
        const firstNum = sportPanels[0]?.querySelector(".sport-num");
        if (firstName) {
          tl.to(
            firstName,
            { y: 0, opacity: 1, duration: phase * 0.4, ease: "none" },
            phase * 0.6
          );
        }
        if (firstNum) {
          tl.to(
            firstNum,
            { opacity: 1, duration: phase * 0.3, ease: "none" },
            phase * 0.7
          );
        }

        // ── Sport panel transitions ──
        for (let i = 1; i < totalPanels; i++) {
          const panel = sportPanels[i];
          const startTime = (i + 0.3) * phase;

          // Previous panel's text fades out
          const prevName = sportPanels[i - 1]?.querySelector(".sport-name");
          const prevNum = sportPanels[i - 1]?.querySelector(".sport-num");
          if (prevName) {
            tl.to(
              prevName,
              { y: -30, opacity: 0, duration: phase * 0.3, ease: "none" },
              startTime
            );
          }
          if (prevNum) {
            tl.to(
              prevNum,
              { opacity: 0, duration: phase * 0.2, ease: "none" },
              startTime
            );
          }

          // Panel wipes upward
          tl.to(
            panel,
            {
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: phase * 0.7,
              ease: "none",
            },
            startTime + phase * 0.1
          );

          // New panel's text reveals
          const name = panel.querySelector(".sport-name");
          const num = panel.querySelector(".sport-num");
          if (name) {
            tl.to(
              name,
              { y: 0, opacity: 1, duration: phase * 0.3, ease: "none" },
              startTime + phase * 0.6
            );
          }
          if (num) {
            tl.to(
              num,
              { opacity: 1, duration: phase * 0.2, ease: "none" },
              startTime + phase * 0.7
            );
          }
        }

        // ── Progress bar fills across entire timeline ──
        tl.to(progressRef.current, { scaleY: 1, duration: 1, ease: "none" }, 0);

        // ── Counter updates ──
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: `+=${scrollLength}vh`,
          scrub: true,
          onUpdate: (self) => {
            if (!counterRef.current) return;
            const p = self.progress;
            const sportProgress = Math.max(0, (p - phase) / (1 - phase));
            const idx = Math.min(
              Math.floor(sportProgress * totalPanels),
              totalPanels - 1
            );
            counterRef.current.textContent = String(idx + 1).padStart(2, "0");
          },
        });
      } else {
        /* ── MOBILE: Simple card reveals ── */
        gsap.from(".sports-heading-mobile", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        });

        const cards = section.querySelectorAll(".sport-card-mobile");
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cards[0] || section,
            start: "top 80%",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const sports = SPORTS_CONTENT.sports;

  // Alternate text positions for visual rhythm
  const namePositions = [
    "bottom-10 left-6 lg:bottom-16 lg:left-12",
    "bottom-10 right-6 lg:bottom-16 lg:right-12 text-right",
    "bottom-10 left-6 lg:bottom-16 lg:left-12",
    "bottom-10 right-6 lg:bottom-16 lg:right-12 text-right",
  ];

  const numPositions = [
    "justify-end",
    "justify-start",
    "justify-end",
    "justify-start",
  ];

  return (
    <section
      ref={sectionRef}
      id="sports"
      className="relative overflow-hidden bg-charcoal"
    >
      {/* ═══════ DESKTOP ═══════ */}
      <div className="relative hidden min-h-screen md:block">
        {/* Title card — centered, fades out on scroll */}
        <div
          ref={titleRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
        >
          <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-neon">
            Beyond Golf
          </span>
          <h2 className="text-center font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-offwhite">
            {SPORTS_CONTENT.heading}
          </h2>
          <p className="mt-4 max-w-md text-center text-sm text-offwhite/40">
            {SPORTS_CONTENT.subheading}
          </p>
        </div>

        {/* Stacked sport panels */}
        <div ref={panelsRef} className="absolute inset-0">
          {sports.map((sport, i) => (
            <div
              key={sport.slug}
              className="sport-panel absolute inset-0"
              style={{ zIndex: i + 1 }}
              data-cursor="explore"
            >
              {/* Full-bleed image */}
              <div className="absolute inset-0">
                <Image
                  src={SPORT_IMAGES[i]}
                  alt={sport.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-charcoal/40" />
              </div>

              {/* Sport name — oversized display type */}
              <div className={`absolute z-10 ${namePositions[i]}`}>
                <h3 className="sport-name font-display text-[clamp(3rem,11vw,10rem)] font-bold uppercase leading-[0.85] text-offwhite">
                  {sport.name}
                </h3>
              </div>

              {/* Index counter — opposite side of name */}
              <div className="absolute bottom-10 left-6 right-6 z-10 lg:bottom-16 lg:left-12 lg:right-12">
                <div className={`flex ${numPositions[i]}`}>
                  <span className="sport-num font-display text-sm font-bold uppercase tracking-wider text-offwhite/20">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(sports.length).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right-side progress indicator */}
        <div className="absolute right-6 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-3 lg:right-12">
          <span
            ref={counterRef}
            className="font-display text-4xl font-bold text-neon lg:text-5xl"
          >
            01
          </span>
          <div className="relative h-20 w-[2px] overflow-hidden bg-offwhite/10 lg:h-28">
            <div ref={progressRef} className="absolute inset-0 bg-neon" />
          </div>
          <span className="font-display text-xs font-bold text-offwhite/20">
            {String(sports.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ═══════ MOBILE ═══════ */}
      <div className="px-6 py-20 md:hidden">
        <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-neon">
          Beyond Golf
        </span>
        <h2 className="sports-heading-mobile mb-8 font-display text-[clamp(2rem,8vw,3rem)] font-bold uppercase leading-[0.95] tracking-tight text-offwhite">
          {SPORTS_CONTENT.heading}
        </h2>

        <div className="space-y-4">
          {sports.map((sport, i) => (
            <div
              key={sport.slug}
              className="sport-card-mobile relative overflow-hidden rounded-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={SPORT_IMAGES[i]}
                  alt={sport.name}
                  fill
                  className="object-cover"
                  sizes="90vw"
                />
                <div className="absolute inset-0 bg-charcoal/30" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-offwhite">
                  {sport.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
