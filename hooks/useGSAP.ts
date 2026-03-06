"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGSAP(
  callback: () => (() => void) | void,
  deps: React.DependencyList = []
) {
  const scope = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context(() => {
      callback();
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}

export function useScrollTriggerRefresh() {
  return useCallback(() => {
    ScrollTrigger.refresh();
  }, []);
}
