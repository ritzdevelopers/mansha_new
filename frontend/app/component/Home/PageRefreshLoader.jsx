"use client";

import { useEffect, useState } from "react";

const PageRefreshLoader = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [startZoomOut, setStartZoomOut] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);

  useEffect(() => {
    const FLOAT_DURATION = 3000;
    const ZOOM_DURATION = 1400;
    let frameId;

    const startTime = performance.now();
    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / FLOAT_DURATION);
      // Keep percentage in sync with visual water rise (ease-in-out feel).
      const eased = 0.5 - 0.5 * Math.cos(Math.PI * t);
      const percent = Math.min(99, Math.round(eased * 100));
      setLoadingPercent(percent);

      if (t < 1) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    frameId = window.requestAnimationFrame(updateProgress);

    const zoomTimer = window.setTimeout(() => {
      setLoadingPercent(100);
      setStartZoomOut(true);
    }, FLOAT_DURATION);

    const hideTimer = window.setTimeout(() => {
      setShowLoader(false);
    }, FLOAT_DURATION + ZOOM_DURATION);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      window.clearTimeout(zoomTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!showLoader) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0b0b0b] transition-opacity duration-1000 ease-out ${
        startZoomOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className={`relative z-10 inline-block leading-none ${
          startZoomOut
            ? "animate-[popFront_1400ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
            : "opacity-100 [transform:perspective(1400px)_translateZ(0px)_scale(1)]"
        }`}
      >
        <div className="relative">
          <h1 className="loader-outline waves-font text-[clamp(64px,16vw,230px)] font-black uppercase tracking-tight text-[#3f4045]">
            MANSHA
          </h1>
          <h1 className="loader-wave-text waves-font pointer-events-none absolute inset-0 text-[clamp(64px,16vw,230px)] font-black uppercase tracking-tight text-transparent">
            MANSHA
          </h1>
        </div>
        <p className="mt-3 text-right text-xs font-semibold tracking-wide text-white sm:absolute sm:right-2 sm:bottom-1 sm:mt-0">
          loading... {loadingPercent}%
        </p>
      </div>

      <style jsx>{`
        .waves-font {
          font-family: var(--font-archivo-black), "Archivo Black", sans-serif;
        }

        .loader-outline {
          -webkit-text-stroke: 0px transparent;
          text-shadow: none;
        }

        .loader-wave-text {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000' preserveAspectRatio='none'%3E%3Cpath d='M 0 2000 0 500 Q 149 367 298 500 t 298 0 298 0 298 0 298 0 298 0 v1000 z' fill='%23ffffff'/%3E%3C/svg%3E");
          background-size: 220% 170%;
          background-repeat: repeat-x;
          background-position: 0% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textWaveMove 4s linear infinite;
        }

        @keyframes textWaveMove {
          0% {
            background-position: 0% -10%;
          }
          50% {
            background-position: 50% 45%;
          }
          100% {
            background-position: 100% 100%;
          }
        }

        @keyframes popFront {
          0% {
            opacity: 1;
            filter: blur(0px);
            transform: perspective(1400px) translateZ(0px) scale(1);
          }
          70% {
            opacity: 0.32;
            filter: blur(0.5px);
            transform: perspective(1400px) translateZ(420px) scale(1.95);
          }
          100% {
            opacity: 0.04;
            filter: blur(3px);
            transform: perspective(1400px) translateZ(720px) scale(2.5);
          }
        }
      `}</style>
    </div>
  );
};

export default PageRefreshLoader;
