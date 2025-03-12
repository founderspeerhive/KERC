/**
 * Standardized animation configurations for consistent transitions across the website
 */

// Standard durations in seconds
export const DURATIONS = {
  fast: 0.3,
  medium: 0.5,
  slow: 0.8
};

// Standard easing functions
export const EASINGS = {
  // Smooth, natural motion
  smooth: [0.25, 0.1, 0.25, 1],
  // Bouncy, playful motion
  spring: [0.34, 1.56, 0.64, 1],
  // Quick acceleration, gradual deceleration
  easeOut: [0, 0, 0.58, 1],
  // Gradual acceleration, quick deceleration
  easeIn: [0.42, 0, 1, 1]
};

// Standard animation variants for common elements
export const VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
};

// Scroll-based transform configurations
export const SCROLL_TRANSFORMS = {
  borderRadius: {
    input: [0, 0.3],
    output: ["0rem", "2rem"]
  },
  padding: {
    input: [0, 0.3],
    output: ["0px", "16px"]
  },
  containerWidth: {
    input: [0, 0.3],
    output: ["100%", "calc(100% - 32px)"]
  },
  containerHeight: {
    input: [0, 0.3],
    output: ["100vh", "auto"]
  }
};

// Standard stagger delays for child elements
export const STAGGER_DELAYS = {
  fast: 0.05,
  medium: 0.1,
  slow: 0.2
};

// Viewport settings
export const VIEWPORT = {
  once: false,
  amount: 0.3
};
