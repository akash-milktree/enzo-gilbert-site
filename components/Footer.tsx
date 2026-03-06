"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Neon line draws across
      gsap.from(".footer-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: footer,
          start: "top 95%",
        },
      });

      // Content fades in
      gsap.from(".footer-content", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 95%",
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={footerRef} className="relative bg-charcoal pb-8 pt-0">
      {/* Neon line divider */}
      <div className="footer-line mx-6 h-[1px] bg-neon/30 lg:mx-12" />

      {/* Footer content — single row */}
      <div className="footer-content mx-auto max-w-[1400px] px-6 pt-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          {/* Copyright */}
          <p className="text-[10px] uppercase tracking-[0.2em] text-offwhite/25">
            {SITE.copyright}
          </p>

          {/* Social links inline */}
          <div className="flex items-center gap-6">
            <a
              href={SITE.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.2em] text-offwhite/25 transition-colors hover:text-neon"
            >
              YouTube
            </a>
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.2em] text-offwhite/25 transition-colors hover:text-neon"
            >
              Instagram
            </a>
            <a
              href={SITE.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-[0.2em] text-offwhite/25 transition-colors hover:text-neon"
            >
              TikTok
            </a>

            {/* Separator */}
            <span className="h-3 w-[1px] bg-offwhite/10" />

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-offwhite/25 transition-colors hover:text-neon"
            >
              Top
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
