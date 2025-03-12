"use client";

import React, { useRef } from "react";
import { AnimatedElement } from "./ui/animated-element";
import { useSequencedAnimation } from "@/hooks/useSequencedAnimation";
import { VIEWPORT } from "@/utils/animation-config";

const Sats = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isInView, getSequencedDelay } = useSequencedAnimation(ref, 2.0, VIEWPORT);

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
  );
};

export default Sats;
