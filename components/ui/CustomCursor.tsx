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

    // Context-aware hover states
    const expandCursor = (text: string) => {
      cursor.classList.add("expanded");
      label.textContent = text;
    };

    const shrinkCursor = () => {
      cursor.classList.remove("expanded");
      label.textContent = "";
    };

    const attachHoverListeners = () => {
      // Interactive elements — show "VIEW"
      document
        .querySelectorAll("a, button, [role='button']")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => expandCursor("View"));
          el.addEventListener("mouseleave", shrinkCursor);
        });

      // Images — show "EXPLORE"
      document
        .querySelectorAll("[data-cursor='explore']")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => expandCursor("Explore"));
          el.addEventListener("mouseleave", shrinkCursor);
        });

      // Draggable areas — show "DRAG"
      document
        .querySelectorAll("[data-cursor='drag']")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => expandCursor("Drag"));
          el.addEventListener("mouseleave", shrinkCursor);
        });

      // Form inputs — hide cursor
      document
        .querySelectorAll("input, textarea, select")
        .forEach((el) => {
          el.addEventListener("mouseenter", () => {
            cursor.style.opacity = "0";
          });
          el.addEventListener("mouseleave", () => {
            cursor.style.opacity = "1";
          });
        });
    };

    attachHoverListeners();

    // Re-attach for dynamic elements
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
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
