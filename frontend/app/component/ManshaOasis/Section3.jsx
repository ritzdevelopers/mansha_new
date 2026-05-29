"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 3200;

const LEFT_SLIDES = [
  {
    src: "/oasis/oasisslider1.jpg",
    alt: "A terrace for every home",
    title: "Elevated Living",
    text: " Terraces, skyline views, clubhouse, fitness, and lush greenery—crafted for a refined lifestyle.",
  },
  {
    src: "/oasis/oasisslider2.jpg",
    alt: "Club with lawn",
    title: "Life Above It All",
    text: " Where terraces, skyline, clubhouse, fitness, and greenery come together seamlessly.",
  },
  {
    src: "/oasis/oasisslider3.jpg",
    alt: "Club pool",
    title: "The Art of Living Well",
    text: " A perfect blend of terraces, skyline, clubhouse, fitness, and green open spaces.",
  },
];

const RIGHT_SLIDES = [
  {
    src: "/oasis/oasisslider-4.jpg",
    alt: "Linear greens and themed landscapes",
    title: "Designed for Balance",
    text: " From terraces to skyline views, clubhouse to fitness and greenery—every detail matters.",
  },
  {
    src: "/oasis/oasisslider-5.jpg",
    alt: "Gym",
    title: "Everyday Luxury",
    text: "A lifestyle that defines excellence, shaped by thoughtful design and refined living.",
  },
  
];

const ALL_SLIDES = [...LEFT_SLIDES, ...RIGHT_SLIDES];

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

function useConnectedSlider(length) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [previewIdx, setPreviewIdx] = useState(1 % length);
  const [leftIncoming, setLeftIncoming] = useState(null);
  const [rightIncoming, setRightIncoming] = useState(null);
  const [direction, setDirection] = useState("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const pendingRef = useRef(null);

  const finishLeft = useCallback(() => {
    if (pendingRef.current === null) return;
    setCurrentIdx(pendingRef.current.nextCurrent);
    setLeftIncoming(null);
  }, []);

  const finishRight = useCallback(() => {
    if (pendingRef.current === null) return;
    setPreviewIdx(pendingRef.current.nextPreview);
    setRightIncoming(null);
    setIsAnimating(false);
    pendingRef.current = null;
  }, []);

  const goNext = useCallback(() => {
    if (isAnimating) return;
    const nextCurrent = previewIdx;
    const nextPreview = (previewIdx + 1) % length;
    setDirection("next");
    pendingRef.current = { nextCurrent, nextPreview };
    setLeftIncoming(nextCurrent);
    setRightIncoming(nextPreview);
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

const Section3 = () => {
  const connected = useConnectedSlider(ALL_SLIDES.length);
  const mobile = useStorySlider(ALL_SLIDES.length);

  const [isSectionInView, setIsSectionInView] = useState(false);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

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
    timerRef.current = setInterval(advanceAll, AUTOPLAY_MS);
  }, [advanceAll]);

  useEffect(() => {
    if (!isSectionInView) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    timerRef.current = setInterval(advanceAll, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSectionInView, advanceAll]);

  const handlePrev = () => {
    retreatAll();
    resetTimer();
  };
  const handleNext = () => {
    advanceAll();
    resetTimer();
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#FCFCFC] py-[35px] lg:py-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <h2 className="text-center font-optima text-[28px] font-[500] capitalize leading-[54px] text-[#000000] md:text-left md:text-[36px]">
          Essence of Excellence
        </h2>

        <div className="mt-6 hidden grid-cols-1 gap-4 xl:grid xl:grid-cols-[3fr_1fr]">
          <ConnectedLeftPanel
            currentSlide={ALL_SLIDES[connected.currentIdx]}
            incomingSlide={
              connected.leftIncoming !== null ? ALL_SLIDES[connected.leftIncoming] : null
            }
            direction={connected.direction}
            onAnimationEnd={connected.finishLeft}
            heightClass="h-[496px]"
            imageSizes="(max-width: 1024px) 100vw, 75vw"
          />
          <ConnectedRightPanel
            currentSlide={ALL_SLIDES[connected.previewIdx]}
            incomingSlide={
              connected.rightIncoming !== null ? ALL_SLIDES[connected.rightIncoming] : null
            }
            direction={connected.direction}
            onAnimationEnd={connected.finishRight}
            heightClass="h-[496px]"
            imageSizes="(max-width: 1024px) 100vw, 25vw"
          />
        </div>

        <OasisCarouselPanel
          slides={ALL_SLIDES}
          heightClass="h-[150px] md:h-[330px] lg:h-[380px]"
          imageSizes="100vw"
          compactText
          className="relative mt-2 overflow-hidden md:mt-6 xl:hidden"
          mobileText
          slider={mobile}
        />

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
        <SlideLayer
          slide={currentSlide}
          sizes={imageSizes}
          imagePriority
          exiting={!!incomingSlide}
          direction={direction}
        />
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
        <SlideLayer
          slide={currentSlide}
          sizes={imageSizes}
          exiting={!!incomingSlide}
          direction={direction}
        />
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

function OasisCarouselPanel({
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
          className={`font-montserrat font-medium capitalize text-white ${
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
      ? "oasis-s3-card-in-next"
      : "oasis-s3-card-in-prev"
    : exiting
      ? direction === "next"
        ? "oasis-s3-card-out-next"
        : "oasis-s3-card-out-prev"
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

function Styles() {
  return (
    <style jsx global>{`
      @keyframes oasis-s3-card-in-next {
        from {
          transform: translateX(100%);
        }
        to {
          transform: translateX(0);
        }
      }
      @keyframes oasis-s3-card-in-prev {
        from {
          transform: translateX(-100%);
        }
        to {
          transform: translateX(0);
        }
      }
      @keyframes oasis-s3-card-out-next {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-100%);
        }
      }
      @keyframes oasis-s3-card-out-prev {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(100%);
        }
      }
      .oasis-s3-card-in-next {
        animation: oasis-s3-card-in-next 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
      }
      .oasis-s3-card-in-prev {
        animation: oasis-s3-card-in-prev 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
      }
      .oasis-s3-card-out-next {
        animation: oasis-s3-card-out-next 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
      }
      .oasis-s3-card-out-prev {
        animation: oasis-s3-card-out-prev 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .oasis-s3-card-in-next,
        .oasis-s3-card-in-prev,
        .oasis-s3-card-out-next,
        .oasis-s3-card-out-prev {
          animation-duration: 0.35s;
          animation-timing-function: ease-out;
        }
      }
    `}</style>
  );
}
