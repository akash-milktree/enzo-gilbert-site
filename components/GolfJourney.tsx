"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { JOURNEY_CONTENT, MEDIA } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function GolfJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        // Horizontal scroll — pin section, translate track
        const slides = track.querySelectorAll(".journey-slide");
        const totalWidth = track.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(track, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: track,
            start: "top 10%",
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Progress bar synced to horizontal scroll
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${totalWidth}`,
            scrub: 1,
          },
        });

        // Text reveals per slide — triggered as each slide enters
        slides.forEach((slide) => {
          const textEls = slide.querySelectorAll("[data-split]");
          textEls.forEach((el) => {
            const split = new SplitType(el as HTMLElement, { types: "lines" });
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
                duration: 0.8,
                stagger: 0.08,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: scrollTween,
                  start: "left 70%",
                  toggleActions: "play none none none",
                },
              });
            }
          });

          // Milestone number scale-in
          const num = slide.querySelector(".milestone-num");
          if (num) {
            gsap.from(num, {
              scale: 0.5,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: scrollTween,
                start: "left 80%",
              },
            });
          }
        });
      } else {
        // Mobile — vertical stack with triggered reveals
        const cards = section.querySelectorAll(".journey-card");
        cards.forEach((card) => {
          gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          });
        });
      }

      // Section heading reveal
      const headingSplit = new SplitType(".journey-heading", {
        types: "chars",
      });
      if (headingSplit.chars) {
        gsap.from(headingSplit.chars, {
          y: 60,
          opacity: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".journey-heading",
            start: "top 85%",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const milestones = JOURNEY_CONTENT.milestones;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden bg-charcoal"
    >
      {/* Rotated section label — visible on desktop */}
      <div className="pointer-events-none absolute left-8 top-1/2 z-10 hidden -translate-y-1/2 -rotate-90 lg:block">
        <span className="whitespace-nowrap font-display text-[10px] font-bold uppercase tracking-[0.5em] text-offwhite/10">
          Enzo&apos;s Golf Journey
        </span>
      </div>

      {/* Heading — pinned at top on desktop */}
      <div className="relative z-10 px-6 pb-8 pt-28 sm:pt-40 lg:px-12">
        <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-neon-dim">
          Journey
        </span>
        <h2 className="journey-heading font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-offwhite">
          {JOURNEY_CONTENT.heading}
        </h2>
        <p className="mt-4 max-w-md text-sm text-offwhite/40">
          {JOURNEY_CONTENT.subheading}
        </p>
      </div>

      {/* Desktop: Horizontal scroll track */}
      <div className="hidden md:block">
        <div
          ref={trackRef}
          className="flex"
          style={{ width: `${milestones.length * 100}vw` }}
        >
          {milestones.map((m) => (
            <div
              key={m.id}
              className="journey-slide relative flex h-[80vh] w-screen flex-shrink-0 items-center px-12 lg:px-24"
            >
              {/* Giant milestone number — background */}
              <div className="milestone-num pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 select-none font-display text-[30vw] font-bold leading-none text-offwhite/[0.03]">
                {String(m.id).padStart(2, "0")}
              </div>

              {/* Media — left side */}
              <div className="relative mr-12 h-[65vh] w-[55%] shrink-0 overflow-hidden rounded-lg">
                {MEDIA.journey[m.id - 1]?.type === "video" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full rounded-lg object-cover"
                  >
                    <source src={MEDIA.journey[m.id - 1].src} type="video/mp4" />
                  </video>
                ) : (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={MEDIA.journey[m.id - 1]?.src ?? ""}
                    alt={m.caption}
                    className="absolute inset-0 h-full w-full rounded-lg object-cover"
                  />
                )}
              </div>

              {/* Text — right side */}
              <div className="relative z-10 max-w-md">
                <span className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.3em] text-neon/60">
                  Chapter {String(m.id).padStart(2, "0")}
                </span>
                <h3
                  data-split
                  className="font-display text-3xl font-bold uppercase leading-tight text-offwhite lg:text-4xl"
                >
                  {m.title}
                </h3>
                <p
                  data-split
                  className="mt-4 text-base leading-relaxed text-offwhite/50"
                >
                  {m.description}
                </p>
                <p className="mt-6 text-xs italic text-offwhite/30">
                  {m.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="fixed bottom-0 left-0 right-0 z-20 h-[2px] bg-offwhite/5">
          <div
            ref={progressRef}
            className="h-full origin-left bg-neon"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Mobile: Vertical cards */}
      <div className="space-y-8 px-6 pb-28 md:hidden">
        {milestones.map((m) => (
          <div
            key={m.id}
            className="journey-card relative overflow-hidden rounded-lg bg-offwhite/[0.04] p-6"
          >
            {/* Background number */}
            <span className="absolute -right-4 -top-6 select-none font-display text-[8rem] font-bold leading-none text-offwhite/[0.03]">
              {String(m.id).padStart(2, "0")}
            </span>

            {/* Media */}
            <div className="relative mb-6 aspect-video overflow-hidden rounded-lg">
              {MEDIA.journey[m.id - 1]?.type === "video" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full rounded-lg object-cover"
                >
                  <source src={MEDIA.journey[m.id - 1].src} type="video/mp4" />
                </video>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={MEDIA.journey[m.id - 1]?.src ?? ""}
                  alt={m.caption}
                  className="h-full w-full rounded-lg object-cover"
                />
              )}
            </div>

            <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.3em] text-neon/60">
              Chapter {String(m.id).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl font-bold uppercase text-offwhite">
              {m.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-offwhite/50">
              {m.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
