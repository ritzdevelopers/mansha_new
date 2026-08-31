"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS_DESKTOP = 2500;
const AUTOPLAY_MS_MOBILE = 1800;

const BANNERS = [
  {
    src: "/vega-street/vega-street-banner.jpg",
    alt: "Mansha Vega Street commercial destination",
    name: "Mansha Vega Street",
    href: "/vega-street",
  },
  {
    src: "/mansha-image/mansha-banner-1.jpg",
    alt: "Mansha The Heritage grand entrance with clock tower",
    name: "Mansha The Heritage",
    href: "/mansha-heritage",
  },
  {
    src: "/mansha-image/mansha-banner-2.jpg",
    alt: "Mansha Oasis gated community entrance",
    name: "Mansha Oasis",
    href: "/mansha-oasis",
  },
  {
    src: "/mansha-image/mansha-banner-3.jpg",
    alt: "Mansha Orchid entrance gate and signage",
    name: "Mansha Orchid",
    href: "/mansha-orchid",
  },
  {
    src: "/mansha-image/mansha-banner-4.jpg",
    alt: "Aagman by Mansha residential apartments",
    name: "Aagman by Mansha",
    href: "/aagman-by-mansha",
  },
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
  const activeBanner = BANNERS[activeDot];

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

        <Link
          href={activeBanner.href}
          aria-label={`View ${activeBanner.name}`}
          className="group absolute bottom-10 right-4 z-30 inline-flex cursor-pointer items-center gap-2.5 text-white md:bottom-6 md:right-6 md:gap-3 lg:bottom-8 lg:right-10 xl:right-[75px]"
        >
          <span className="whitespace-nowrap font-optima text-[15px] font-medium capitalize leading-none tracking-wide drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)] md:text-[20px] lg:text-[24px]">
            {activeBanner.name}
          </span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/80 bg-white/15 text-white backdrop-blur-sm transition-[background-color,color,transform] duration-300 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-[#652A27] md:h-10 md:w-10">
            <i className="ri-arrow-right-line text-base md:text-lg" />
          </span>
        </Link>

        <div className="absolute bottom-3 left-5 z-20 flex items-center gap-1.5 md:hidden">
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
          animation: image-section-clip-next 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .image-section-slide-next :is(img) {
          transform-origin: center center;
          animation: image-section-img-zoom 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .image-section-slide-prev {
          animation: image-section-clip-prev 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .image-section-slide-prev :is(img) {
          transform-origin: center center;
          animation: image-section-img-zoom 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
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
        overlay ? "absolute inset-0 z-10" : "relative z-0 xl:h-[675px]"
      } ${storyAnimClass}`}
      onAnimationEnd={handleEnterAnimationEnd}
    >
      {overlay ? (
        <Image
          src={slide.src}
          alt={slide.alt}
          title={slide.alt}
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
          title={slide.alt}
          width={1024}
          height={454}
          className="block h-auto w-full object-cover xl:h-full"
          priority={imagePriority}
          quality={100}
          sizes="100vw"
        />
      )}
    </div>
  );
}
