"use client";

import { motion } from "framer-motion";
import PlansSection from "@/sections/Plans";

const steps = [
  {
    id: 1,
    title: "Tell Us About Your Project",
    description:
      "Fill out a quick form to share your goals, requirements, and timeline.",
  },
  {
    id: 2,
    title: "Get a Free Consultation",
    description:
      "We’ll discuss your project, suggest strategies, and provide a tailored plan.",
  },
  {
    id: 3,
    title: "We Start Building",
    description:
      "Our team gets to work delivering a fast, modern, and high-converting website.",
  },
  {
    id: 4,
    title: "Launch & Grow",
    description:
      "We launch your project and provide ongoing SEO, maintenance, and support.",
  },
];

const GetStartedPage = () => {
  return (
    <section className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Get Started with <span className="text-indigo-600">ZenVio Web Pack</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          We make the process simple and transparent. Here’s how we’ll work together.
        </motion.p>

        {/* Steps Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Plans Section */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6"
        >
          Choose a Plan That Fits You
        </motion.h2>

        <PlansSection />

        {/* Final CTA */}
         
      </div>
    </section>
  );
};

export default GetStartedPage;
