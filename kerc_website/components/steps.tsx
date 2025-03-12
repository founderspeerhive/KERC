"use client";

import React, { useRef, useState, useEffect } from "react";
import { ResponsiveContainer } from "./ui/responsive-container";
import { AnimatedElement } from "./ui/animated-element";
import { useSequencedAnimation } from "@/hooks/useSequencedAnimation";
import { VIEWPORT } from "@/utils/animation-config";
import { Coins, PiggyBank, UserRoundCheck } from "lucide-react";
import { CurvedSectionTransition } from "./ui/curved-section-transition";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const Steps = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isInView, getSequencedDelay } = useSequencedAnimation(ref, 3.0, VIEWPORT);
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

  const steps = [
    {
      number: "01",
      title: "Get KERC tokens",
      description: "Step 1",
      icon: <Coins className="h-12 w-12 text-gray-700" />,
      color: "bg-purple-50",
      numberColor: "text-purple-500",
    },
    {
      number: "02",
      title: "Stake KERC tokens",
      description: "Step 2",
      icon: <PiggyBank className="h-12 w-12 text-gray-700" />,
      color: "bg-blue-50",
      numberColor: "text-blue-500",
    },
    {
      number: "03",
      title: "Enjoy the benefits",
      description: "Step 3",
      icon: <UserRoundCheck className="h-12 w-12 text-gray-700" />,
      color: "bg-green-50",
      numberColor: "text-green-500",
    },
  ];

  return (
    <CurvedSectionTransition
      isExiting={true}
      isEntering={true}
      position="bottom"
      curveHeight={exitProgress * 100}
      bgColor="transparent"
      className="relative w-full min-h-screen"
    >
      <ResponsiveContainer 
        ref={ref} 
        className="relative w-full"
        maxWidth="none"
        fullWidth={true}
      >
        <div className="bg-white dark:bg-slate-950 py-16 md:py-24 w-full">
          <div className="container mx-auto px-4 md:px-6">
            <AnimatedElement
              variant="fadeInUp"
              isInView={isInView}
              delay={getSequencedDelay(0)}
              className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How to Get Started
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-xl">
                Step-by-step guide to getting started with KERC
              </p>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, index) => (
                <AnimatedElement
                  key={step.number}
                  variant="fadeInUp"
                  isInView={isInView}
                  delay={getSequencedDelay(index + 1)}
                  className={`relative ${step.color} p-6 rounded-xl transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg`}
                >
                  <div className={`absolute -left-5 -top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white ${step.numberColor} font-bold shadow-md animate-in scale-in-50 duration-300`}>
                    {step.number}
                  </div>
                  <div className="pt-6">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-500">{step.description}</p>
                  </div>
                  <div className="mt-4">
                    {step.icon}
                  </div>
                  <div className="mt-4 h-1 w-full bg-gradient-to-r from-primary to-primary/20 rounded-full animate-in fade-in duration-500 delay-300">
                    <div className="h-1 w-full"></div>
                  </div>
                </AnimatedElement>
              ))}
            </div>

            <AnimatedElement
              variant="fadeInUp"
              isInView={isInView}
              delay={getSequencedDelay(steps.length + 1)}
              className="flex justify-center mt-12 md:mt-16"
            >
              <div className="relative p-6 bg-blue-50 dark:bg-blue-950/30 rounded-xl max-w-2xl">
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded-full animate-in fade-in duration-300 delay-500"></div>
                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-blue-200 dark:bg-blue-800 rounded-full animate-in fade-in duration-300 delay-700"></div>
                <p className="text-center text-blue-800 dark:text-blue-200 font-medium">
                  Start your journey with KERC today!
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </ResponsiveContainer>
    </CurvedSectionTransition>
  );
};

export default Steps;
