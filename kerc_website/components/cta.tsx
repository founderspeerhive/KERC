"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Heart, TrendingUp, ShieldCheck } from "lucide-react";

export default function KercCTA() {
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

  // Transform container width and height based on scroll
  const containerWidth = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["100%", "calc(100% - 32px)"]
  );

  const containerHeight = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["100vh", "auto"]
  );

  const features = [
    {
      icon: TrendingUp,
      title: "Real Revenue From A Real Business",
      description:
        "KERC is a Real World Assets business and proven revenue generator that pays out each month.",
    },
    {
      icon: Heart,
      title: "Focus On Innovation And Improvement",
      description:
        "KERC uses next generation tools and strategies that improve healthcare and saves lives.",
    },
    {
      icon: ShieldCheck,
      title: "Recession-Proof Industry",
      description:
        "The healthcare industry has grown every year for the past 100 years and projects double digit growth in SE Asia where KERC does business.",
    },
  ];

  return (
    <motion.div 
      ref={ref}
      className="relative h-screen"
      style={{ padding }}
    >
      <motion.div 
        className="overflow-hidden border-0 bg-gradient-to-r from-gray-900 to-gray-800 h-full"
        style={{ 
          borderRadius: isInView ? borderRadius : "0rem",
          width: isInView ? containerWidth : "100%",
          minHeight: isInView ? containerHeight : "100vh"
        }}
      >
        <motion.div
          className="flex flex-col justify-center items-center h-full text-center px-4 py-16 md:py-24"
          style={{ minHeight: isInView ? containerHeight : "100vh" }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
            transition={{ duration: 0.6 }}
          >
            Join the KERC Healthcare Revolution
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-300 max-w-2xl mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Be part of the healthcare revolution. Invest in KERC tokens and gain 
            exposure to real-world healthcare assets while contributing to improved 
            healthcare services across Southeast Asia.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg h-auto">
                Get Started with KERC
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg h-auto">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 p-6 rounded-xl backdrop-blur-sm"
                whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <feature.icon className="h-6 w-6 text-white mt-1 mr-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
