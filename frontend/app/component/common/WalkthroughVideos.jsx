"use client";

import { useEffect, useRef, useState } from "react";
import {
  PROJECT_WALKTHROUGH_VIDEOS,
  getYouTubeId,
  isDirectVideoUrl,
} from "./walkthroughVideos";

const WalkthroughVideos = ({ projectKey, video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const nativeVideoRef = useRef(null);

  const source =
    video || PROJECT_WALKTHROUGH_VIDEOS[projectKey] || null;
  const directVideoSrc = isDirectVideoUrl(source?.url)
    ? String(source.url).trim()
    : null;
  const youtubeId = directVideoSrc ? null : getYouTubeId(source?.url);
  const title = source?.title || "Project Walkthrough";
  const hasPlayableSource = Boolean(youtubeId || directVideoSrc);
  const thumbnail =
    source?.poster ||
    (youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : null);
  const embed = youtubeId
    ? `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`
    : null;

  useEffect(() => {
    if (!embed) return;
    const el = videoRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlaying(entry.isIntersecting && entry.intersectionRatio >= 0.4);
      },
      { threshold: [0, 0.4, 0.75, 1] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [embed]);

  useEffect(() => {
    if (!isPlaying || !directVideoSrc) return;
    const el = nativeVideoRef.current;
    if (!el) return;
    el.play().catch(() => {});
  }, [isPlaying, directVideoSrc]);

  const handlePlay = () => {
    if (hasPlayableSource) setIsPlaying(true);
  };

  return (
    <section id="walkthrough-videos" className="w-full pb-[35px] lg:pb-[70px]">
      <div className="mx-auto max-w-[1525px] px-5 sm:px-8 lg:px-[70px]">
        <h2 className="font-optima text-[28px] font-medium leading-[100%] tracking-[0] capitalize text-[#111111] md:text-[32px] lg:text-[36px] text-center md:text-left">
          Walkthrough Video
        </h2>
        <p className="mt-4 font-montserrat text-[16px] font-normal text-center md:text-left leading-[25px] md:leading-[28px] tracking-[0px] capitalize text-[#333333]">
          Take a closer look at the project through our video walkthrough.
        </p>

        <article className="mt-6 overflow-hidden bg-[#F5F5F5] md:mt-8">
          <div ref={videoRef} className="relative aspect-video w-full">
            {isPlaying && directVideoSrc ? (
              <video
                ref={nativeVideoRef}
                src={directVideoSrc}
                className="absolute inset-0 h-full w-full object-cover"
                controls
                autoPlay
                playsInline
                poster={thumbnail || undefined}
                aria-label={title}
              />
            ) : isPlaying && embed ? (
              <iframe
                title={title}
                src={embed}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={handlePlay}
                className={`group absolute inset-0 ${
                  hasPlayableSource ? "cursor-pointer" : "cursor-default"
                }`}
                aria-label={
                  hasPlayableSource ? `Play ${title}` : `${title} coming soon`
                }
                disabled={!hasPlayableSource}
              >
                {thumbnail ? (
                  <img
                    src={thumbnail}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 bg-[#F5F5F5]" />
                )}
                <span className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#652A27] text-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
                    <i className="ri-play-fill ml-0.5 text-[26px] leading-none sm:text-[30px]" />
                  </span>
                </span>
              </button>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export default WalkthroughVideos;
