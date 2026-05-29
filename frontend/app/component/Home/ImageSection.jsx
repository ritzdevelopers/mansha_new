"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS_DESKTOP = 8000;
const AUTOPLAY_MS_MOBILE = 2000;

const BANNERS = [
  { src: "/mansha-image/mansha-banner-1.jpg", alt: "Mansha banner 1" },
  { src: "/mansha-image/mansha-banner-2.jpg", alt: "Mansha banner 2" },
  { src: "/mansha-image/mansha-banner-3.jpg", alt: "Mansha banner 3" },
  { src: "/mansha-image/mansha-banner-4.jpg", alt: "Mansha banner 4" },
];

const ImageSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [incomingSlide, setIncomingSlide] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const [isSectionInView, setIsSectionInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);
  const promoteIndexRef = useRef(null);

  const autoplayMs = isMobile ? AUTOPLAY_MS_MOBILE : AUTOPLAY_MS_DESKTOP;

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionInView(entry.isIntersecting),
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const finishSlideTransition = useCallback(() => {
    const idx = promoteIndexRef.current;
    if (idx === null) return;
    promoteIndexRef.current = null;
    setCurrentSlide(idx);
    setIncomingSlide(null);
    setIsAnimating(false);
  }, []);

  const goTo = useCallback(
    (nextIndex, dir) => {
      if (isAnimating || nextIndex === currentSlide) return;
      setDirection(dir);
      promoteIndexRef.current = nextIndex;
      setIncomingSlide(nextIndex);
      setIsAnimating(true);
    },
    [isAnimating, currentSlide],
  );

  const goNext = useCallback(() => {
    const next = (currentSlide + 1) % BANNERS.length;
    goTo(next, "next");
  }, [currentSlide, goTo]);

  const goPrev = useCallback(() => {
    const prev = (currentSlide - 1 + BANNERS.length) % BANNERS.length;
    goTo(prev, "prev");
  }, [currentSlide, goTo]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(goNext, autoplayMs);
  }, [goNext, autoplayMs]);

  useEffect(() => {
    if (!isSectionInView) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(goNext, autoplayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSectionInView, goNext, autoplayMs]);

  const handlePrev = () => {
    goPrev();
    resetTimer();
  };

  const handleNext = () => {
    goNext();
    resetTimer();
  };

  const handleDotClick = (index) => {
    if (index === currentSlide || isAnimating) return;
    const dir = index > currentSlide ? "next" : "prev";
    goTo(index, dir);
    resetTimer();
  };

  const activeDot = incomingSlide !== null ? incomingSlide : currentSlide;

  return (
    <section ref={sectionRef} id="home-image-section" className="w-full bg-white">
      <div className="relative isolate w-full overflow-hidden [transform:translateZ(0)]">
        <SlideLayer
          slide={BANNERS[currentSlide]}
          imagePriority={currentSlide === 0}
        />

        {incomingSlide !== null && (
          <SlideLayer
            slide={BANNERS[incomingSlide]}
            entering
            overlay
            direction={direction}
            onEnterAnimationEnd={finishSlideTransition}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-between px-4 md:flex md:px-6">
          <button
            type="button"
            aria-label="Previous"
            className="pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-out hover:scale-105 hover:bg-white/20 active:scale-95 lg:h-11 lg:w-11"
            onClick={handlePrev}
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <button
            type="button"
            aria-label="Next"
            className="pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm transition-[transform,background-color,border-color] duration-300 ease-out hover:scale-105 hover:bg-white/20 active:scale-95 lg:h-11 lg:w-11"
            onClick={handleNext}
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 md:hidden">
          {BANNERS.map((banner, index) => (
            <button
              key={banner.src}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 cursor-pointer rounded-full transition-[background-color,transform] duration-500 ease-out ${
                activeDot === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes image-section-clip-next {
          from {
            clip-path: inset(0% 0% 0% 100%);
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
          }
        }
        @keyframes image-section-clip-prev {
          from {
            clip-path: inset(0% 100% 0% 0%);
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
          }
        }
        @keyframes image-section-img-zoom {
          from {
            transform: scale(1.2);
          }
          to {
            transform: scale(1);
          }
        }
        .image-section-slide-next {
          animation: image-section-clip-next 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .image-section-slide-next :is(img) {
          transform-origin: center center;
          animation: image-section-img-zoom 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .image-section-slide-prev {
          animation: image-section-clip-prev 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .image-section-slide-prev :is(img) {
          transform-origin: center center;
          animation: image-section-img-zoom 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .image-section-slide-next,
          .image-section-slide-prev,
          .image-section-slide-next :is(img),
          .image-section-slide-prev :is(img) {
            animation-duration: 0.35s;
            animation-timing-function: ease-out;
          }
        }
      `}</style>
    </section>
  );
};

export default ImageSection;

function SlideLayer({
  slide,
  entering = false,
  overlay = false,
  direction = "next",
  onEnterAnimationEnd,
  imagePriority = false,
}) {
  const handleEnterAnimationEnd = (e) => {
    if (!entering || !onEnterAnimationEnd) return;
    if (e.target !== e.currentTarget) return;
    onEnterAnimationEnd();
  };

  const storyAnimClass = entering
    ? direction === "next"
      ? "image-section-slide-next"
      : "image-section-slide-prev"
    : "";

  return (
    <div
      className={`w-full overflow-hidden ${
        overlay ? "absolute inset-0 z-10" : "relative z-0"
      } ${storyAnimClass}`}
      onAnimationEnd={handleEnterAnimationEnd}
    >
      {overlay ? (
        <Image
          src={slide.src}
          alt={slide.alt}
          fill
          className="object-cover"
          priority={imagePriority}
          quality={100}
          sizes="100vw"
        />
      ) : (
        <Image
          src={slide.src}
          alt={slide.alt}
          width={1600}
          height={900}
          className="block h-auto w-full object-cover"
          priority={imagePriority}
          quality={100}
          sizes="100vw"
        />
      )}
    </div>
  );
}
