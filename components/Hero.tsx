"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { HERO_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      // Set initial hidden state
      gsap.set(title, { y: 60, opacity: 0 });
      gsap.set(".hero-tagline", { y: 30, opacity: 0 });
      gsap.set(".hero-stat", { y: 20, opacity: 0 });
      gsap.set(".hero-scroll", { opacity: 0 });

      // Entrance animation
      const tl = gsap.timeline({ delay: 2.8 }); // After preloader

      tl.to(title, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
      })
        .to(
          ".hero-tagline",
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .to(
          ".hero-stat",
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .to(
          ".hero-scroll",
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.2"
        );

      if (!isMobile) {
        // Pin hero and zoom text on scroll
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Text zoom + spread on scroll — use fromTo to lock start values
        gsap.fromTo(
          title,
          { scale: 1, letterSpacing: "0em", opacity: 1 },
          {
            scale: 1.4,
            letterSpacing: "0.15em",
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=100%",
              scrub: 1,
            },
          }
        );

        // Tagline fades out
        gsap.fromTo(
          ".hero-tagline",
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=60%",
              scrub: 1,
            },
          }
        );

        // Background parallax
        gsap.to(bgRef.current, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=200%",
            scrub: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Background — video/image placeholder */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-charcoal" />
        <Image
          src="/media/organised/hero background.webp"
          alt="Enzo Gilbert"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

      {/* Content — asymmetric layout, fills viewport */}
      <div className="relative z-[2] flex min-h-screen w-full flex-col justify-center px-6 lg:px-12">
        {/* Main headline — bleeds off left, massive display */}
        <h1
          ref={titleRef}
          className="blend-difference -ml-[0.05em] font-display text-[clamp(4rem,15vw,13rem)] font-bold uppercase leading-[0.85] tracking-tight text-offwhite"
        >
          {HERO_CONTENT.headline}
        </h1>

        {/* Bottom bar — tagline left, stat right */}
        <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between sm:bottom-12 lg:left-12 lg:right-12">
          <div className="hero-tagline">
            <p className="font-display text-[10px] font-medium uppercase tracking-[0.3em] text-neon sm:text-xs sm:tracking-[0.4em]">
              {HERO_CONTENT.tagline}
            </p>
          </div>

          <div className="hero-stat hidden sm:block">
            <p className="text-right font-display text-xs uppercase tracking-[0.3em] text-offwhite/40">
              <span className="block text-2xl font-bold text-neon">04</span>
              Years Old
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 sm:bottom-12">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/30">
              Scroll
            </span>
            <div className="h-12 w-[1px] bg-offwhite/10 sm:h-16">
              <div className="h-1/3 w-full animate-[scrollPulse_2s_ease-in-out_infinite] bg-neon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
