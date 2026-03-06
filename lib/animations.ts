import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function fadeUp(
  element: string | Element | Element[],
  trigger?: string | Element,
  options?: { delay?: number; duration?: number; y?: number; stagger?: number }
) {
  return gsap.from(element, {
    y: options?.y ?? 60,
    opacity: 0,
    duration: options?.duration ?? 1,
    delay: options?.delay ?? 0,
    stagger: options?.stagger ?? 0.15,
    ease: "power3.out",
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        }
      : undefined,
  });
}

export function scaleIn(
  element: string | Element,
  trigger?: string | Element
) {
  return gsap.from(element, {
    scale: 0.85,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      : undefined,
  });
}

export function revealFromLeft(
  element: string | Element,
  trigger?: string | Element
) {
  return gsap.from(element, {
    x: -80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      : undefined,
  });
}

export function revealFromRight(
  element: string | Element,
  trigger?: string | Element
) {
  return gsap.from(element, {
    x: 80,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      : undefined,
  });
}

export function drawLine(
  element: string | Element,
  trigger?: string | Element
) {
  return gsap.from(element, {
    scaleY: 0,
    transformOrigin: "top center",
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        }
      : undefined,
  });
}

export function staggerReveal(
  elements: string | Element[],
  trigger?: string | Element
) {
  return gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: trigger
      ? {
          trigger,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      : undefined,
  });
}

export function parallax(
  element: string | Element,
  speed: number = 0.3,
  trigger?: string | Element
) {
  return gsap.to(element, {
    yPercent: speed * 100,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
