"use client";

import { motion } from "framer-motion";
import { Heart, TrendingUp, ShieldCheck } from "lucide-react";

export default function KercCTA() {
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
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="container mx-auto relative z-10 flex flex-col justify-center h-full py-16 min-h-[calc(100vh-120px)] bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-3xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-8 sm:p-10">
          <motion.h2
            className="text-3xl font-bold text-center text-blue-800 dark:text-blue-200 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the KERC Healthcare Revolution
          </motion.h2>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-blue-700 dark:text-blue-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-100 dark:focus:ring-offset-blue-900"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started with KERC
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
