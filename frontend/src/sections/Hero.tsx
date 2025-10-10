"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; // Ensure Link is imported
import Image from "next/image";
import LoopingTypingEffect from "./LoopingTypingEffect";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxTop = scrollY * 0.05;
  const parallaxBottom = scrollY * -0.03;

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center px-6 py-24 min-h-screen overflow-x-hidden bg-gradient-to-br from-[#1e1e2f] via-[#2c2c42] to-[#1e1e2f]"
      aria-label="Hero Section - Premium Web Development Services"
    >
      {/* ... Background and Blob Animations (Omitted for brevity) ... */}
      
      {/* Background animated grid lines */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,191,36,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,191,36,0.08)_1px,transparent_1px)] bg-[size:80px_80px] animate-pulse" />
      </div>

      {/* Floating blobs with parallax */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        style={{ y: parallaxTop }}
        animate={{ y: [0, 40, 0], x: [0, 25, 0] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        style={{ y: parallaxBottom }}
        animate={{ y: [0, -40, 0], x: [0, -25, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* Flipping/floating icons */}
      <motion.div
        className="absolute top-32 right-1/4"
        initial={{ opacity: 0, rotateY: 0, scale: 0 }}
        animate={{ opacity: 1, rotateY: [0, 180, 360], scale: 1 }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
          delay: 0.5,
        }}
        aria-hidden="true"
      >
        <Image
          src="/icons/codee.png"
          alt="Code Icon representing development expertise"
          width={60}
          height={60}
          className="drop-shadow-lg"
        />
      </motion.div>
      <motion.div
        className="absolute top-20 left-6 sm:bottom-40 sm:left-1/4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          y: [0, -20, 0],
          rotate: [-10, 10, -10],
          opacity: 1,
          scale: 1,
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
          delay: 0.3,
        }}
        aria-hidden="true"
      >
        <Image
          src="/icons/rocket-ship.png"
          alt="Rocket Icon representing growth and launch"
          width={70}
          height={70}
          className="drop-shadow-xl"
        />
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-5xl sm:text-7xl font-extrabold mb-6 leading-tight text-gray-100"
      >
        We Build{" "}
        <span className="bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#f97316] bg-clip-text text-transparent">
          Premium Websites
        </span>
      </motion.h1>

      {/* Typing effect subheading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="relative z-10 text-lg sm:text-2xl text-gray-300 max-w-2xl mb-10"
      >
        Our team delivers{" "}
        <LoopingTypingEffect
          texts={[
            "High-Performing",
            "Modern & Responsive",
            "Conversion-Focused",
          ]}
          typingSpeed={80}
          pauseTime={1500}
        />{" "}
        websites designed to grow your business 🚀
      </motion.div>

      {/* Call to Action - CHECKED AND OPTIMIZED */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="relative z-10"
      >
        <Link
          href="/getstarted" // Changed to a common contact route for testing/initial setup
          className="px-8 py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-[#fbbf24] via-[#f59e0b] to-[#f97316] text-gray-900 shadow-xl hover:opacity-90 flex items-center gap-2 transition duration-300"
        >
          Get Started <ArrowRight className="h-5 w-5" />
        </Link>
      </motion.div>

      {/* SEO hidden description */}
      <p className="sr-only">
        Our team specializes in building modern, responsive, and
        conversion-focused websites. We work closely with clients to deliver
        premium web experiences that drive business growth.
      </p>
    </section>
  );
}