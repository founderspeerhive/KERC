"use client";

import { useRef } from "react";
import {
  ArrowUpRight,
  Banknote,
  Building2,
  LineChart,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

export default function KercFeature() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Use component-specific scroll progress
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Transform border radius based on scroll
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["0rem", "2rem"]
  );

  // Transform padding based on scroll
  const padding = useTransform(scrollYProgress, [0, 0.1], ["0px", "16px"]);

  // Transform container width and height based on scroll
  const containerWidth = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["100%", "calc(100% - 32px)"]
  );

  const containerHeight = useTransform(
    scrollYProgress,
    [0, 0.1],
    ["100vh", "auto"]
  );

  const features = [
    {
      icon: Banknote,
      title: "Real-World Revenue",
      description: "Earn revenue from tangible healthcare operations",
    },
    {
      icon: Building2,
      title: "Medical Clinic Ownership",
      description: "KERC owns and operates medical clinics",
    },
    {
      icon: LineChart,
      title: "Growing Payouts",
      description: "Stable and increasing staking rewards",
    },
    {
      icon: ArrowUpRight,
      title: "Growth Market",
      description: "Revenue from one of the fastest growing healthcare sectors",
    },
    {
      icon: ShieldCheck,
      title: "Secure Investment",
      description: "Healthcare industry stability provides security",
    },
    {
      icon: Users,
      title: "Proven Management",
      description: "Experienced team with track record of success",
    },
  ];

  return (
    <motion.div ref={ref} className="relative h-screen" style={{ padding }}>
      <motion.div
        className="overflow-hidden border-0 bg-gradient-to-r from-gray-900 to-gray-800 h-full"
        style={{
          borderRadius: isInView ? borderRadius : "0rem",
          width: isInView ? containerWidth : "100%",
          minHeight: isInView ? containerHeight : "100vh",
        }}
      >
        <motion.div
          className="flex flex-col justify-center h-full"
          style={{ minHeight: isInView ? containerHeight : "100vh" }}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h2
                className="text-3xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Discover the future of{" "}
                <motion.span
                  className="text-white"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isInView ? 1 : 0,
                    scale: isInView ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  passive income
                </motion.span>
              </motion.h2>
              <motion.p
                className="mt-4 text-lg text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Earn effortlessly from the healthcare industry without any
                management headaches.
              </motion.p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-8 lg:px-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center gap-2 rounded-xl bg-white/30 p-4 text-center shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                    type: "spring",
                    stiffness: 50,
                  }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <feature.icon className="h-10 w-10 text-primary" />
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-white">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.button
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More About KERC
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
