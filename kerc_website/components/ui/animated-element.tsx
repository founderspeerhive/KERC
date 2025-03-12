"use client";

import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps, TargetAndTransition, VariantLabels } from 'framer-motion';
import { DURATIONS, EASINGS, VARIANTS } from '@/utils/animation-config';
import { cn } from '@/lib/utils';

export type AnimationVariant = keyof typeof VARIANTS;

interface AnimatedElementProps {
  /** The animation variant to use */
  variant?: AnimationVariant;
  /** Custom initial state */
  initialState?: TargetAndTransition;
  /** Custom animated state */
  animatedState?: TargetAndTransition;
  /** Whether the element is in view */
  isInView?: boolean;
  /** Animation delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Animation easing function */
  easing?: keyof typeof EASINGS;
  /** Additional CSS classes */
  className?: string;
  /** Whether to disable the animation */
  disabled?: boolean;
  /** Children elements */
  children: React.ReactNode;
  /** Whether to use viewport-relative units for positioning */
  useViewportUnits?: boolean;
  /** Whether to apply hover animations */
  enableHover?: boolean;
  /** Custom hover animation */
  hoverAnimation?: TargetAndTransition;
}

/**
 * A component that applies standardized animations to its children
 */
const AnimatedElement = forwardRef<HTMLDivElement, AnimatedElementProps & Omit<HTMLMotionProps<"div">, "ref" | "initial" | "animate" | "whileHover" | "transition">>(
  ({ 
    variant = 'fadeIn',
    initialState,
    animatedState,
    isInView = true,
    delay = 0,
    duration = DURATIONS.medium,
    easing = 'smooth',
    className,
    disabled = false,
    children,
    useViewportUnits = false,
    enableHover = false,
    hoverAnimation = { scale: 1.05 },
    ...props
  }, ref) => {
    // Get the animation variant from predefined variants
    const variantConfig = VARIANTS[variant];
    
    // Use custom states if provided, otherwise use the variant config
    const initial = initialState || variantConfig.hidden;
    const animate = isInView && !disabled 
      ? (animatedState || variantConfig.visible) 
      : variantConfig.hidden;
    
    // Configure transition
    const transition = {
      duration,
      delay,
      ease: EASINGS[easing],
    };

    // Configure hover animation if enabled
    const whileHover = enableHover ? hoverAnimation : undefined;
    
    return (
      <motion.div
        ref={ref}
        className={cn(useViewportUnits && "w-full h-full", className)}
        initial={initial}
        animate={animate}
        transition={transition}
        whileHover={whileHover}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedElement.displayName = "AnimatedElement";

export { AnimatedElement };
