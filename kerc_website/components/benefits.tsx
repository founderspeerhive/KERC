"use client";

import { ArrowRight, Users, Shield } from "lucide-react";
import React, { useRef } from "react";
import { Button } from "./ui/button";
import AnimatedSection from "./animated-section";
import { AnimatedElement } from "./ui/animated-element";
import { useSequencedAnimation } from "@/hooks/useSequencedAnimation";
import { VIEWPORT } from "@/utils/animation-config";

const Benefits = () => {
  const ref = useRef<HTMLElement>(null);
  const { isInView, getSequencedDelay } = useSequencedAnimation(ref, 2.0, VIEWPORT);

  return (
    <div>
      <section className="px-4 py-4" ref={ref}>
        <AnimatedSection className="overflow-hidden rounded-[2rem] bg-gray-200 dark:bg-slate-900">
          <div className="grid grid-cols-1 p-8 md:p-12 lg:p-16 lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimatedElement
                variant="fadeInUp"
                isInView={isInView}
                delay={getSequencedDelay(0)}
                className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6"
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
                tangible healthcare assets to deliver consistent returns to our
                stakeholders.
              </AnimatedElement>
              <ul className="space-y-4">
                <BenefitItem delay={getSequencedDelay(2)} isInView={isInView}>
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Secure Investment</h3>
                    <p className="text-sm text-muted-foreground">
                      Backed by physical healthcare facilities and equipment with
                      proven track records.
                    </p>
                  </div>
                </BenefitItem>
                <BenefitItem delay={getSequencedDelay(3)} isInView={isInView}>
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Community Governance</h3>
                    <p className="text-sm text-muted-foreground">
                      Token holders participate in key decisions through our
                      decentralized governance model.
                    </p>
                  </div>
                </BenefitItem>
                <BenefitItem delay={getSequencedDelay(4)} isInView={isInView}>
                  <ArrowRight className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Continuous Growth</h3>
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
                <Button>Learn More</Button>
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
      </section>
    </div>
  );
};

const BenefitItem = ({ 
  children, 
  delay, 
  isInView 
}: { 
  children: React.ReactNode, 
  delay: number,
  isInView: boolean
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
