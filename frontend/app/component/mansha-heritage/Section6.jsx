"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS_DESKTOP = 8000;
const AUTOPLAY_MS_MOBILE = 2000;

const signatureSlides = [
  { id: 1, title: "Signature Masterpieces 1", src: "/heritage/slider-1.jpg" },
  { id: 2, title: "Signature Masterpieces 2", src: "/heritage/slider-2.jpg" },
  { id: 3, title: "Signature Masterpieces 3", src: "/heritage/slider-3.jpg" },
  { id: 4, title: "Signature Masterpieces 4", src: "/heritage/slider-4.jpg" },
];

const Section6 = () => {
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
    const next = (currentSlide + 1) % signatureSlides.length;
    goTo(next, "next");
  }, [currentSlide, goTo]);

  const goPrev = useCallback(() => {
    const prev = (currentSlide - 1 + signatureSlides.length) % signatureSlides.length;
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
    <section ref={sectionRef} className="w-full bg-white px-0 ">
      <div className="mx-auto max-w-8xl px-5 pb-[0px] sm:px-8 lg:px-[75px] lg:pb-[40px] md:mb-[0px]">
        <div className="max-w-[1350px] mx-auto flex items-center justify-center md:justify-between py-5 px-0 lg:px-0 relative">
          <h2 className="font-['Optima','Optima_LT_Pro',Candara,'Segoe_UI',sans-serif] text-[28px] sm:text-[36px] font-[500] leading-[100%] tracking-normal capitalize text-[#111111] text-center md:text-left">
            Signature Masterpieces
          </h2>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              aria-label="Previous"
              className="flex h-10 cursor-pointer w-10 items-center justify-center rounded-full border border-[#000000] text-[#111111]"
              onClick={handlePrev}
            >
              <i className="ri-arrow-left-line"></i>
            </button>

            <button
              type="button"
              aria-label="Next"
              className="flex h-10 cursor-pointer w-10 items-center justify-center rounded-full border border-[#000000] text-[#111111]"
              onClick={handleNext}
            >
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="relative isolate w-full overflow-hidden bg-[#EAEAEA] [transform:translateZ(0)]">
        <SlideLayer
          slide={signatureSlides[currentSlide]}
          imagePriority={currentSlide === 0}
        />

        {incomingSlide !== null && (
          <SlideLayer
            slide={signatureSlides[incomingSlide]}
            entering
            overlay
            direction={direction}
            onEnterAnimationEnd={finishSlideTransition}
          />
        )}

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 md:hidden">
          {signatureSlides.map((slide, index) => (
            <button
              key={slide.id}
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
        @keyframes signature-story-clip-next {
          from {
            clip-path: inset(0% 0% 0% 100%);
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
          }
        }
        @keyframes signature-story-clip-prev {
          from {
            clip-path: inset(0% 100% 0% 0%);
          }
          to {
            clip-path: inset(0% 0% 0% 0%);
          }
        }
        @keyframes signature-story-img-zoom {
          from {
            transform: scale(1.2);
          }
          to {
            transform: scale(1);
          }
        }
        .signature-slide-story-next {
          animation: signature-story-clip-next 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .signature-slide-story-next :is(img) {
          transform-origin: center center;
          animation: signature-story-img-zoom 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .signature-slide-story-prev {
          animation: signature-story-clip-prev 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .signature-slide-story-prev :is(img) {
          transform-origin: center center;
          animation: signature-story-img-zoom 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .signature-slide-story-next,
          .signature-slide-story-prev,
          .signature-slide-story-next :is(img),
          .signature-slide-story-prev :is(img) {
            animation-duration: 0.35s;
            animation-timing-function: ease-out;
          }
        }
      `}</style>
    </section>
  );
};

export default Section6;

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
      ? "signature-slide-story-next"
      : "signature-slide-story-prev"
    : "";

  return (
    <div
      className={`w-full overflow-hidden bg-[#EAEAEA] ${
        overlay ? "absolute inset-0 z-10" : "relative z-0"
      } ${storyAnimClass}`}
      onAnimationEnd={handleEnterAnimationEnd}
    >
      {overlay ? (
        <Image
          src={slide.src}
          alt={slide.title}
          fill
          className="object-cover"
          priority={imagePriority}
          quality={100}
          sizes="(max-width: 1284px) 100vw, 1284px"
        />
      ) : (
        <Image
          src={slide.src}
          alt={slide.title}
          width={1920}
          height={1280}
          className="block h-auto w-full max-w-full object-cover"
          priority={imagePriority}
          quality={100}
          sizes="(max-width: 1284px) 100vw, 1284px"
        />
      )}
    </div>
  );
}
