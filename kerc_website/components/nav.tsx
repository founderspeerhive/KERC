"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { AnimatedElement } from "./ui/animated-element";
import { useSequencedAnimation } from "@/hooks/useSequencedAnimation";
import { VIEWPORT } from "@/utils/animation-config";

export default function Navbar() {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const ref = useRef<HTMLDivElement>(null);
  const { isInView, getSequencedDelay } = useSequencedAnimation(ref, 1.0, VIEWPORT);
  
  // Determine if we should show the transparent or solid background
  const isScrolled = scrollY > 50;
  
  const navItems = [
    { name: "Docs", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Early Access", href: "/early-access" },
  ];

  return (
    <header
      ref={ref}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <AnimatedElement
            variant="fadeInDown"
            isInView={isInView}
            delay={getSequencedDelay(0)}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2">
              <span className={cn(
                "text-xl font-bold",
                isScrolled ? "text-gray-900" : "text-white"
              )}>
                KERC
              </span>
            </Link>
          </AnimatedElement>

          <nav className="flex items-center space-x-1 md:space-x-4">
            {navItems.map((item, index) => (
              <AnimatedElement
                key={item.href}
                variant="fadeInDown"
                isInView={isInView}
                delay={getSequencedDelay(index + 1)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    pathname === item.href
                      ? isScrolled 
                        ? "bg-gray-100 text-gray-900" 
                        : "bg-white/20 text-white"
                      : isScrolled 
                        ? "text-gray-700 hover:bg-gray-100" 
                        : "text-white/80 hover:bg-white/20 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              </AnimatedElement>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
