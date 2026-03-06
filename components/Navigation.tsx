"use client";

import { useState, useEffect } from "react";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Social strip */}
      <div
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-6 py-2 text-xs tracking-widest uppercase transition-all duration-500 ${
          scrolled
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        } bg-graphite/80 backdrop-blur-sm`}
      >
        <a
          href={SITE.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-offwhite/60 transition-colors hover:text-neon"
        >
          YouTube
        </a>
        <span className="text-offwhite/20">|</span>
        <a
          href={SITE.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-offwhite/60 transition-colors hover:text-neon"
        >
          Instagram
        </a>
        <span className="text-offwhite/20">|</span>
        <a
          href={SITE.social.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          className="text-offwhite/60 transition-colors hover:text-neon"
        >
          TikTok
        </a>
      </div>

      {/* Main nav */}
      <header
        className={`fixed left-0 right-0 z-[90] transition-all duration-500 ${
          scrolled
            ? "top-0 bg-charcoal/90 backdrop-blur-xl shadow-lg shadow-black/10"
            : "top-8 bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-neon font-display text-sm font-bold text-neon transition-all group-hover:bg-neon group-hover:text-charcoal">
              EG
            </div>
            <span className="hidden font-display text-lg font-bold tracking-wider text-offwhite sm:block">
              ENZO GILBERT
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm tracking-wide text-offwhite/70 transition-colors hover:text-offwhite"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-neon transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20 text-offwhite md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-[2px] w-5 bg-offwhite transition-all duration-300 ${
                  menuOpen ? "translate-y-[4px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-5 bg-offwhite transition-all duration-300 ${
                  menuOpen ? "-translate-y-[4px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[85] flex flex-col items-center justify-center gap-8 bg-charcoal transition-all duration-500 ${
          menuOpen
            ? "visible opacity-100"
            : "invisible opacity-0 pointer-events-none"
        }`}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-display text-3xl font-bold uppercase tracking-wider text-offwhite transition-colors hover:text-neon"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {link.label}
          </a>
        ))}
        <div className="mt-8 flex gap-6">
          <a
            href={SITE.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-offwhite/60 hover:text-neon"
          >
            YouTube
          </a>
          <a
            href={SITE.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-offwhite/60 hover:text-neon"
          >
            Instagram
          </a>
          <a
            href={SITE.social.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-offwhite/60 hover:text-neon"
          >
            TikTok
          </a>
        </div>
      </div>
    </>
  );
}
