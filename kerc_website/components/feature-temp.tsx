"use client";

import { Building, ChevronRight, Shield, BarChart3 } from "lucide-react";
import React, { useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { ResponsiveContainer } from "./ui/responsive-container";
import { AnimatedElement } from "./ui/animated-element";
import { useSequencedAnimation } from "@/hooks/useSequencedAnimation";
import { VIEWPORT } from "@/utils/animation-config";
import { CurvedSectionTransition } from "./ui/curved-section-transition";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const Feature = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isInView, getSequencedDelay } = useSequencedAnimation(
    ref,
    2.0,
    VIEWPORT
  );
  
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
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate scroll progress for exit transition
  const viewThreshold = sectionHeight * 0.15; // Start effect when 15% scrolled
  const scrollProgress = Math.max(
    0,
    Math.min(1, (scrollY - sectionTop + viewThreshold) / (sectionHeight * 0.3))
  );

  return (
    <CurvedSectionTransition
      isExiting={true}
      position="bottom"
      curveHeight={scrollProgress * 100}
      bgColor="transparent"
      className="relative w-full min-h-screen"
    >
      <ResponsiveContainer
        ref={ref}
        className="relative w-full min-h-screen"
        gradient={true}
        gradientFrom="gray-900"
        gradientTo="gray-800"
        padding={false}
        maxWidth="none"
        fullWidth={true}
        style={{
          transform: scrollProgress === 0 ? 'none' : `scale(${1 - scrollProgress * 0.05})`,
          borderRadius: `${scrollProgress * 30}px`,
          transition: "transform 0.1s ease-out, border-radius 0.1s ease-out"
        }}
      >
        <div className="container mx-auto relative z-10 flex flex-col justify-center h-full py-16 min-h-screen">
          <AnimatedElement
            variant="fadeInUp"
            isInView={isInView}
            delay={getSequencedDelay(0)}
            className="text-center mb-12"
          >
            <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              What we do
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We're innovating the healthcare industry in SE Asia
            </p>
          </AnimatedElement>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-8 lg:p-12">
            {/* Feature 1 - Large Card */}
            <AnimatedElement
              variant="fadeInUp"
              isInView={isInView}
              delay={getSequencedDelay(1)}
              className="md:col-span-2 bg-gray-200 p-8 rounded-xl flex flex-col justify-between h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div>
                <Building className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-black">
                  Strategic Acquisitions
                </h3>
                <p className="text-black mb-6">
                  We acquire and optimize healthcare facilities to improve
                  patient care and increase profitability. Our strategic
                  approach focuses on clinics with high growth potential.
                </p>
              </div>
              <div className="flex items-center text-blue-600 font-medium group transition-all duration-300">
                <span>Learn more</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </AnimatedElement>

            {/* Feature 2 - Vertical Card */}
            <AnimatedElement
              variant="fadeInUp"
              isInView={isInView}
              delay={getSequencedDelay(2)}
              className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div>
                <Shield className="h-12 w-12 text-blue-200 mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Cutting-Edge Technology
                </h3>
                <p className="text-blue-100 mb-6">
                  Our Web3 solutions provide transparency, security, and
                  efficiency in healthcare operations.
                </p>
              </div>
              <div className="flex items-center text-blue-200 font-medium group transition-all duration-300">
                <span>Explore</span>
                <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </AnimatedElement>

            {/* Feature 3 - Small Card */}
            <AnimatedElement
              variant="fadeInUp"
              isInView={isInView}
              delay={getSequencedDelay(3)}
              className="bg-blue-50 dark:bg-blue-950/50 p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Enhanced Performance</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We optimize operations to deliver better patient outcomes and
                increased revenue.
              </p>
            </AnimatedElement>

            {/* Feature 4 - Wide Card */}
            <AnimatedElement
              variant="fadeInUp"
              isInView={isInView}
              delay={getSequencedDelay(4)}
              className="md:col-span-2 bg-gradient-to-r from-slate-800 to-blue-900 text-white p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-3">
                    Join the KERC Ecosystem
                  </h3>
                  <p className="mb-6">
                    Be part of the transformation of healthcare through
                    blockchain technology and Web3 solutions.
                  </p>
                  <Button className="bg-white text-blue-700 hover:bg-blue-50 transition-all duration-300 hover:scale-[1.05] active:scale-[0.95]">
                    Buy KERC
                  </Button>
                </div>
                <AnimatedElement
                  variant="scaleIn"
                  isInView={isInView}
                  delay={getSequencedDelay(5)}
                  easing="spring"
                  className="md:w-1/2 flex justify-center transition-all duration-300 hover:rotate-3 hover:scale-110"
                >
                  <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-blue-400">
                    <Image
                      src="/placeholder.svg?height=160&width=160"
                      alt="KERC Token"
                      fill
                      className="object-cover"
                    />
                  </div>
                </AnimatedElement>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </ResponsiveContainer>
    </CurvedSectionTransition>
  );
};

export default Feature;
