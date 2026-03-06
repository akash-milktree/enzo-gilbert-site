"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onComplete?.();
      },
    });

    // Stagger each character in
    tl.from(".preloader-char", {
      y: "110%",
      duration: 0.6,
      stagger: 0.06,
      ease: "power4.out",
    })
      // Draw the neon line
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.2"
      )
      // Hold briefly
      .to({}, { duration: 0.4 })
      // Slide overlay up
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
      });
  }, [onComplete]);

  if (!visible) return null;

  const letters = "ENZO".split("");

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-charcoal"
    >
      {/* Animated text */}
      <div ref={textRef} className="overflow-hidden">
        <div className="flex">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="preloader-char inline-block font-display text-[15vw] font-bold uppercase leading-none text-offwhite"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Neon line */}
      <div
        ref={lineRef}
        className="mt-6 h-[2px] w-24 origin-left scale-x-0 bg-neon"
      />
    </div>
  );
}
