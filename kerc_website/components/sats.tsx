"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatedElement } from "./ui/animated-element";
import { useSequencedAnimation } from "@/hooks/useSequencedAnimation";
import { VIEWPORT } from "@/utils/animation-config";
import { CurvedSectionTransition } from "./ui/curved-section-transition";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const Sats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isInView, getSequencedDelay } = useSequencedAnimation(ref, 2.0, VIEWPORT);
  const scrollY = useScrollPosition();
  const [sectionTop, setSectionTop] = useState<number>(0);
  const [sectionHeight, setSectionHeight] = useState<number>(800);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  // Calculate the position of this section relative to viewport
  useEffect(() => {
    const updatePosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setSectionTop(rect.top + window.scrollY);
        setSectionHeight(rect.height);
        setViewportHeight(window.innerHeight);
      }
    };

    // Initial calculation
    updatePosition();

    // Update on resize
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  // Calculate the scroll progress for transition effects
  // Only apply effects when scrolling out of the section
  const viewThreshold = sectionHeight * 0.15; // Start effect when 15% scrolled
  const exitProgress = Math.max(0, Math.min(1, 
    (scrollY - sectionTop + viewThreshold) / (sectionHeight * 0.3)
  ));
  
  // Calculate entry progress for when section is entering viewport
  const distanceFromViewport = sectionTop - scrollY - viewportHeight;
  const entryThreshold = viewportHeight * 0.9; // Start effect when 90% of viewport away
  const entryProgress = distanceFromViewport <= 0 ? 0 : 
                      Math.min(1, distanceFromViewport / entryThreshold);

  const statsData = [
    {
      value: "3",
      description: "Clinics acquired and operating",
    },
    {
      value: "+30%",
      description: "Revenue increase per clinic",
    },
    {
      value: "$400000+",
      description: "Paid Out to Stakers",
    }
  ];

  return (
    <CurvedSectionTransition
      isExiting={true}
      isEntering={true}
      position="bottom"
      curveHeight={exitProgress * 100}
      bgColor="transparent"
      className="relative w-full"
    >
      <div 
        ref={ref} 
        className="relative z-20 w-full bg-white/10 backdrop-blur-md border-t border-white/20 py-6 mt-auto"
      >
        <AnimatedElement
          variant="fadeInUp"
          isInView={isInView}
          delay={getSequencedDelay(0)}
          className="container mx-auto px-4"
        >
          <div className="grid grid-cols-3 gap-6">
            {statsData.map((stat, index) => (
              <AnimatedElement
                key={index}
                variant="fadeInUp"
                isInView={isInView}
                delay={getSequencedDelay(index + 1)}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-300">
                  {stat.description}
                </div>
              </AnimatedElement>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </CurvedSectionTransition>
  );
};

export default Sats;
