"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPORTS_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const SPORT_IMAGES = [
  { sport: "football", label: "Football Training", id: 1 },
  { sport: "football", label: "Match Day", id: 2 },
  { sport: "motocross", label: "First Ride", id: 3 },
  { sport: "motocross", label: "Track Day", id: 4 },
  { sport: "skiing", label: "On the Slopes", id: 5 },
  { sport: "skiing", label: "Learning to Ski", id: 6 },
  { sport: "karate", label: "Karate Practice", id: 7 },
  { sport: "karate", label: "Belt Ceremony", id: 8 },
];

export default function OtherSports() {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered =
    filter === "all"
      ? SPORT_IMAGES
      : SPORT_IMAGES.filter((img) => img.sport === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sport-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate on filter change
  useEffect(() => {
    if (gridRef.current) {
      gsap.from(gridRef.current.children, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      });
    }
  }, [filter]);

  return (
    <section
      ref={sectionRef}
      id="sports"
      className="relative overflow-hidden bg-offwhite py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.3em] text-neon-dim">
            Multi-Sport
          </span>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-charcoal sm:text-6xl">
            {SPORTS_CONTENT.heading}
          </h2>
          <p className="mt-4 text-lg text-charcoal/50">
            {SPORTS_CONTENT.subheading}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
              filter === "all"
                ? "bg-charcoal text-neon"
                : "bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"
            }`}
          >
            All
          </button>
          {SPORTS_CONTENT.sports.map((sport) => (
            <button
              key={sport.slug}
              onClick={() => setFilter(sport.slug)}
              className={`rounded-full px-5 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
                filter === sport.slug
                  ? "bg-charcoal text-neon"
                  : "bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10"
              }`}
            >
              {sport.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {filtered.map((item) => (
            <div
              key={item.id}
              className="sport-card group relative aspect-square overflow-hidden rounded-xl bg-charcoal/5"
            >
              {/* Placeholder */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal/5 to-charcoal/15 transition-transform duration-500 group-hover:scale-105">
                <div className="text-center">
                  <p className="font-display text-sm font-bold uppercase tracking-wider text-charcoal/30">
                    {item.sport}
                  </p>
                </div>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-wider text-neon">
                    {item.sport}
                  </p>
                  <p className="text-sm text-offwhite/80">{item.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
