"use client";

import { useEffect, useState, type CSSProperties } from "react";

/**
 * Premium cinematic splash:
 *  - 0..SPLASH_MS:                       wave water rises smoothly from bottom to top of "MANSHA"
 *  - SPLASH_MS..SPLASH_MS+ZOOM_IN_MS:    title zoom-in + fade, overlay fades out
 */
const SPLASH_MS = 7000;
const ZOOM_IN_MS = 3000;

type SplashPhase = "wave" | "exit";

/** Bulletproof inline-SVG data URI (URL-encoded so it works in every modern browser + Turbopack). */
const svgUrl = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

/** Single white wave + tall solid white fill below the crest. */
const WAVE_BACK = svgUrl(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 140' preserveAspectRatio='none'>" +
    "<path d='M0,20 C25,5 50,5 75,20 C100,35 125,35 150,20 L150,140 L0,140 Z' fill='#ffffff'/>" +
    "</svg>"
);

export type PageRefreshLoaderProps = {
  /** Optional callback jab splash timer khatam ho (fixed overlay unmount). */
  onComplete?: () => void;
};

export default function PageRefreshLoader({
  onComplete,
}: PageRefreshLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<SplashPhase>("wave");

  const rootStyle = {
    "--splash-duration": `${SPLASH_MS}ms`,
    "--zoom-in-duration": `${ZOOM_IN_MS}ms`,
    "--wave-back": WAVE_BACK,
  } as CSSProperties;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const waveDone = window.setTimeout(() => setPhase("exit"), SPLASH_MS);
    const unmount = window.setTimeout(() => {
      onComplete?.();
      setVisible(false);
    }, SPLASH_MS + ZOOM_IN_MS);
    return () => {
      window.clearTimeout(waveDone);
      window.clearTimeout(unmount);
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`loader-root ${phase === "exit" ? "loader-root--exit" : ""}`}
      style={rootStyle}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="loader-body">
        <div
          className={
            phase === "exit"
              ? "title-zoom title-zoom--out"
              : "title-zoom"
          }
        >
          <h1 className="waves-font mansha-splash-title font-black uppercase tracking-tight wave-text">
            MANSHA
          </h1>
        </div>
      </div>

      <style jsx global>{`
        .waves-font {
          font-family: var(--font-archivo-black), "Archivo Black", sans-serif;
        }
      `}</style>

      <style jsx>{`
        .loader-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          width: 100%;
          height: 100%;
          background: #141414;
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          backface-visibility: hidden;
        }

        .loader-root--exit {
          animation: loader-root-fade var(--zoom-in-duration, ${ZOOM_IN_MS}ms)
            cubic-bezier(0.4, 0, 0.2, 1) forwards;
          pointer-events: none;
        }

        @keyframes loader-root-fade {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
            
        }

        .loader-body {
          position: relative;
          width: 100%;
          min-height: 100%;
          background: #141414;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .title-zoom {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-origin: center center;
          will-change: transform, opacity;
        }

        .title-zoom--out {
          animation: mansha-zoom-in var(--zoom-in-duration, ${ZOOM_IN_MS}ms)
            cubic-bezier(0.45, 0, 0.05, 1) forwards;
        }

        @keyframes mansha-zoom-in {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2.6);
            opacity: 0;
          }
        }

        .mansha-splash-title {
          margin: 0;
          padding: 0;
          width: 100%;
          font-size: clamp(4rem, 16vw, 14.375rem);
          line-height: 1;
          text-align: center;
          letter-spacing: -0.01em;
          box-sizing: border-box;
        }

        /*
         * Wave-fill text: single white SVG wave (crest + tall solid fill below)
         * clipped to the text glyphs via background-clip: text. The wave + solid
         * white only appears INSIDE the "MANSHA" letters — everywhere else stays
         * the dark background.
         *
         * The layer slides upward (background-position-y) so the water-line
         * rises from text bottom to top over SPLASH_MS, while flowing
         * horizontally at the same time.
         */
        .wave-text {
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;

          background-image: var(--wave-back);
          background-repeat: repeat-x;
          background-size: 1.5em 1.4em;
          background-position-x: 0em;
          background-position-y: 0.95em;

          animation:
            wave-flow 5s linear infinite,
            wave-rise var(--splash-duration, ${SPLASH_MS}ms)
              cubic-bezier(0.65, 0.05, 0.35, 1) forwards;
          will-change: background-position;
          transform: translateZ(0);
        }

        /* Continuous horizontal drift: 3 full tiles of 1.5em = 4.5em over 5s.
           Seamlessly loops (integer tile shift). */
        @keyframes wave-flow {
          0% {
            background-position-x: 0em;
          }
          100% {
            background-position-x: -4.5em;
          }
        }

        /* Vertical rise: water surface starts AT element bottom (0.95em),
           ends with solid fully covering each glyph top to bottom (-0.35em). */
        @keyframes wave-rise {
          0% {
            background-position-y: 0.95em;
          }
          100% {
            background-position-y: -0.35em;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wave-text {
            animation-duration: 1ms, var(--splash-duration, ${SPLASH_MS}ms);
          }
        }
      `}</style>
    </div>
  );
}
