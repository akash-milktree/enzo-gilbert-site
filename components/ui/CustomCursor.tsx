"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor || !label) return;

    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      cursor.style.display = "none";
      return;
    }

    // Smooth cursor tracking with gsap.quickTo
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.4,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.4,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    document.addEventListener("mousemove", moveCursor);

    // Context-aware hover states via event delegation (no MutationObserver)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest(
        "a, button, [role='button'], [data-cursor], input, textarea, select"
      );
      if (!el) return;

      if (el.matches("input, textarea, select")) {
        cursor.style.opacity = "0";
      } else if (el.matches("[data-cursor='explore']")) {
        cursor.classList.add("expanded");
        label.textContent = "Explore";
      } else if (el.matches("[data-cursor='drag']")) {
        cursor.classList.add("expanded");
        label.textContent = "Drag";
      } else if (el.matches("a, button, [role='button']")) {
        cursor.classList.add("expanded");
        label.textContent = "View";
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const el = target.closest(
        "a, button, [role='button'], [data-cursor], input, textarea, select"
      );
      if (!el) return;

      if (el.matches("input, textarea, select")) {
        cursor.style.opacity = "1";
      } else {
        cursor.classList.remove("expanded");
        label.textContent = "";
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
