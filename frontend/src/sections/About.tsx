"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, Variants, easeOut, easeInOut } from "framer-motion";

// --- Feature Item Variants ---
const featureItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: easeOut },
  },
};

// --- SVG Icons ---
const DesignIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20V10" />
    <path d="M18 20V4" />
    <path d="M6 20v-4" />
    <path d="M12 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    <path d="M18 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
    <path d="M6 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
  </svg>
);

const PerformanceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const ConversionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 12h-6" />
    <path d="M12 22V8" />
    <path d="M6 12H2" />
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8l4 4-4 4" />
  </svg>
);

// --- About Component ---
export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const featuresData = [
    {
      title: "Modern Design",
      description:
        "We craft visually stunning websites with intuitive and luxurious interfaces.",
      IconComponent: DesignIcon,
      colorClass: "text-purple-400 shadow-purple-500/50",
    },
    {
      title: "High Performance",
      description:
        "Our websites load fast and deliver smooth, flawless user experiences.",
      IconComponent: PerformanceIcon,
      colorClass: "text-green-400 shadow-green-500/50",
    },
    {
      title: "Conversion Focused",
      description:
        "We optimize websites to convert visitors into loyal customers effectively.",
      IconComponent: ConversionIcon,
      colorClass: "text-yellow-400 shadow-yellow-500/50",
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="relative px-6 py-24 bg-gradient-to-b from-[#1e1e2f] via-[#2c2c42] to-[#1e1e2f] overflow-hidden"
      aria-label="About Our Premium Web Development Agency"
    >
      {/* Background floating blobs */}
      <motion.div
        className="absolute top-10 left-10 w-80 h-80 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ y: [0, 40, 0], x: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: easeInOut }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ y: [0, -40, 0], x: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: easeInOut }}
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <motion.div style={{ y: yContent }} className="relative z-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-6xl font-extrabold text-center mb-6 text-gray-100"
        >
          About{" "}
          <span className="bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#f97316] bg-clip-text text-transparent">
            Our Agency
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-3xl mx-auto text-center text-lg sm:text-xl text-gray-300 mb-16"
        >
          We are a premium web development agency dedicated to building modern,
          responsive, and high-performing websites. Our mission is to help
          businesses grow by delivering websites that are visually stunning and
          optimized for conversions and user experience.
        </motion.p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              variants={featureItemVariants}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 40px -5px ${feature.colorClass.split(" ")[1]}`,
              }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-800"
            >
              <feature.IconComponent
                className={`w-16 h-16 mb-6 ${feature.colorClass} drop-shadow-lg`}
                strokeWidth={1.5}
              />
              <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="max-w-4xl mx-auto mt-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-100">
            Our Mission
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl">
            Our mission is to empower businesses with premium web experiences
            that drive growth. We combine creativity, technology, and strategy
            to craft websites that are visually appealing, fast, and highly
            effective.
          </p>
        </motion.div>
      </motion.div>

      {/* SEO hidden description */}
      <p className="sr-only">
        We are a premium web development agency delivering modern, responsive,
        and high-performing websites with a luxurious and professional style.
        We focus on design, performance, and conversion optimization.
      </p>
    </motion.section>

    
  );
}
