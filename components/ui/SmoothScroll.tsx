"use client";

import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenisScroll() {
  return useContext(LenisContext);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Critical: sync Lenis with GSAP ScrollTrigger to prevent pin jitter
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);

      // Handle anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const href = (e.currentTarget as HTMLAnchorElement).getAttribute(
            "href"
          );
          if (href) {
            const target = document.querySelector(href);
            if (target) {
              lenis.scrollTo(target as HTMLElement, { offset: -80 });
            }
          }
        });
      });

      return () => {
        lenis.destroy();
      };
    } catch (err) {
      console.error("Lenis initialization failed:", err);
    }
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}
