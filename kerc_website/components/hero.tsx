"use client";

import React, { useRef, useEffect } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import Stats from "../components/sats";
import { ResponsiveContainer } from "./ui/responsive-container";
import { AnimatedElement } from "./ui/animated-element";
import { useSequencedAnimation } from "@/hooks/useSequencedAnimation";
import { VIEWPORT } from "@/utils/animation-config";
import { CurvedSectionTransition } from "./ui/curved-section-transition";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { isInView, getSequencedDelay } = useSequencedAnimation(
    ref,
    2.0,
    VIEWPORT
  );
  
  const scrollY = useScrollPosition();
  const heroHeight = 800; // Approximate height of hero section
  const scrollProgress = Math.min(1, scrollY / heroHeight);

  return (
    <CurvedSectionTransition
      isExiting={true}
      position="bottom"
      curveHeight={scrollProgress * 100}
      bgColor="transparent"
      className="relative w-full"
    >
      <ResponsiveContainer
        ref={ref}
        className="relative w-full"
        gradient={true}
        gradientFrom="blue-900"
        gradientTo="indigo-800"
        padding={false}
        maxWidth="none"
        fullWidth={true}
        style={{
          transform: `scale(${1 - scrollProgress * 0.05})`,
          borderRadius: `${scrollProgress * 30}px`,
          transition: "transform 0.1s ease-out, border-radius 0.1s ease-out",
        }}
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-900 to-indigo-800">
          <Image
            src="/globe.svg"
            alt="Healthcare global network"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="container mx-auto relative z-10 grid gap-8 md:grid-cols-2 items-center p-6 md:p-12 lg:p-16 h-full">
          {/* Left Content */}
          <AnimatedElement
            variant="fadeInLeft"
            isInView={isInView}
            className="flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <AnimatedElement
                variant="fadeInUp"
                isInView={isInView}
                delay={getSequencedDelay(0)}
                className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl lg:leading-tight"
              >
                Transforming
                <br />
                <AnimatedElement
                  variant="scaleIn"
                  isInView={isInView}
                  delay={getSequencedDelay(1)}
                  className="text-blue-400"
                >
                  healthcare
                </AnimatedElement>
                <br />
                with Web3
              </AnimatedElement>
              <AnimatedElement
                variant="fadeIn"
                isInView={isInView}
                delay={getSequencedDelay(2)}
                className="max-w-md text-lg text-gray-200"
              >
                KERC is a Real World Assets crypto project focused on healthcare,
                the world's biggest industry. We use Web 3 and our proprietary
                tools to enhance patient outcomes, increase profitability, and
                improve the way healthcare facilities operate.
              </AnimatedElement>
            </div>

            {/* Tags */}
            <AnimatedElement
              variant="fadeInUp"
              isInView={isInView}
              delay={getSequencedDelay(3)}
              className="flex flex-wrap gap-4"
            >
              <Tag letter="R">Real World Assets</Tag>
              <Tag letter="H">Healthcare Focus</Tag>
              <Tag letter="W">Web3 Innovation</Tag>
            </AnimatedElement>

            {/* CTA Button */}
            <AnimatedElement
              variant="fadeInUp"
              isInView={isInView}
              delay={getSequencedDelay(4)}
              className="flex gap-4"
            >
              <a
                href="#"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
              >
                Buy KERC
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Learn More
              </a>
            </AnimatedElement>
          </AnimatedElement>

          {/* Right Content - Healthcare Illustration */}
          <AnimatedElement
            variant="scaleIn"
            isInView={isInView}
            delay={getSequencedDelay(1)}
            className="flex items-center justify-center"
          >
            <div className="relative h-80 w-80 md:h-96 md:w-96 overflow-hidden rounded-full border-4 border-white/20">
              <Image
                src="/globe.svg"
                alt="Healthcare technology"
                fill
                className="object-cover p-8"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatedElement
                  variant="scaleIn"
                  isInView={isInView}
                  delay={getSequencedDelay(2)}
                  easing="spring"
                  className="rounded-full bg-blue-500/20 p-12"
                >
                  <span className="text-2xl font-bold text-white">KERC</span>
                </AnimatedElement>
              </div>
            </div>
          </AnimatedElement>

          {/* Scroll Indicator */}
          <AnimatedElement
            variant="fadeIn"
            isInView={isInView}
            delay={getSequencedDelay(5)}
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
          >
            <button
              className="rounded-full border border-white/30 p-3 text-white transition-colors hover:bg-white/10"
              aria-label="Scroll down"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          </AnimatedElement>
        </div>

        {/* Stats Section */}
        <div className="relative z-20 w-full">
          <Stats />
        </div>
      </ResponsiveContainer>
    </CurvedSectionTransition>
  );
}

function Tag({
  children,
  letter,
}: {
  children: React.ReactNode;
  letter: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold">
        {letter}
      </span>
      {children}
    </div>
  );
}
