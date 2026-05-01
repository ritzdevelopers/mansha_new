"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ImageSection = () => {
  const sectionRef = useRef(null);
  const [playReveal, setPlayReveal] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlayReveal(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="home-image-section" className="w-full bg-white">
      <div className="relative isolate w-full overflow-hidden [transform:translateZ(0)]">
        <div className={`${playReveal ? "image-section-slide-reveal" : ""}`}>
          <Image
            src="/mansha-image/home-second-section.jpg"
            alt="image-section"
            width={1600}
            height={900}
            className={`h-auto w-full object-cover ${playReveal ? "image-section-slide-zoom" : ""}`}
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes image-section-clip-reveal {
          from {
            clip-path: inset(0% 0% 0% 100%);
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
        .image-section-slide-reveal {
          animation: image-section-clip-reveal 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .image-section-slide-zoom {
          transform-origin: center center;
          animation: image-section-img-zoom 1.2s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default ImageSection;