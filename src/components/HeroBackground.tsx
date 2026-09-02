"use client";

import { useEffect, useRef } from "react";

export function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // The clip holds on its last frame for a beat, and the native `loop`
    // wrap adds its own hitch on top. Jump back to the start a hair early
    // so the loop reads as one continuous shot with no pause.
    const RESTART_BEFORE_END = 0.45;

    function restartIfNearEnd() {
      if (!video || !video.duration) return;
      if (video.currentTime >= video.duration - RESTART_BEFORE_END) {
        video.currentTime = 0;
        void video.play().catch(() => {});
      }
    }

    video.addEventListener("timeupdate", restartIfNearEnd);
    // Fallback in case timeupdate misses the window on a slow frame.
    video.addEventListener("ended", () => {
      video.currentTime = 0;
      void video.play().catch(() => {});
    });

    return () => {
      video.removeEventListener("timeupdate", restartIfNearEnd);
    };
  }, []);

  return (
    // Capped to one screen height and anchored to the top: on mobile the
    // hero's content stack runs taller than 100vh, and letting the video
    // stretch to cover that full height crushed it down to a dead, faded
    // sliver by the time the section actually ended. Past one screen the
    // section's own bg-ink shows through instead.
    <div aria-hidden="true" className="absolute inset-x-0 top-[132px] h-screen overflow-hidden sm:top-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/hero/office.jpg"
        className="absolute inset-0 h-full w-full object-contain object-top sm:object-cover sm:object-center"
      >
        <source src="/hero/office.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay to mute the footage and keep hero text readable. */}
      <div className="absolute inset-0 bg-ink/50" />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-ink" />
    </div>
  );
}
