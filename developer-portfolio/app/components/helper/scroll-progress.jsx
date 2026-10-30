"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || typeof CSS === "undefined") return;

    // Fallback for browsers that do not support CSS scroll-driven animations
    if (!CSS.supports("animation-timeline", "scroll()")) {
      const updateProgress = () => {
        const el = progressRef.current;
        if (!el) return;
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const ratio = scrollable > 0 ? Math.min(1, Math.max(0, scrolled / scrollable)) : 0;
        el.style.transform = `scaleX(${ratio})`;
      };

      updateProgress();
      window.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress);
      return () => {
        window.removeEventListener("scroll", updateProgress);
        window.removeEventListener("resize", updateProgress);
      };
    }
  }, []);

  return (
    <div
      id="scroll-progress"
      ref={progressRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-gradient-to-r from-[#16f2b3] via-violet-500 to-pink-500 origin-left pointer-events-none"
    />
  );
}
