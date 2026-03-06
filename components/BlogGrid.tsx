"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BLOG_POSTS } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function BlogGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-card", {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative overflow-hidden bg-offwhite py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-neon-dim">
              Updates
            </span>
            <h2 className="font-display text-4xl font-black uppercase tracking-tight text-charcoal sm:text-5xl">
              Blog & News
            </h2>
          </div>
          <a
            href="/blog"
            className="text-sm font-bold uppercase tracking-wider text-charcoal/60 transition-colors hover:text-charcoal"
          >
            View All →
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              className="blog-card group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden bg-charcoal/5">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal/5 to-charcoal/15 transition-transform duration-500 group-hover:scale-105">
                  <svg
                    className="h-10 w-10 text-charcoal/15"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <time className="text-xs font-medium uppercase tracking-wider text-charcoal/40">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h3 className="mt-2 font-display text-lg font-bold text-charcoal transition-colors group-hover:text-neon-dim">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-sm font-bold uppercase tracking-wider text-neon-dim transition-all group-hover:translate-x-1">
                  Read More →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
