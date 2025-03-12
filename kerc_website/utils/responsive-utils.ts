/**
 * Responsive utility functions and configurations for consistent viewport handling
 */

// Standard breakpoints (in pixels) for responsive design
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Container styles for responsive layouts
export const CONTAINER_STYLES = {
  maxWidth: {
    xs: "max-w-xs", // 320px
    sm: "max-w-sm", // 640px
    md: "max-w-md", // 768px
    lg: "max-w-lg", // 1024px
    xl: "max-w-xl", // 1280px
    "2xl": "max-w-2xl", // 1536px
    "3xl": "max-w-3xl", // 1920px
    "4xl": "max-w-4xl", // 2560px
    "5xl": "max-w-5xl", // 3200px
    "6xl": "max-w-6xl", // 4000px
    "7xl": "max-w-7xl", // 5000px
    full: "max-w-full", // 100%
  },
  padding: {
    none: "",
    sm: "px-4",
    md: "px-6",
    lg: "px-8",
    xl: "px-12",
  },
};

// Viewport units conversion helpers
export const viewportUnits = {
  /**
   * Converts a pixel value to viewport width units (vw)
   * @param px - Pixel value
   * @param referenceWidth - Reference viewport width (defaults to 1920)
   * @returns The equivalent vw value
   */
  pxToVw: (px: number, referenceWidth: number = 1920): string => {
    return `${(px / referenceWidth) * 100}vw`;
  },

  /**
   * Converts a pixel value to viewport height units (vh)
   * @param px - Pixel value
   * @param referenceHeight - Reference viewport height (defaults to 1080)
   * @returns The equivalent vh value
   */
  pxToVh: (px: number, referenceHeight: number = 1080): string => {
    return `${(px / referenceHeight) * 100}vh`;
  },

  /**
   * Creates a clamp value for responsive sizing
   * @param minSize - Minimum size in pixels
   * @param maxSize - Maximum size in pixels
   * @param preferredUnit - Preferred unit for the clamp value (default: rem)
   * @returns A CSS clamp function string
   */
  responsiveSize: (
    minSize: number,
    maxSize: number,
    preferredUnit: "rem" | "px" = "rem"
  ): string => {
    const minValue =
      preferredUnit === "rem" ? `${minSize / 16}rem` : `${minSize}px`;
    const maxValue =
      preferredUnit === "rem" ? `${maxSize / 16}rem` : `${maxSize}px`;
    const preferredValue = `${(maxSize / 1920) * 100}vw`;

    return `clamp(${minValue}, ${preferredValue}, ${maxValue})`;
  },
};

// Helper function to prevent content overflow
export const preventOverflow = {
  /**
   * Creates styles to prevent text overflow
   */
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  /**
   * Creates styles for multiline text with ellipsis
   * @param lines - Number of lines before truncating
   * @returns CSS style object
   */
  multilineText: (lines: number) => ({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: lines,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
  }),
};

// Media query helper for responsive styling
export const mediaQuery = {
  up: (breakpoint: keyof typeof BREAKPOINTS) =>
    `@media (min-width: ${BREAKPOINTS[breakpoint]}px)`,

  down: (breakpoint: keyof typeof BREAKPOINTS) =>
    `@media (max-width: ${BREAKPOINTS[breakpoint] - 0.1}px)`,

  between: (
    minBreakpoint: keyof typeof BREAKPOINTS,
    maxBreakpoint: keyof typeof BREAKPOINTS
  ) =>
    `@media (min-width: ${BREAKPOINTS[minBreakpoint]}px) and (max-width: ${
      BREAKPOINTS[maxBreakpoint] - 0.1
    }px)`,
};
