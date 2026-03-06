"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  type?: "chars" | "words" | "lines";
  scrub?: boolean | number;
  stagger?: number;
  duration?: number;
  delay?: number;
  className?: string;
  start?: string;
  end?: string;
}

export default function TextReveal({
  children,
  as: Tag = "p",
  type = "lines",
  scrub = false,
  stagger = 0.08,
  duration = 0.8,
  delay = 0,
  className = "",
  start = "top 85%",
  end = "top 20%",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Split the text
    const split = new SplitType(ref.current, {
      types: type === "chars" ? "chars,words" : type,
    });
    splitRef.current = split;

    const targets =
      type === "chars" ? split.chars : type === "words" ? split.words : split.lines;

    if (!targets || targets.length === 0) return;

    // Wrap lines in overflow-hidden containers
    if (type === "lines") {
      targets.forEach((line) => {
        const wrapper = document.createElement("div");
        wrapper.style.overflow = "hidden";
        wrapper.style.display = "block";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      });
    }

    // Set initial state
    gsap.set(targets, {
      y: type === "chars" ? "100%" : "110%",
      opacity: 0,
    });

    // Animate
    gsap.to(targets, {
      y: "0%",
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: "power4.out",
      scrollTrigger: scrub
        ? {
            trigger: ref.current,
            start,
            end,
            scrub: typeof scrub === "number" ? scrub : 1,
          }
        : {
            trigger: ref.current,
            start,
            toggleActions: "play none none none",
          },
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, [children, type, scrub, stagger, duration, delay, start, end]);

  return (
    <Tag ref={ref as React.RefObject<HTMLElement & HTMLHeadingElement & HTMLParagraphElement>} className={className}>
      {children}
    </Tag>
  );
}
