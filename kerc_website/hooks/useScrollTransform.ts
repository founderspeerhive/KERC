import { useEffect, useState, useCallback } from 'react';
import { useScrollPosition } from './useScrollPosition';

interface ScrollTransformOptions {
  startValue: number;
  endValue: number;
  startOffset?: number;
  endOffset?: number;
  clamp?: boolean;
}

/**
 * A hook that transforms a value based on scroll position
 * @param options Configuration options for the transformation
 * @returns The transformed value
 */
export function useScrollTransform({
  startValue,
  endValue,
  startOffset = 0,
  endOffset = 1000,
  clamp = true,
}: ScrollTransformOptions): number {
  const scrollY = useScrollPosition();
  const [transformedValue, setTransformedValue] = useState(startValue);

  const calculateTransform = useCallback(() => {
    // Calculate the progress (0 to 1) based on scroll position
    const scrollProgress = (scrollY - startOffset) / (endOffset - startOffset);
    
    // Clamp the progress between 0 and 1 if needed
    const clampedProgress = clamp 
      ? Math.max(0, Math.min(1, scrollProgress)) 
      : scrollProgress;
    
    // Calculate the transformed value
    const newValue = startValue + (endValue - startValue) * clampedProgress;
    
    return newValue;
  }, [scrollY, startValue, endValue, startOffset, endOffset, clamp]);

  useEffect(() => {
    setTransformedValue(calculateTransform());
  }, [calculateTransform]);

  return transformedValue;
}

/**
 * A hook that provides multiple scroll-based transforms
 * @param sectionHeight The height of the section to base calculations on
 * @returns An object with various transform values
 */
export function useSectionTransforms(sectionHeight: number = 1000) {
  const scrollY = useScrollPosition();
  
  // Calculate the progress through the section (0 to 1)
  const progress = Math.max(0, Math.min(1, scrollY / sectionHeight));
  
  // Calculate various transform values
  const scale = 1 - progress * 0.1; // Scale from 1 to 0.9
  const borderRadius = progress * 40; // Border radius from 0 to 40px
  const perspective = 1000 - progress * 200; // Perspective from 1000 to 800
  const rotateX = progress * 5; // Rotate X from 0 to 5deg
  const opacity = 1 - progress * 0.3; // Opacity from 1 to 0.7
  
  return {
    progress,
    scale,
    borderRadius,
    perspective,
    rotateX,
    opacity
  };
}
