"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { NAV_LINKS } from "@/lib/constants";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animate menu open/close
  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, {
        clipPath: "circle(150% at calc(100% - 40px) 40px)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.from(linksRef.current.children, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.3,
      });
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        clipPath: "circle(0% at calc(100% - 40px) 40px)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [menuOpen]);

  return (
    <>
      {/* Minimal fixed nav */}
      <header
        className={`fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-6 py-5 transition-all duration-500 lg:px-12 ${
          scrolled ? "bg-charcoal/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="/" className="relative z-[110]">
          <Image
            src="/media/organised/logos/color-logo-white.svg"
            alt="Enzo Gilbert"
            width={120}
            height={24}
            className="h-6 w-auto"
            priority
          />
        </a>

        {/* Menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-[110] flex h-10 w-10 flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] w-6 bg-offwhite transition-all duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-offwhite transition-all duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </header>

      {/* Full-screen menu overlay — circular reveal */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[105] bg-charcoal"
        style={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
      >
        <div
          ref={linksRef}
          className="flex h-full flex-col items-start justify-center gap-4 px-8 sm:gap-6 sm:px-16 lg:px-24"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="group block"
            >
              <span className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase leading-[1.1] text-offwhite transition-colors duration-300 group-hover:text-neon">
                {link.label}
              </span>
            </a>
          ))}

          {/* Social links at bottom */}
          <div className="mt-8 flex gap-8 border-t border-offwhite/10 pt-8">
            <a
              href="https://youtube.com/@enzogilbert"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-offwhite/40 transition-colors hover:text-neon"
            >
              YouTube
            </a>
            <a
              href="https://instagram.com/enzogilbert"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-offwhite/40 transition-colors hover:text-neon"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@enzogilbert"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-offwhite/40 transition-colors hover:text-neon"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
