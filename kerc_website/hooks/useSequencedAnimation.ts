import { useState, useEffect, useCallback } from 'react';
import { useInView } from 'framer-motion';
import { DURATIONS } from '@/utils/animation-config';

/**
 * Custom hook to manage sequenced animations and prevent overlapping transitions
 * 
 * @param ref - React ref object attached to the container element
 * @param totalDuration - Total duration of all animations in sequence
 * @param viewportOptions - Options for the useInView hook
 * @returns Object containing animation state and helper functions
 */
export function useSequencedAnimation(
  ref: React.RefObject<HTMLElement | null>,
  totalDuration: number = 1.5,
  viewportOptions = { once: false, amount: 0.3 }
) {
  const isInView = useInView(ref, viewportOptions);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animationSequence, setAnimationSequence] = useState<{
    current: number;
    total: number;
    inProgress: boolean;
  }>({
    current: 0,
    total: 0,
    inProgress: false,
  });

  // Reset animation state when element leaves viewport
  useEffect(() => {
    if (!isInView) {
      setAnimationComplete(false);
      setAnimationSequence({
        current: 0,
        total: 0,
        inProgress: false,
      });
    }
  }, [isInView]);

  // Start animation sequence when element enters viewport
  useEffect(() => {
    if (isInView && !animationComplete && !animationSequence.inProgress) {
      setAnimationSequence(prev => ({
        ...prev,
        inProgress: true,
      }));

      // Mark animation as complete after total duration
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        setAnimationSequence(prev => ({
          ...prev,
          inProgress: false,
        }));
      }, totalDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, animationComplete, animationSequence.inProgress, totalDuration]);

  /**
   * Calculate delay for an animation in the sequence
   * 
   * @param index - Position in the animation sequence (0-based)
   * @param customDelay - Optional additional delay to add
   * @returns Calculated delay in seconds
   */
  const getSequencedDelay = useCallback((index: number, customDelay: number = 0): number => {
    // Base delay calculation
    const baseDelay = index * DURATIONS.fast;
    
    return baseDelay + customDelay;
  }, []);

  // Handle sequence tracking separately in an effect
  useEffect(() => {
    if (isInView && !animationComplete) {
      // Update the max sequence values based on what's been requested
      const maxIndex = Math.max(...Array.from({ length: 20 }, (_, i) => i));
      setAnimationSequence(prev => ({
        ...prev,
        current: Math.max(prev.current, maxIndex),
        total: Math.max(prev.total, maxIndex + 1),
      }));
    }
  }, [isInView, animationComplete]);

  return {
    isInView,
    animationComplete,
    animationSequence,
    getSequencedDelay,
  };
}
