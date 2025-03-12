"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function AnimatedSection({ 
  children, 
  className = "", 
  id 
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Animation variants
  const sectionVariants: Variants = {
    hidden: { 
      scale: 0.95,
      opacity: 0.5,
      borderRadius: "3rem"
    },
    visible: { 
      scale: 1,
      opacity: 1,
      borderRadius: "2rem",
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      if (!hasAnimated) {
        setHasAnimated(true);
      }
    } else if (!hasAnimated) {
      controls.start("hidden");
    }
  }, [isInView, controls, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      id={id}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
