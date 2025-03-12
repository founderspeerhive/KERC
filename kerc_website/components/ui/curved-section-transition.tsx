"use client";

import React, { forwardRef, useRef, useEffect, useState } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

interface CurvedSectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  position?: "top" | "bottom";
  isExiting?: boolean;
  isEntering?: boolean;
  curveHeight?: number;
  bgColor?: string;
}

export const CurvedSectionTransition = forwardRef<HTMLDivElement, CurvedSectionTransitionProps>(
  ({ 
    children, 
    className, 
    position = "bottom", 
    isExiting = false, 
    isEntering = false,
    curveHeight = 100,
    bgColor = "white",
    ...props 
  }, ref) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
    });

    // Calculate curve parameters based on scroll progress
    const curveFactor = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      isExiting ? [0, curveHeight/2, curveHeight] : isEntering ? [curveHeight, curveHeight/2, 0] : [0, 0, 0]
    );

    const scale = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      isExiting ? [1, 0.98, 0.95] : isEntering ? [0.95, 0.98, 1] : [1, 1, 1]
    );

    const borderRadius = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      isExiting ? [0, 20, 40] : isEntering ? [40, 20, 0] : [0, 0, 0]
    );

    // Generate the SVG path for the curved edge
    const [path, setPath] = useState("");

    useEffect(() => {
      const updatePath = () => {
        const curveValue = curveFactor.get();
        
        if (position === "bottom") {
          setPath(`M0,0 L100,0 L100,calc(100% - ${curveValue}px) Q50,100% 0,calc(100% - ${curveValue}px) Z`);
        } else {
          setPath(`M0,${curveValue}px Q50,0 100,${curveValue}px L100,100% L0,100% Z`);
        }
      };

      const unsubscribe = curveFactor.on("change", updatePath);
      updatePath(); // Initial update

      return () => unsubscribe();
    }, [curveFactor, position]);

    return (
      <motion.div
        ref={sectionRef}
        className={cn("relative w-full overflow-hidden", className)}
        style={{
          scale,
          borderRadius,
        }}
        {...props}
      >
        <div ref={ref} className="relative z-10 w-full h-full">
          {children}
        </div>
        
        {/* SVG mask for curved edge */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <svg
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
            className="absolute inset-0"
          >
            <path
              d={path}
              fill={bgColor}
              className="transition-all duration-300 ease-out"
            />
          </svg>
        </div>
      </motion.div>
    );
  }
);

CurvedSectionTransition.displayName = "CurvedSectionTransition";
