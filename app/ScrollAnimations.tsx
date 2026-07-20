"use client";

/* eslint-disable @next/next/no-img-element -- the same local portrait is reused for the scroll dock animation */

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
].join(",");

const MOTION_CARD_SELECTOR = [
  ".signal-card",
  ".project-card",
  ".skill-card",
  ".credential-grid article",
  ".lab-profile-card",
  ".game-card",
  ".timeline article",
  ".target-role-box",
  ".value-grid article",
].join(",");

const MAGNETIC_SELECTOR = ".button, .nav-cta";
const HEADING_CURSOR_SELECTOR = "h1, h2";

export default function ScrollAnimations() {
  const progressRef = useRef<HTMLSpanElement>(null);
  const cursorRingRef = useRef<HTMLSpanElement>(null);
  const profileDockRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const motionCards = Array.from(document.querySelectorAll<HTMLElement>(MOTION_CARD_SELECTOR));
    const magneticTargets = Array.from(document.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR));
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count-to]"));
    const topbar = document.querySelector<HTMLElement>(".topbar");
    const signalCard = document.querySelector<HTMLElement>(".signal-card");
    const profileVisual = document.querySelector<HTMLElement>(".profile-visual");
    const profileSource = profileVisual?.querySelector<HTMLImageElement>("img") ?? null;
    const brandMark = document.querySelector<HTMLElement>(".topbar .brand-mark");
    const profileDock = profileDockRef.current;

    targets.forEach((target) => {
      const matchingSiblings = target.parentElement
        ? Array.from(target.parentElement.children).filter((sibling) => sibling.matches(REVEAL_SELECTOR))
        : [];
      const order = Math.max(0, matchingSiblings.indexOf(target));

      target.classList.add("scroll-reveal");
      target.style.setProperty("--reveal-delay", `${Math.min(order, 5) * 82}ms`);
    });

    motionCards.forEach((card) => card.classList.add("motion-card"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            return;
          }

          const exitedAboveViewport = entry.boundingClientRect.top < 0;
          entry.target.classList.toggle("reveal-from-top", exitedAboveViewport);
          entry.target.classList.remove("is-visible");
        });
      },
      { threshold: 0.13, rootMargin: "-4% 0px -10% 0px" },
    );

    if (reducedMotion.matches) {
      targets.forEach((target) => target.classList.add("is-visible"));
    } else {
      root.classList.add("motion-ready");
      targets.forEach((target) => observer.observe(target));
    }

    const counterFrames = new Map<HTMLElement, number>();
    const renderCounter = (counter: HTMLElement, value: number) => {
      const prefix = counter.dataset.countPrefix ?? "";
      const suffix = counter.dataset.countSuffix ?? "";
      counter.textContent = `${prefix}${value}${suffix}`;
    };
    const resetCounter = (counter: HTMLElement) => renderCounter(counter, 0);
    const animateCounter = (counter: HTMLElement) => {
      const previousFrame = counterFrames.get(counter);
      if (previousFrame) window.cancelAnimationFrame(previousFrame);

      const target = Number(counter.dataset.countTo ?? 0);
      const duration = Math.min(1450, 850 + target * 6);
      const startedAt = window.performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        renderCounter(counter, Math.round(target * eased));

        if (progress < 1) {
          counterFrames.set(counter, window.requestAnimationFrame(tick));
        } else {
          counterFrames.delete(counter);
        }
      };

      counterFrames.set(counter, window.requestAnimationFrame(tick));
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const counter = entry.target as HTMLElement;
          if (entry.isIntersecting) animateCounter(counter);
          else resetCounter(counter);
        });
      },
      { threshold: 0.8 },
    );

    if (reducedMotion.matches) {
      counters.forEach((counter) => renderCounter(counter, Number(counter.dataset.countTo ?? 0)));
    } else {
      counters.forEach((counter) => {
        resetCounter(counter);
        counterObserver.observe(counter);
      });
    }

    const interactionCleanups: Array<() => void> = [];

    if (!reducedMotion.matches && finePointer.matches) {
      motionCards.forEach((card) => {
        const maxTilt = card.matches(".signal-card, .game-card") ? 3.5 : 5.5;
        const onMove = (event: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
          const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

          card.style.setProperty("--tilt-x", `${(0.5 - y) * maxTilt}deg`);
          card.style.setProperty("--tilt-y", `${(x - 0.5) * maxTilt}deg`);
          card.style.setProperty("--glow-x", `${x * 100}%`);
          card.style.setProperty("--glow-y", `${y * 100}%`);
          card.classList.add("is-tilting");
        };
        const onLeave = () => {
          card.style.setProperty("--tilt-x", "0deg");
          card.style.setProperty("--tilt-y", "0deg");
          card.classList.remove("is-tilting");
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        interactionCleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      magneticTargets.forEach((target) => {
        const onMove = (event: PointerEvent) => {
          const rect = target.getBoundingClientRect();
          const x = event.clientX - (rect.left + rect.width / 2);
          const y = event.clientY - (rect.top + rect.height / 2);
          target.style.setProperty("--magnet-x", `${x * 0.13}px`);
          target.style.setProperty("--magnet-y", `${y * 0.18}px`);
        };
        const onLeave = () => {
          target.style.setProperty("--magnet-x", "0px");
          target.style.setProperty("--magnet-y", "0px");
        };

        target.addEventListener("pointermove", onMove);
        target.addEventListener("pointerleave", onLeave);
        interactionCleanups.push(() => {
          target.removeEventListener("pointermove", onMove);
          target.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    let cursorFrame = 0;
    let pointerX = -100;
    let pointerY = -100;
    let ringX = -100;
    let ringY = -100;
    const cursorRing = cursorRingRef.current;
    let activeHeading: HTMLElement | null = null;

    const drawCursor = () => {
      ringX += (pointerX - ringX) * 0.3;
      ringY += (pointerY - ringY) * 0.3;
      cursorRing?.style.setProperty("--cursor-x", `${ringX}px`);
      cursorRing?.style.setProperty("--cursor-y", `${ringY}px`);
      cursorFrame = window.requestAnimationFrame(drawCursor);
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      const target = event.target instanceof Element ? event.target : null;
      const heading = target?.closest<HTMLElement>(HEADING_CURSOR_SELECTOR) ?? null;

      if (heading !== activeHeading) {
        activeHeading?.classList.remove("cursor-heading-active");
        heading?.classList.add("cursor-heading-active");
        activeHeading = heading;
      }

      cursorRing?.classList.toggle("is-visible", Boolean(heading));
      root.classList.toggle("heading-cursor-active", Boolean(heading));
    };
    const hideCursor = () => {
      activeHeading?.classList.remove("cursor-heading-active");
      activeHeading = null;
      cursorRing?.classList.remove("is-visible", "is-pressed");
      root.classList.remove("heading-cursor-active");
    };
    const pressCursor = () => {
      if (cursorRing?.classList.contains("is-visible")) cursorRing.classList.add("is-pressed");
    };
    const releaseCursor = () => cursorRing?.classList.remove("is-pressed");

    if (!reducedMotion.matches && finePointer.matches && cursorRing) {
      root.classList.add("has-heading-cursor");
      cursorFrame = window.requestAnimationFrame(drawCursor);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", pressCursor, { passive: true });
      window.addEventListener("pointerup", releaseCursor, { passive: true });
      document.addEventListener("mouseleave", hideCursor);
    }

    let scrollFrame = 0;
    let lastScrollY = window.scrollY;
    const renderProfileDock = (scrollY: number) => {
      if (!profileDock || !profileSource || !profileVisual || !brandMark) return;

      const sourceRect = profileSource.getBoundingClientRect();
      const targetRect = brandMark.getBoundingClientRect();
      const rawProgress = scrollY > 18 ? 1 : 0;
      const dockProgress = rawProgress;
      const eased = dockProgress;
      const interpolate = (start: number, end: number) => start + (end - start) * eased;

      profileDock.style.left = `${interpolate(sourceRect.left, targetRect.left)}px`;
      profileDock.style.top = `${interpolate(sourceRect.top, targetRect.top)}px`;
      profileDock.style.width = `${interpolate(sourceRect.width, targetRect.width)}px`;
      profileDock.style.height = `${interpolate(sourceRect.height, targetRect.height)}px`;
      profileDock.style.opacity = rawProgress <= 0 ? "0" : String(Math.min(rawProgress * 5, 1));
      profileDock.dataset.docked = dockProgress > 0.93 ? "true" : "false";
      profileVisual.style.opacity = String(Math.max(1 - rawProgress * 3.2, 0));
      brandMark.style.opacity = String(1 - Math.min(Math.max((dockProgress - 0.72) / 0.28, 0), 1));
    };

    const updateScrollEffects = () => {
      if (scrollFrame) return;

      scrollFrame = window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;
        const heroShift = Math.min(scrollY * 0.09, 74);
        const heroCopyShift = Math.min(scrollY * 0.045, 38);
        const heroFadeStart = 120;
        const heroFadeRange = Math.max(window.innerHeight * 0.95 - heroFadeStart, 1);
        const heroCopyOpacity = Math.max(
          1 - Math.max(scrollY - heroFadeStart, 0) / heroFadeRange,
          0.32
        );

        progressRef.current?.style.setProperty("--scroll-progress", String(progress));
        root.style.setProperty("--hero-shift", `${heroShift}px`);
        root.style.setProperty("--hero-copy-shift", `${heroCopyShift}px`);
        root.style.setProperty("--hero-copy-opacity", String(heroCopyOpacity));
        signalCard?.style.setProperty("--parallax-y", `${Math.min(scrollY * 0.026, 30)}px`);
        topbar?.classList.toggle("is-scrolled", scrollY > 18);
        renderProfileDock(scrollY);

        if (Math.abs(scrollY - lastScrollY) > 2) {
          root.dataset.scrollDirection = scrollY > lastScrollY ? "down" : "up";
          lastScrollY = scrollY;
        }

        scrollFrame = 0;
      });
    };

    updateScrollEffects();
    window.addEventListener("scroll", updateScrollEffects, { passive: true });
    window.addEventListener("resize", updateScrollEffects);

    return () => {
      observer.disconnect();
      counterObserver.disconnect();
      counterFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      interactionCleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("scroll", updateScrollEffects);
      window.removeEventListener("resize", updateScrollEffects);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", pressCursor);
      window.removeEventListener("pointerup", releaseCursor);
      document.removeEventListener("mouseleave", hideCursor);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (cursorFrame) window.cancelAnimationFrame(cursorFrame);

      activeHeading?.classList.remove("cursor-heading-active");
      root.classList.remove("motion-ready", "has-heading-cursor", "heading-cursor-active");
      root.removeAttribute("data-scroll-direction");
      root.style.removeProperty("--hero-shift");
      root.style.removeProperty("--hero-copy-shift");
      root.style.removeProperty("--hero-copy-opacity");
      topbar?.classList.remove("is-scrolled");
      signalCard?.style.removeProperty("--parallax-y");
      profileVisual?.style.removeProperty("opacity");
      brandMark?.style.removeProperty("opacity");
      if (profileDock) {
        profileDock.removeAttribute("style");
        profileDock.removeAttribute("data-docked");
      }
      targets.forEach((target) => {
        target.classList.remove("scroll-reveal", "is-visible", "reveal-from-top");
        target.style.removeProperty("--reveal-delay");
      });
      motionCards.forEach((card) => {
        card.classList.remove("motion-card", "is-tilting");
        card.style.removeProperty("--tilt-x");
        card.style.removeProperty("--tilt-y");
        card.style.removeProperty("--glow-x");
        card.style.removeProperty("--glow-y");
      });
      magneticTargets.forEach((target) => {
        target.style.removeProperty("--magnet-x");
        target.style.removeProperty("--magnet-y");
      });
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
      <span className="profile-dock-flyer" ref={profileDockRef} aria-hidden="true">
        <img src="./ramkumar-profile.webp" alt="" width={900} height={900} />
      </span>
      <span className="cursor-ring" ref={cursorRingRef} aria-hidden="true" />
    </>
  );
}
