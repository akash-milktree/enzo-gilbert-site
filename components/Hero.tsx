"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.from(headlineRef.current, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    })
      .from(
        taglineRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        subRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .from(
        ctaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2"
      );

    // Parallax on scroll
    gsap.to(".hero-video", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <div className="hero-video absolute inset-0 z-0">
        {/* Placeholder gradient until real video is added */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-graphite to-charcoal" />
        {/*
          When video is ready, uncomment:
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/media/hero-video.mp4" type="video/mp4" />
          </video>
        */}
        {/* Animated placeholder shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 h-[800px] w-[800px] rounded-full bg-neon/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-neon/3 blur-3xl" />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30" />

      {/* Content */}
      <div className="relative z-[2] mx-auto max-w-7xl px-6 text-center lg:px-12">
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter text-offwhite"
        >
          {HERO_CONTENT.headline}
        </h1>

        <p
          ref={taglineRef}
          className="mt-4 font-display text-[clamp(1rem,2.5vw,1.5rem)] font-medium uppercase tracking-[0.3em] text-neon"
        >
          {HERO_CONTENT.tagline}
        </p>

        <p
          ref={subRef}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-offwhite/70 sm:text-lg"
        >
          {HERO_CONTENT.subheadline}
        </p>

        <a
          ref={ctaRef}
          href="#journey"
          className="magnetic-btn mt-10 inline-flex items-center gap-2 rounded-full border-2 border-neon bg-transparent px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-neon transition-all duration-300 hover:bg-neon hover:text-charcoal"
        >
          {HERO_CONTENT.cta}
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
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-offwhite/40">
            Scroll
          </span>
          <div className="h-12 w-[1px] overflow-hidden bg-offwhite/10">
            <div className="h-full w-full animate-pulse bg-neon" />
          </div>
        </div>
      </div>
    </section>
  );
}
