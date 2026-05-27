import React from "react";

const OAKS_VIDEO_SRC = "/oaks/MANSHA-OAKS.mp4";

const Section3 = () => {
  return (
    <section className="w-full pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <div className="relative aspect-video w-full overflow-hidden bg-[#F5F5F5] sm:min-h-[320px] lg:min-h-[540px]">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Mansha Oaks project video"
          >
            <source src={OAKS_VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default Section3;
