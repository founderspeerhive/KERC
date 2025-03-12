"use client";

import { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  Banknote,
  Building2,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer } from "./ui/responsive-container";
import { AnimatedElement } from "./ui/animated-element";
import { useSequencedAnimation } from "@/hooks/useSequencedAnimation";
import { VIEWPORT } from "@/utils/animation-config";
import { CurvedSectionTransition } from "./ui/curved-section-transition";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const features = [
  {
    icon: Banknote,
    title: "Real-World Revenue",
    description: "Earn revenue from tangible healthcare operations",
  },
  {
    icon: Building2,
    title: "Medical Clinic Ownership",
    description: "KERC owns and operates medical clinics",
  },
  {
    icon: LineChart,
    title: "Growing Payouts",
    description: "Stable and increasing staking rewards",
  },
  {
    icon: ArrowUpRight,
    title: "Growth Market",
    description: "Revenue from one of the fastest growing healthcare sectors",
  },
  {
    icon: ShieldCheck,
    title: "Secure Investment",
    description: "Healthcare industry stability provides security",
  },
  {
    icon: Users,
    title: "Proven Management",
    description: "Experienced team with track record of success",
  },
];

export default function KercFeature() {
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
    window.addEventListener('scroll', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
    };
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
            className="max-w-3xl mx-auto text-center mb-12"
          >
            <h2 className="text-3xl text-white font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Discover the future of{" "}
              <span className="text-blue-400">passive income</span>
            </h2>
            <p className="text-xl text-gray-300">
              Earn effortlessly from the healthcare industry without any
              management headaches.
            </p>
          </AnimatedElement>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8 lg:px-16">
            {features.map((feature, index) => (
              <AnimatedElement
                key={index}
                variant="fadeInUp"
                isInView={isInView}
                delay={getSequencedDelay(index + 1)}
                className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-6 text-center shadow-sm backdrop-blur-sm"
              >
                <feature.icon className="h-8 w-8 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </ResponsiveContainer>
    </CurvedSectionTransition>
  );
}
