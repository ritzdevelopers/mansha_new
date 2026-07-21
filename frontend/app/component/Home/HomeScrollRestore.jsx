"use client";

import { useEffect } from "react";
import {
  clearHomeScrollPosition,
  getHomeScrollPosition,
  scrollToHomePosition,
} from "../common/homeScroll";

const HomeScrollRestore = () => {
  useEffect(() => {
    const y = getHomeScrollPosition();
    if (y === null) return;

    const runRestore = () => scrollToHomePosition(y);

    runRestore();
    requestAnimationFrame(runRestore);

    const timers = [0, 50, 150, 300, 500].map((delay) =>
      window.setTimeout(runRestore, delay)
    );

    const clearTimer = window.setTimeout(clearHomeScrollPosition, 600);

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(clearTimer);
    };
  }, []);

  return null;
};

export default HomeScrollRestore;
