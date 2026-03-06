"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ABOUT_CONTENT } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function MeetEnzo() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      // Image clip-path reveal — wipes open from left
      gsap.fromTo(
        imageRef.current,
        { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: isMobile ? 1 : undefined,
          ease: isMobile ? "power3.inOut" : "none",
          scrollTrigger: isMobile
            ? { trigger: section, start: "top 75%" }
            : { trigger: section, start: "top 60%", end: "top 10%", scrub: 1 },
        }
      );

      // Split and reveal each text paragraph by lines
      const paragraphs = textRef.current?.querySelectorAll("[data-split]");
      paragraphs?.forEach((p) => {
        const split = new SplitType(p as HTMLElement, { types: "lines" });
        if (split.lines) {
          // Wrap each line for overflow hidden
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
            scrollTrigger: {
              trigger: p,
              start: "top 85%",
            },
          });
        }
      });

      // Heading reveal
      gsap.from(".about-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: section, start: "top 70%" },
      });

      // Quote neon line draw
      gsap.from(".quote-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: { trigger: ".about-quote", start: "top 85%" },
      });

      gsap.from(".about-quote", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-quote", start: "top 85%" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-offwhite py-28 sm:py-40"
    >
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-0">
          {/* Text — left side, overlaps image on desktop */}
          <div
            ref={textRef}
            className="relative z-10 md:col-span-5 md:col-start-1 md:pr-0"
          >
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-neon-dim">
              About
            </span>
            <h2 className="about-heading font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-charcoal">
              {ABOUT_CONTENT.heading}
            </h2>

            <div className="mt-8 space-y-4">
              {ABOUT_CONTENT.body.map((paragraph, i) => (
                <p
                  key={i}
                  data-split
                  className="text-base leading-relaxed text-charcoal/65 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Pull quote */}
            <div className="about-quote mt-10">
              <div className="quote-line mb-4 h-[2px] w-12 bg-neon" />
              <blockquote className="font-display text-lg font-medium italic leading-snug text-charcoal sm:text-xl">
                &ldquo;{ABOUT_CONTENT.quote}&rdquo;
              </blockquote>
              <cite className="mt-2 block text-xs uppercase tracking-[0.2em] text-charcoal/40 not-italic">
                The Gilbert Family
              </cite>
            </div>
          </div>

          {/* Image — right side, bleeds past container on desktop */}
          <div className="md:col-span-8 md:col-start-5 md:-mr-12">
            <div
              ref={imageRef}
              className="clip-left aspect-[3/4] overflow-hidden rounded-lg bg-charcoal/10 md:aspect-[4/5]"
              data-cursor="explore"
            >
              {/* Image placeholder */}
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal/[0.04] to-charcoal/[0.12]">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full border border-charcoal/15">
                    <span className="font-display text-xl font-bold text-charcoal/20">
                      EG
                    </span>
                  </div>
                  <p className="text-xs text-charcoal/25">Portrait of Enzo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
