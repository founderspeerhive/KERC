"use client";

import { useState, useEffect, RefObject } from "react";
import { useScrollPosition } from "./useScrollPosition";

export const useScrollTransition = (ref: RefObject<HTMLElement>) => {
  const scrollY = useScrollPosition();
  const [sectionHeight, setSectionHeight] = useState(800);
  const [sectionTop, setSectionTop] = useState(0);
  
  // Update section dimensions and position on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setSectionHeight(rect.height);
        setSectionTop(rect.top + window.scrollY);
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
    };
  }, [ref]);

  // Calculate scroll progress for exit transition
  const viewThreshold = sectionHeight * 0.15; // Start effect when 15% scrolled
  const scrollProgress = Math.max(
    0,
    Math.min(1, (scrollY - sectionTop + viewThreshold) / (sectionHeight * 0.3))
  );

  const style = {
    transform: scrollProgress === 0 ? 'none' : `scale(${1 - scrollProgress * 0.05})`,
    borderRadius: `${scrollProgress * 30}px`,
    transition: "transform 0.1s ease-out, border-radius 0.1s ease-out"
  };

  return {
    scrollProgress,
    style
  };
};
