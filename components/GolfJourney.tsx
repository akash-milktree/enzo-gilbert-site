"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function GolfJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the timeline line
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      // Animate each milestone card
      gsap.utils.toArray<HTMLElement>(".milestone-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.05,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative overflow-hidden bg-charcoal py-28 sm:py-36"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-neon/3 blur-[200px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-neon">
            The Journey
          </span>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-offwhite sm:text-6xl">
            {JOURNEY_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg italic text-offwhite/50">
            {JOURNEY_CONTENT.subheading}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-neon via-neon/50 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-16 md:space-y-24">
            {JOURNEY_CONTENT.milestones.map((milestone, i) => (
              <div
                key={milestone.id}
                className={`milestone-card relative flex flex-col gap-6 pl-16 md:flex-row md:items-center md:gap-12 md:pl-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot on timeline */}
                <div className="absolute left-4 top-2 z-10 h-5 w-5 rounded-full border-[3px] border-neon bg-charcoal md:left-1/2 md:-translate-x-1/2">
                  <div className="absolute inset-0 animate-ping rounded-full bg-neon/20" />
                </div>

                {/* Video/Image placeholder */}
                <div className="w-full md:w-1/2">
                  <div className="aspect-video overflow-hidden rounded-xl bg-graphite">
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal to-graphite">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-neon/30"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="mt-2 text-xs text-offwhite/30">
                          Video thumbnail
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-1/2 ${
                    i % 2 === 0 ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <span className="inline-block rounded-full bg-neon/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-neon">
                    {String(milestone.id).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-offwhite sm:text-3xl">
                    {milestone.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-offwhite/60">
                    {milestone.description}
                  </p>
                  <p className="mt-4 text-sm italic text-neon/70">
                    &ldquo;{milestone.caption}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
