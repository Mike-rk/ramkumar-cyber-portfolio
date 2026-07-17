"use client";

import { useEffect, useRef } from "react";

const REVEAL_SELECTOR = [
  ".section-heading",
  ".credential-heading",
  ".project-card",
  ".skill-card",
  ".method-strip",
  ".credential-grid article",
  ".lab-profile-card",
  ".challenge-copy",
  ".game-card",
  ".about-statement",
  ".timeline article",
  ".value-heading",
  ".value-intro",
  ".value-grid article",
  ".contact-section > *",
  "footer > *",
].join(",");

export default function ScrollAnimations() {
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    targets.forEach((target) => {
      const matchingSiblings = target.parentElement
        ? Array.from(target.parentElement.children).filter((sibling) => sibling.matches(REVEAL_SELECTOR))
        : [];
      const order = Math.max(0, matchingSiblings.indexOf(target));

      target.classList.add("scroll-reveal");
      target.style.setProperty("--reveal-delay", `${Math.min(order, 5) * 75}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    if (reducedMotion.matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
    } else {
      root.classList.add("motion-ready");
      targets.forEach((target) => observer.observe(target));
    }

    let frame = 0;
    const updateScrollEffects = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
        const heroShift = Math.min(window.scrollY * 0.08, 56);

        progressRef.current?.style.setProperty("--scroll-progress", String(progress));
        root.style.setProperty("--hero-shift", `${heroShift}px`);
        frame = 0;
      });
    };

    updateScrollEffects();
    window.addEventListener("scroll", updateScrollEffects, { passive: true });
    window.addEventListener("resize", updateScrollEffects);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollEffects);
      window.removeEventListener("resize", updateScrollEffects);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
      root.style.removeProperty("--hero-shift");
      targets.forEach((target) => {
        target.classList.remove("scroll-reveal", "is-visible");
        target.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={progressRef} />
    </div>
  );
}
