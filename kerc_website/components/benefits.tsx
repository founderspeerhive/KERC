"use client";

import { ArrowRight, Users, Shield } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "./ui/button";
import AnimatedSection from "./animated-section";
import { AnimatedElement } from "./ui/animated-element";
import { useSequencedAnimation } from "@/hooks/useSequencedAnimation";
import { VIEWPORT } from "@/utils/animation-config";
import { CurvedSectionTransition } from "./ui/curved-section-transition";
import { useScrollPosition } from "@/hooks/useScrollPosition";

const Benefits = () => {
  const ref = useRef<HTMLElement>(null);
  const { isInView, getSequencedDelay } = useSequencedAnimation(
    ref,
    2.0,
    VIEWPORT
  );
  const [sectionTop, setSectionTop] = useState<number>(0);
  const [sectionHeight, setSectionHeight] = useState<number>(800);
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const scrollY = useScrollPosition();

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
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  // Calculate the scroll progress for transition effects
  // Only apply effects when scrolling out of the section
  const viewThreshold = sectionHeight * 0.15; // Start effect when 15% scrolled
  const exitProgress = Math.max(
    0,
    Math.min(1, (scrollY - sectionTop + viewThreshold) / (sectionHeight * 0.3))
  );

  // Calculate entry progress for when section is entering viewport
  const distanceFromViewport = sectionTop - scrollY - viewportHeight;
  const entryThreshold = viewportHeight * 0.9; // Start effect when 90% of viewport away
  const entryProgress =
    distanceFromViewport <= 0
      ? 0
      : Math.min(1, distanceFromViewport / entryThreshold);

  return (
    <div>
      <section className="px-4 py-4" ref={ref}>
        <CurvedSectionTransition
          isExiting={true}
          isEntering={true}
          position="bottom"
          curveHeight={exitProgress * 100}
          bgColor="transparent"
          className="relative w-full min-h-screen"
        >
          <AnimatedSection className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-gray-900 to-gray-800">
            <div className="grid grid-cols-1 p-8 md:p-12 lg:p-16 lg:grid-cols-2 gap-12 items-center">
              <div>
                <AnimatedElement
                  variant="fadeInUp"
                  isInView={isInView}
                  delay={getSequencedDelay(0)}
                  className="text-3xl font-bold text-white tracking-tighter sm:text-4xl mb-6"
                >
                  Real World Assets with Real Returns
                </AnimatedElement>
                <AnimatedElement
                  variant="fadeIn"
                  isInView={isInView}
                  delay={getSequencedDelay(1)}
                  className="text-xl mb-8 text-muted-foreground"
                >
                  KERC combines the benefits of blockchain technology with
                  tangible healthcare assets to deliver consistent returns to
                  our stakeholders.
                </AnimatedElement>
                <ul className="space-y-4">
                  <BenefitItem delay={getSequencedDelay(2)} isInView={isInView}>
                    <Shield className="h-5 w-5 text-white" />
                    <div>
                      <h3 className="font-medium text-white">
                        Secure Investment
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Backed by physical healthcare facilities and equipment
                        with proven track records.
                      </p>
                    </div>
                  </BenefitItem>
                  <BenefitItem delay={getSequencedDelay(3)} isInView={isInView}>
                    <Users className="h-5 w-5 text-white" />
                    <div>
                      <h3 className="font-medium text-white">
                        Community Governance
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Token holders participate in key decisions through our
                        decentralized governance model.
                      </p>
                    </div>
                  </BenefitItem>
                  <BenefitItem delay={getSequencedDelay(4)} isInView={isInView}>
                    <ArrowRight className="h-5 w-5 text-white" />
                    <div>
                      <h3 className="font-medium text-white">
                        Continuous Growth
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Strategic expansion into new healthcare markets and
                        technologies.
                      </p>
                    </div>
                  </BenefitItem>
                </ul>
                <AnimatedElement
                  variant="fadeInUp"
                  isInView={isInView}
                  delay={getSequencedDelay(5)}
                  className="mt-8"
                >
                  <Button className=" bg-white text-black">Learn More</Button>
                </AnimatedElement>
              </div>
              <AnimatedElement
                variant="scaleIn"
                isInView={isInView}
                delay={getSequencedDelay(1)}
                easing="spring"
                className="relative aspect-square bg-gradient-to-br from-primary to-primary-foreground rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-grid-white/10" />
              </AnimatedElement>
            </div>
          </AnimatedSection>
        </CurvedSectionTransition>
      </section>
    </div>
  );
};

const BenefitItem = ({
  children,
  delay,
  isInView,
}: {
  children: React.ReactNode;
  delay: number;
  isInView: boolean;
}) => {
  return (
    <AnimatedElement
      variant="fadeInLeft"
      isInView={isInView}
      delay={delay}
      enableHover={true}
      hoverAnimation={{ x: 5 }}
      className="flex items-start gap-3"
    >
      {children}
    </AnimatedElement>
  );
};

export default Benefits;
