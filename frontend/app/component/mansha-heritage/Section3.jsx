"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 3200;
const ANIMATION_DURATION = 1200; // ms, must match CSS animation duration

// Left panel has its own independent slides
const LEFT_SLIDES = [
  {
    src: "/heritage/heritage-slider-1.jpg",
    alt: "A terrace for every home",
    title: "Spaces That Inspire",
    text: "Courtyards, open gym areas, kids' play zones, and round-the-clock security—designed for effortless everyday living.",
  },
  {
    src: "/heritage/heritage-slider-2.jpg",
    alt: "Club with lawn",
    title: "Balanced By Design",
    text: "From landscaped courtyards to fitness spaces and safe play areas—every amenity adds comfort to life.",
  },
  {
    src: "/heritage/heritage-slider-3.jpg",
    alt: "Club pool",
    title: "Life Within Reach",
    text: "Open gyms, vibrant courtyards, kids' play areas, and 24/7 CCTV—crafted for modern community living.",
  },
];

// Right panel slides — current right slide animates INTO left panel on advance
const RIGHT_SLIDES = [
  {
    src: "/heritage/heritage-slider-4.jpg",
    alt: "Linear greens and themed landscapes",
    title: "Everyday Comes Alive",
    text: "Green courtyards, active fitness zones, secure surroundings, and joyful play spaces—made for all generations.",
  },
  {
    src: "/heritage/heritage-slider-5.jpg",
    alt: "Gym",
    title: "Thoughtfully Elevated",
    text: "A lifestyle enriched with open spaces, wellness zones, children's play areas, and seamless security.",
  },
  {
    src: "/heritage/heritage-slider-6.jpg",
    alt: "Gym",
    title: "Designed Around You",
    text: "Courtyard living, outdoor fitness, playful spaces for kids, and complete security—everything thoughtfully connected.",
  },
];

const ALL_SLIDES = [...LEFT_SLIDES, ...RIGHT_SLIDES];

// ─── Generic Story Slider Hook ────────────────────────────────────────────────
function useStorySlider(slidesLength) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [incomingSlide, setIncomingSlide] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const promoteIndexRef = useRef(null);

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
    goTo((currentSlide + 1) % slidesLength, "next");
  }, [currentSlide, goTo, slidesLength]);

  const goPrev = useCallback(() => {
    goTo((currentSlide - 1 + slidesLength) % slidesLength, "prev");
  }, [currentSlide, goTo, slidesLength]);

  const activeIndex = incomingSlide !== null ? incomingSlide : currentSlide;

  return {
    currentSlide,
    incomingSlide,
    direction,
    isAnimating,
    finishSlideTransition,
    goNext,
    goPrev,
    activeIndex,
  };
}

// ─── Connected Slider Hook ────────────────────────────────────────────────────
// 
// This hook drives the LEFT ←→ RIGHT connected transition:
//   • currentIdx        = which ALL_SLIDES item is shown in LEFT panel (main)
//   • previewIdx        = next item shown in RIGHT panel (preview)
//
// On "next":
//   1. RIGHT panel's current image slides LEFT → fills LEFT panel
//   2. LEFT panel's old image disappears
//   3. RIGHT panel gets the next-next image
//
function useConnectedSlider(length) {
  const [currentIdx, setCurrentIdx] = useState(0);          // shown in LEFT (main)
  const [previewIdx, setPreviewIdx] = useState(1 % length); // shown in RIGHT (preview)

  // Animation state for LEFT panel (incoming from right)
  const [leftIncoming, setLeftIncoming] = useState(null);
  // Animation state for RIGHT panel (incoming from right)
  const [rightIncoming, setRightIncoming] = useState(null);

  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const pendingRef = useRef(null);

  // Called when LEFT panel's incoming animation ends
  const finishLeft = useCallback(() => {
    if (pendingRef.current === null) return;
    setCurrentIdx(pendingRef.current.nextCurrent);
    setLeftIncoming(null);
  }, []);

  // Called when RIGHT panel's incoming animation ends
  const finishRight = useCallback(() => {
    if (pendingRef.current === null) return;
    setPreviewIdx(pendingRef.current.nextPreview);
    setRightIncoming(null);
    setIsAnimating(false);
    pendingRef.current = null;
  }, []);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    const nextCurrent = previewIdx;                          // right panel → becomes left main
    const nextPreview = (previewIdx + 1) % length;          // next-next → becomes right preview
    setDirection("next");
    pendingRef.current = { nextCurrent, nextPreview };
    setLeftIncoming(nextCurrent);   // animate into left panel
    setRightIncoming(nextPreview);  // animate into right panel
    setIsAnimating(true);
  }, [isAnimating, previewIdx, length]);

  const goPrev = useCallback(() => {
    if (isAnimating) return;
    const nextCurrent = (currentIdx - 1 + length) % length;
    const nextPreview = currentIdx;
    setDirection("prev");
    pendingRef.current = { nextCurrent, nextPreview };
    setLeftIncoming(nextCurrent);
    setRightIncoming(nextPreview);
    setIsAnimating(true);
  }, [isAnimating, currentIdx, length]);

  return {
    currentIdx,
    previewIdx,
    leftIncoming,
    rightIncoming,
    direction,
    isAnimating,
    finishLeft,
    finishRight,
    goNext,
    goPrev,
  };
}

// ─── Main Section ─────────────────────────────────────────────────────────────
const Section3 = () => {
  const connected = useConnectedSlider(ALL_SLIDES.length);
  const mobile = useStorySlider(ALL_SLIDES.length);

  const [isSectionInView, setIsSectionInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  const autoplayMs = isMobile ? AUTOPLAY_MS : AUTOPLAY_MS;

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

  const advanceAll = useCallback(() => {
    connected.goNext();
    mobile.goNext();
  }, [connected, mobile]);

  const retreatAll = useCallback(() => {
    connected.goPrev();
    mobile.goPrev();
  }, [connected, mobile]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advanceAll, autoplayMs);
  }, [advanceAll, autoplayMs]);

  useEffect(() => {
    if (!isSectionInView) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(advanceAll, autoplayMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSectionInView, advanceAll, autoplayMs]);

  const handlePrev = () => { retreatAll(); resetTimer(); };
  const handleNext = () => { advanceAll(); resetTimer(); };

  return (
    <section ref={sectionRef} className="w-full bg-[#FCFCFC] py-[35px] lg:py-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <h2 className="text-center font-optima text-[28px] font-[500] capitalize leading-[54px] text-[#000000] md:text-left md:text-[36px]">
          Essence of Excellence
        </h2>

        {/* ── Desktop: Connected Left + Right panels ── */}
        <div className="mt-6 hidden grid-cols-1 gap-4 xl:grid xl:grid-cols-[3fr_1fr]">
          {/* LEFT PANEL — main slide from ALL_SLIDES */}
          <ConnectedLeftPanel
            currentSlide={ALL_SLIDES[connected.currentIdx]}
            incomingSlide={connected.leftIncoming !== null ? ALL_SLIDES[connected.leftIncoming] : null}
            direction={connected.direction}
            onAnimationEnd={connected.finishLeft}
            heightClass="h-[496px]"
            imageSizes="(max-width: 1024px) 100vw, 75vw"
          />
          {/* RIGHT PANEL — preview slide from ALL_SLIDES */}
          <ConnectedRightPanel
            currentSlide={ALL_SLIDES[connected.previewIdx]}
            incomingSlide={connected.rightIncoming !== null ? ALL_SLIDES[connected.rightIncoming] : null}
            direction={connected.direction}
            onAnimationEnd={connected.finishRight}
            heightClass="h-[496px]"
            imageSizes="(max-width: 1024px) 100vw, 25vw"
          />
        </div>

        {/* ── Mobile: Single full-width slider ── */}
        <HeritageCarouselPanel
          slides={ALL_SLIDES}
          heightClass="h-[150px] md:h-[330px] lg:h-[380px]"
          imageSizes="100vw"
          compactText
          className="relative mt-2 overflow-hidden md:mt-6 xl:hidden"
          mobileText
          slider={mobile}
        />

        {/* ── Controls ── */}
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={handlePrev}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#333333] shadow-[0px_4px_16px_0px_#0000001A]"
          >
            <i className="ri-arrow-left-line" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={handleNext}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#333333] shadow-[0px_4px_16px_0px_#0000001A]"
          >
            <i className="ri-arrow-right-line" />
          </button>
        </div>
      </div>

      <Styles />
    </section>
  );
};

export default Section3;
// ─── Connected Left Panel ─────────────────────────────────────────────────────
// The RIGHT panel's image slides INTO this panel from the right.
function ConnectedLeftPanel({
  currentSlide,
  incomingSlide,
  direction,
  onAnimationEnd,
  heightClass,
  imageSizes,
}) {
  const activeSlide = incomingSlide || currentSlide;

  return (
    <article className="group relative overflow-hidden">
      <div
        className={`relative isolate w-full overflow-hidden bg-[#1a1a1a] [transform:translateZ(0)] ${heightClass}`}
      >
        {/* Current (base) image */}
        <SlideLayer
          slide={currentSlide}
          sizes={imageSizes}
          imagePriority
          exiting={!!incomingSlide}
          direction={direction}
        />
        {/* Incoming image animates in from right (next) or left (prev) */}
        {incomingSlide && (
          <SlideLayer
            slide={incomingSlide}
            entering
            overlay
            direction={direction}
            sizes={imageSizes}
            onEnterAnimationEnd={onAnimationEnd}
          />
        )}
      </div>
      <Overlay />
      <TextOverlay slide={activeSlide} compact={false} mobile={false} />
    </article>
  );
}

// ─── Connected Right Panel ────────────────────────────────────────────────────
// Shows the preview (next) image. When advancing, current exits (slides left)
// and new incoming slides in from the right.
function ConnectedRightPanel({
  currentSlide,
  incomingSlide,
  direction,
  onAnimationEnd,
  heightClass,
  imageSizes,
}) {
  const activeSlide = incomingSlide || currentSlide;

  return (
    <article className="group relative overflow-hidden">
      <div
        className={`relative isolate w-full overflow-hidden bg-[#1a1a1a] [transform:translateZ(0)] ${heightClass}`}
      >
        {/* Current preview image */}
        <SlideLayer
          slide={currentSlide}
          sizes={imageSizes}
          exiting={!!incomingSlide}
          direction={direction}
        />
        {/* Next preview image animates in */}
        {incomingSlide && (
          <SlideLayer
            slide={incomingSlide}
            entering
            overlay
            direction={direction}
            sizes={imageSizes}
            onEnterAnimationEnd={onAnimationEnd}
          />
        )}
      </div>
      <Overlay />
      <TextOverlay slide={activeSlide} compact mobile={false} />
    </article>
  );
}

// ─── Original Mobile / Generic Carousel Panel ─────────────────────────────────
function HeritageCarouselPanel({
  slides,
  heightClass,
  imageSizes,
  slider,
  compactText = false,
  mobileText = false,
  className = "",
}) {
  const activeSlide = slides[slider.activeIndex] || slides[0];

  return (
    <article className={`group relative overflow-hidden ${className}`}>
      <div
        className={`relative isolate w-full overflow-hidden bg-[#1a1a1a] [transform:translateZ(0)] ${heightClass}`}
      >
        <SlideLayer
          slide={slides[slider.currentSlide]}
          sizes={imageSizes}
          imagePriority={slider.currentSlide === 0}
          exiting={slider.incomingSlide !== null}
          direction={slider.direction}
        />
        {slider.incomingSlide !== null && (
          <SlideLayer
            slide={slides[slider.incomingSlide]}
            entering
            overlay
            direction={slider.direction}
            sizes={imageSizes}
            onEnterAnimationEnd={slider.finishSlideTransition}
          />
        )}
      </div>
      <Overlay />
      <div
        className={`absolute z-[2] text-white ${
          mobileText
            ? "bottom-2 left-2 right-2 md:bottom-6 md:left-6 md:right-6"
            : "bottom-6 left-6 right-6"
        }`}
      >
        <h3
          className={`font-montserrat font-bold capitalize text-white ${
            mobileText
              ? "text-[10px] leading-[12px] md:text-[20px] md:leading-[100%]"
              : "text-[20px] leading-[100%]"
          } ${compactText ? "overflow-hidden text-ellipsis whitespace-nowrap" : ""}`}
        >
          {activeSlide.title}
        </h3>
        <p
          className={`mt-3 font-montserrat font-medium capitalize text-white ${
            mobileText
              ? "mt-1 text-[10px] leading-[15px] md:mt-3 md:text-[16px] md:leading-[25px]"
              : "text-[16px] leading-[25px]"
          } ${compactText ? "overflow-hidden text-ellipsis whitespace-nowrap" : ""}`}
        >
          {activeSlide.text}
        </p>
      </div>
    </article>
  );
}

// ─── Shared Sub-components ────────────────────────────────────────────────────
function Overlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
  );
}

function TextOverlay({ slide, compact, mobile }) {
  if (!slide) return null;
  return (
    <div
      className={`absolute z-[2] text-white ${
        mobile
          ? "bottom-2 left-2 right-2 md:bottom-6 md:left-6 md:right-6"
          : "bottom-6 left-6 right-6"
      }`}
    >
      <h3
        className={`font-montserrat font-bold capitalize text-white ${
          mobile
            ? "text-[10px] leading-[12px] md:text-[20px] md:leading-[100%]"
            : "text-[20px] leading-[100%]"
        } ${compact ? "overflow-hidden text-ellipsis whitespace-nowrap" : ""}`}
      >
        {slide.title}
      </h3>
      <p
        className={`font-montserrat font-medium capitalize text-white ${
          mobile
            ? "mt-1 text-[10px] leading-[15px] md:mt-3 md:text-[16px] md:leading-[25px]"
            : "mt-3 text-[16px] leading-[25px]"
        } ${compact ? "overflow-hidden text-ellipsis whitespace-nowrap" : ""}`}
      >
        {slide.text}
      </p>
    </div>
  );
}

function SlideLayer({
  slide,
  entering = false,
  exiting = false,
  overlay = false,
  direction = "next",
  onEnterAnimationEnd,
  imagePriority = false,
  sizes,
}) {
  const handleAnimationEnd = (e) => {
    if (!entering || !onEnterAnimationEnd) return;
    if (e.target !== e.currentTarget) return;
    onEnterAnimationEnd();
  };

  const animClass = entering
    ? direction === "next"
      ? "heritage-s3-card-in-next"
      : "heritage-s3-card-in-prev"
    : exiting
      ? direction === "next"
        ? "heritage-s3-card-out-next"
        : "heritage-s3-card-out-prev"
      : "";

  const isStacked = overlay || exiting;

  return (
    <div
      className={`h-full w-full overflow-hidden bg-[#1a1a1a] will-change-transform ${
        isStacked ? "absolute inset-0" : "relative"
      } ${overlay ? "z-10" : "z-0"} ${animClass}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        className="object-cover object-center"
        priority={imagePriority}
        sizes={sizes}
      />
    </div>
  );
}

// ─── CSS Animations ───────────────────────────────────────────────────────────
function Styles() {
  return (
    <style jsx global>{`
      @keyframes heritage-s3-card-in-next {
        from { transform: translateX(100%); }
        to   { transform: translateX(0); }
      }
      @keyframes heritage-s3-card-in-prev {
        from { transform: translateX(-100%); }
        to   { transform: translateX(0); }
      }
      @keyframes heritage-s3-card-out-next {
        from { transform: translateX(0); }
        to   { transform: translateX(-100%); }
      }
      @keyframes heritage-s3-card-out-prev {
        from { transform: translateX(0); }
        to   { transform: translateX(100%); }
      }
      .heritage-s3-card-in-next {
        animation: heritage-s3-card-in-next 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
      }
      .heritage-s3-card-in-prev {
        animation: heritage-s3-card-in-prev 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
      }
      .heritage-s3-card-out-next {
        animation: heritage-s3-card-out-next 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
      }
      .heritage-s3-card-out-prev {
        animation: heritage-s3-card-out-prev 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .heritage-s3-card-in-next,
        .heritage-s3-card-in-prev,
        .heritage-s3-card-out-next,
        .heritage-s3-card-out-prev {
          animation-duration: 0.35s;
          animation-timing-function: ease-out;
        }
      }
    `}</style>
  );
}
