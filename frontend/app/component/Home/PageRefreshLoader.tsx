"use client";

import { useEffect, useState, type CSSProperties } from "react";

/** Wave fill `SPLASH_MS`; 5s ke baad MANSHA zoom+fade (`ZOOM_IN_MS`); phir unmount. */
const SPLASH_MS = 7000;
const ZOOM_IN_MS = 3000;

type SplashPhase = "wave" | "exit";

export type PageRefreshLoaderProps = {
  /** Optional callback jab splash timer khatam ho (fixed overlay unmount). */
  onComplete?: () => void;
};

export default function 
PageRefreshLoader({
  onComplete,
}: PageRefreshLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<SplashPhase>("wave");

  const rootStyle = {
    "--splash-duration": `${SPLASH_MS}ms`,
    "--zoom-in-duration": `${ZOOM_IN_MS}ms`,
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
              ? "splash-title-zoom splash-title-zoom--out"
              : "splash-title-zoom"
          }
        >
          <h1
            className={`loader-outline waves-font mansha-splash-title font-black uppercase tracking-tight loading text-center wave ${
              phase === "exit" ? "wave-frozen" : ""
            }`}
          >
            MANSHA
          </h1>
        </div>
      </div>

      <style jsx global>{`
        .waves-font {
          font-family: var(--font-archivo-black), "Archivo Black", sans-serif;
        }
        .loader-outline {
          text-shadow: none;
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
        }

        .loader-root--exit {
          animation: loader-root-fade var(--zoom-in-duration, ${ZOOM_IN_MS}ms)
            cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes loader-root-fade {
          from {
            opacity: 1;
          }
          to {
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

        .mansha-splash-title {
          margin: 0;
          padding: 0;
          width: 100%;
          font-size: clamp(4rem, 16vw, 14.375rem);
          line-height: 1;
          box-sizing: border-box;
        }

        .loading {
          text-transform: uppercase;
          text-align: center;
        }

        @keyframes wave-animation {
          0% {
            background-position: 0 bottom;
          }
          100% {
            background-position: 200px bottom;
          }
        }

        @keyframes loading-animation {
          0% {
            background-size: 200px 0;
          }
          100% {
            background-size: 200px 480px;
          }
        }

        .splash-title-zoom {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform-origin: center center;
        }

        /* Zoom wrapper pe transform — andar wave-filled text same rang/texture ke saath scale */
        .splash-title-zoom--out {
          animation: mansha-zoom-in var(--zoom-in-duration, ${ZOOM_IN_MS}ms)
            cubic-bezier(0.4, 0, 0.2, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes mansha-zoom-in {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        .wave {
          background-image: url("https://i.imgur.com/uFpLbYt.png");
          -webkit-background-clip: text;
          background-clip: text;
          color: rgba(0, 0, 0, 0);
          text-shadow: 0px 0px rgba(255, 255, 255, 0.06);
          background-position: 0 100%;
          background-repeat: repeat-x;
          background-size: 200px 0;
          animation: wave-animation 1s infinite linear,
            loading-animation var(--splash-duration, ${SPLASH_MS}ms) ease-out forwards;
          opacity: 1;
        }

        /* Exit: fill complete frame lock + wave scroll band — phir bhi wahi fill color */
        .wave-frozen {
          animation: none !important;
          background-size: 200px 480px !important;
          background-position: 0 100% !important;
        }
      `}</style>
    </div>
  );
}
