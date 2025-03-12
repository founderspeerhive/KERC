"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Twitter, DiscIcon as Discord } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function KercFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  // Use component-specific scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  // Transform border radius based on scroll
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0rem", "2rem"]
  );

  // Transform padding based on scroll
  const padding = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0px", "16px"]
  );

  // Transform container width based on scroll
  const containerWidth = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["100%", "calc(100% - 32px)"]
  );

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "X", icon: Twitter, href: "https://twitter.com/kerctoken" },
    { name: "Discord", icon: Discord, href: "https://discord.gg/kerctoken" },
  ];

  return (
    <motion.div 
      ref={ref}
      className="relative"
      style={{ padding }}
    >
      <motion.footer 
        className="bg-gray-50 dark:bg-gray-900"
        style={{ 
          borderRadius: isInView ? borderRadius : "0rem",
          width: isInView ? containerWidth : "100%"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="flex flex-col items-center md:items-start mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/placeholder.svg?height=40&width=120"
                alt="KERC Logo"
                width={120}
                height={40}
                className="mb-4"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                &copy; 2024 KERC. All rights reserved.
              </p>
            </motion.div>

            <motion.nav 
              className="flex flex-wrap justify-center md:justify-end gap-6 mb-6 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors"
                  aria-label={`Follow us on ${link.name}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
}
