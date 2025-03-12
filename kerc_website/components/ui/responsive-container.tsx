import React, { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { BREAKPOINTS, CONTAINER_STYLES } from "@/utils/responsive-utils";

export interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  fullWidth?: boolean;
  maxWidth?: keyof typeof CONTAINER_STYLES.maxWidth | "none";
  padding?: boolean;
  centered?: boolean;
  overflowHidden?: boolean;
  gradient?: boolean;
  gradientFrom?: string;
  gradientTo?: string;
}

/**
 * A responsive container component that handles viewport scaling and scroll-based animations
 */
export const ResponsiveContainer = forwardRef<
  HTMLDivElement,
  ResponsiveContainerProps & Omit<HTMLMotionProps<"div">, "ref">
>(
  (
    {
      children,
      className,
      fullHeight = true,
      fullWidth = true,
      maxWidth = "xl",
      padding = true,
      centered = false,
      overflowHidden = true,
      gradient = false,
      gradientFrom = "gray-900",
      gradientTo = "gray-800",
      ...props
    },
    ref
  ) => {
    // Combine all container styles
    const containerClasses = cn(
      "relative",
      fullHeight && "h-full min-h-screen",
      fullWidth && "w-full",
      maxWidth !== "none" && CONTAINER_STYLES.maxWidth[maxWidth],
      padding && "p-4 md:p-6 lg:p-8",
      centered && "flex flex-col justify-center items-center",
      overflowHidden && "overflow-hidden",
      gradient && `bg-gradient-to-r from-${gradientFrom} to-${gradientTo}`,
      className
    );

    return (
      <motion.div
        ref={ref}
        className={containerClasses}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

ResponsiveContainer.displayName = "ResponsiveContainer";
