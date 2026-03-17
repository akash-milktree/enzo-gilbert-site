"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPORTS_MEDIA } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function SportsShowcase() {
  const sportRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stripRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    let ctx: gsap.Context | null = null;

    /* Wait for all images/videos to load so scrollWidth is accurate */
    const container = document.getElementById("sports");
    const imgs = container
      ? Array.from(container.querySelectorAll("img, video"))
      : [];
    const loaded = imgs.map((el) => {
      if (el instanceof HTMLImageElement && el.complete) return Promise.resolve();
      if (el instanceof HTMLVideoElement && el.readyState >= 1)
        return Promise.resolve();
      return new Promise<void>((r) => {
        el.addEventListener("load", () => r(), { once: true });
        el.addEventListener("loadedmetadata", () => r(), { once: true });
        el.addEventListener("error", () => r(), { once: true });
      });
    });

    /* Start GSAP after media is ready (or after 2s timeout) */
    const init = () => {
      ctx = gsap.context(() => {
        if (!isMobile) {
          SPORTS_MEDIA.forEach((_sport, i) => {
            const section = sportRefs.current[i];
            const strip = stripRefs.current[i];
            const name = nameRefs.current[i];
            const progress = progressRefs.current[i];
            if (!section || !strip) return;

            const scrollWidth = strip.scrollWidth;
            const viewWidth = window.innerWidth;
            const distance = scrollWidth - viewWidth;

            /* 1.5x multiplier = slower, more deliberate scroll */
            const scrollEnd = Math.max(distance * 1.5, viewWidth);

            if (distance > 0) {
              /* ── Horizontal scroll tween ── */
              const scrollTween = gsap.to(strip, {
                x: -distance,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  pin: true,
                  start: "top top",
                  end: `+=${scrollEnd}`,
                  scrub: 1,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });

              /* ── Card entrance via containerAnimation ── */
              const cards =
                strip.querySelectorAll<HTMLElement>(".media-card");
              cards.forEach((card) => {
                gsap.fromTo(
                  card,
                  { opacity: 0, y: 40, scale: 0.92 },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: card,
                      containerAnimation: scrollTween,
                      start: "left 95%",
                      end: "left 65%",
                      scrub: true,
                    },
                  }
                );
              });
            } else {
              /* Few items — just pin briefly */
              ScrollTrigger.create({
                trigger: section,
                pin: true,
                start: "top top",
                end: `+=${viewWidth}`,
                anticipatePin: 1,
              });
            }

            /* ── Watermark drifts left and fades ── */
            if (name) {
              gsap.fromTo(
                name,
                { opacity: 0.1, x: 0 },
                {
                  opacity: 0.04,
                  x: -120,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: `+=${scrollEnd}`,
                    scrub: true,
                  },
                }
              );
            }

            /* ── Progress bar ── */
            if (progress) {
              gsap.fromTo(
                progress,
                { scaleX: 0, transformOrigin: "left center" },
                {
                  scaleX: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: `+=${scrollEnd}`,
                    scrub: true,
                  },
                }
              );
            }
          });
        }
      });
    };

    Promise.race([
      Promise.all(loaded),
      new Promise((r) => setTimeout(r, 2000)),
    ]).then(init);

    /* ── Video play/pause observer ── */
    const videos = document.querySelectorAll<HTMLVideoElement>(".sport-video");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );
    videos.forEach((v) => observer.observe(v));

    return () => {
      ctx?.revert();
      observer.disconnect();
    };
  }, []);

  return (
    <div id="sports">
      {/* ═══════ Title Section ═══════ */}
      <div className="flex min-h-[50vh] flex-col items-center justify-center bg-charcoal px-6">
        <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-neon">
          Multi-Sport Athlete
        </span>
        <h2 className="text-center font-display text-[clamp(2.5rem,8vw,6rem)] font-bold uppercase leading-[0.9] tracking-tight text-offwhite">
          Beyond the Green
        </h2>
        <p className="mt-4 max-w-md text-center text-sm text-offwhite/40">
          Golf is just the beginning. Enzo loves every sport he tries.
        </p>
      </div>

      {/* ═══════ Sport Sections — one pinned horizontal strip each ═══════ */}
      {SPORTS_MEDIA.map((sport, i) => (
        <div
          key={sport.slug}
          ref={(el) => {
            sportRefs.current[i] = el;
          }}
          className="relative overflow-hidden bg-charcoal"
        >
          {/* ── DESKTOP ── */}
          <div className="hidden md:block">
            {/* Watermark */}
            <h3
              ref={(el) => {
                nameRefs.current[i] = el;
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[clamp(8rem,22vw,20rem)] font-bold uppercase text-offwhite/10"
            >
              {sport.name}
            </h3>

            {/* Top bar */}
            <div className="absolute left-8 right-8 top-8 z-20 flex items-center justify-between lg:left-12 lg:right-12">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-neon" />
                <span className="font-display text-lg font-bold uppercase tracking-[0.3em] text-neon lg:text-2xl">
                  {sport.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-offwhite/30">
                  {sport.media.length} moments
                </span>
                <span className="font-display text-sm font-bold text-offwhite/20">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(SPORTS_MEDIA.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Horizontal media strip */}
            <div
              ref={(el) => {
                stripRefs.current[i] = el;
              }}
              className="flex h-screen items-center gap-5 pl-8 pr-[20vw] lg:gap-8 lg:pl-12"
            >
              {sport.media.map((item, j) => (
                  <div
                    key={j}
                    className={`media-card h-[72vh] shrink-0 overflow-hidden rounded-xl ${
                      item.type === "vimeo" ? "aspect-video" : ""
                    }`}
                    data-cursor="explore"
                  >
                    {item.type === "vimeo" ? (
                      <iframe
                        src={`https://player.vimeo.com/video/${item.src}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
                        className="pointer-events-none h-full w-full rounded-xl"
                        style={{ border: 0 }}
                        allow="autoplay; fullscreen"
                        loading="lazy"
                      />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.src}
                        alt={`${sport.name} ${j + 1}`}
                        className="h-full w-auto rounded-xl"
                      />
                    )}
                  </div>
                ))}
            </div>

            {/* Bottom progress bar */}
            <div className="absolute bottom-8 left-8 right-8 z-20 lg:left-12 lg:right-12">
              <div className="h-[2px] w-full overflow-hidden bg-offwhite/10">
                <div
                  ref={(el) => {
                    progressRefs.current[i] = el;
                  }}
                  className="h-full w-full bg-neon"
                />
              </div>
            </div>
          </div>

          {/* ── MOBILE ── */}
          <div className="px-6 py-12 md:hidden">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-neon">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="h-[1px] flex-1 bg-offwhite/10" />
            </div>
            <h3 className="mb-6 font-display text-3xl font-bold uppercase text-offwhite">
              {sport.name}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {sport.media.map((item, j) => (
                <div
                  key={j}
                  className={`relative overflow-hidden rounded-lg ${
                    j === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                  }`}
                >
                  {item.type === "vimeo" ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${item.src}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
                      className="pointer-events-none absolute inset-0 h-full w-full rounded-lg"
                      style={{ border: 0 }}
                      allow="autoplay; fullscreen"
                      loading="lazy"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.src}
                      alt={`${sport.name} ${j + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
