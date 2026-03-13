"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";
import { ABOUT_CONTENT, MEDIA } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function MeetEnzo() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        /* ── DESKTOP: Scroll-pinned cinematic reveal ────────────── */

        // Initial states
        gsap.set(headingRef.current, { scale: 0.85, opacity: 0 });
        gsap.set(imageRef.current, {
          clipPath: "circle(0% at 50% 50%)",
          scale: 1.15,
        });
        gsap.set(".about-overlay", { opacity: 0 });
        gsap.set(".about-label", { opacity: 0, y: 20 });
        gsap.set(".about-line", { scaleX: 0, transformOrigin: "left center" });
        gsap.set(contentRef.current, { opacity: 0, y: 60 });
        gsap.set(quoteRef.current, { opacity: 0, y: 40 });

        // Pin
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=250%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        // Master timeline scrubbed to scroll
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=250%",
            scrub: 1,
          },
        });

        // Phase 1 (0→15%): Heading fades in + scales to 1
        tl.to(
          headingRef.current,
          { scale: 1, opacity: 1, duration: 0.15, ease: "none" },
          0
        );

        // Phase 2 (15→35%): Heading zooms through + dissolves
        tl.to(
          headingRef.current,
          { scale: 2.2, opacity: 0, duration: 0.2, ease: "none" },
          0.15
        );

        // Phase 3 (20→55%): Image circle expands + settles
        tl.to(
          imageRef.current,
          {
            clipPath: "circle(85% at 50% 50%)",
            scale: 1,
            duration: 0.35,
            ease: "none",
          },
          0.2
        );

        // Phase 3b: Gradient overlay fades in for text readability
        tl.to(
          ".about-overlay",
          { opacity: 1, duration: 0.2, ease: "none" },
          0.4
        );

        // Phase 4 (50→60%): Label + line
        tl.to(".about-label", { opacity: 1, y: 0, duration: 0.08 }, 0.5);
        tl.to(".about-line", { scaleX: 1, duration: 0.12 }, 0.52);

        // Phase 5 (55→75%): Content block
        tl.to(
          contentRef.current,
          { opacity: 1, y: 0, duration: 0.2, ease: "none" },
          0.55
        );

        // Phase 6 (72→88%): Quote
        tl.to(
          quoteRef.current,
          { opacity: 1, y: 0, duration: 0.16, ease: "none" },
          0.72
        );
      } else {
        /* ── MOBILE: Trigger-based reveals ──────────────────────── */

        gsap.fromTo(
          headingRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: section, start: "top 75%" },
          }
        );

        gsap.fromTo(
          imageRef.current,
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(80% at 50% 50%)",
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
          }
        );

        // SplitType line reveals for body text
        const paragraphs = contentRef.current?.querySelectorAll("[data-split]");
        paragraphs?.forEach((p) => {
          const split = new SplitType(p as HTMLElement, { types: "lines" });
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
              scrollTrigger: { trigger: p, start: "top 85%" },
            });
          }
        });

        gsap.from(".about-line", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".about-label", start: "top 85%" },
        });

        gsap.fromTo(
          quoteRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: quoteRef.current, start: "top 85%" },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen overflow-hidden bg-charcoal"
    >
      {/* ── Centered heading — zooms through on scroll ── */}
      <h2
        ref={headingRef}
        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center font-display text-[clamp(3rem,13vw,11rem)] font-bold uppercase tracking-tight text-offwhite"
      >
        {ABOUT_CONTENT.heading}
      </h2>

      {/* ── Portrait — revealed through circular mask ── */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-10"
        data-cursor="explore"
      >
        <Image
          src={MEDIA.portrait}
          alt="Enzo Gilbert"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* ── Gradient overlay — fades in for text readability ── */}
      <div className="about-overlay absolute inset-0 z-20 bg-linear-to-t from-charcoal via-charcoal/70 to-transparent" />

      {/* ── Bottom content panel ── */}
      <div className="absolute inset-0 z-30 flex items-end">
        <div className="w-full px-6 pb-10 sm:pb-14 lg:px-12 lg:pb-16">
          {/* Section label */}
          <div className="about-label mb-6 flex items-center gap-4">
            <div className="about-line h-px w-12 bg-neon" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neon">
              About
            </span>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:gap-20">
            {/* Body text */}
            <div ref={contentRef}>
              {ABOUT_CONTENT.body.map((paragraph, i) => (
                <p
                  key={i}
                  data-split
                  className="mb-4 text-sm leading-relaxed text-offwhite/60 last:mb-0 sm:text-base lg:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Pull quote */}
            <div ref={quoteRef} className="flex flex-col justify-end">
              <blockquote className="border-l-2 border-neon pl-6">
                <p className="font-display text-lg font-medium leading-snug text-offwhite sm:text-xl lg:text-2xl">
                  &ldquo;{ABOUT_CONTENT.quote}&rdquo;
                </p>
                <cite className="mt-3 block text-[10px] uppercase tracking-[0.3em] text-offwhite/30 not-italic">
                  — The Gilbert Family
                </cite>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
