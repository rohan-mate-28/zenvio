"use client";

import { motion } from "framer-motion";
import { Globe, Users, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const achievements = [
  {
    id: 1,
    icon: <Globe className="w-10 h-10 text-yellow-400" />,
    value: 387,
    label: "Websites Built",
  },
  {
    id: 2,
    icon: <Users className="w-10 h-10 text-yellow-400" />,
    value: 450,
    label: "Happy Clients",
  },
  {
    id: 3,
    icon: <Clock className="w-10 h-10 text-yellow-400" />,
    value: 5,
    label: "Years Experience",
  },
];

export default function AchievementsSection() {
  // Counter animation
  const [counts, setCounts] = useState<number[]>(achievements.map(() => 0));

  useEffect(() => {
    const duration = 2000; // animation duration in ms
    const intervalTime = 30;
    const increments = achievements.map((a) => a.value / (duration / intervalTime));

    let currentCounts = [...counts];
    const interval = setInterval(() => {
      let done = true;
      currentCounts = currentCounts.map((c, i) => {
        if (c < achievements[i].value) {
          done = false;
          return Math.min(c + increments[i], achievements[i].value);
        }
        return c;
      });
      setCounts([...currentCounts]);
      if (done) clearInterval(interval);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="achievements"
      className="py-20 bg-gradient-to-br from-[#1e1e2f] via-[#2c2c42] to-[#1e1e2f]"
      aria-label="Achievements Section - Our Premium Web Development Milestones"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-white mb-12"
        >
          Our <span className="text-yellow-400">Achievements</span>
        </motion.h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-3xl font-bold text-yellow-400">
                {Math.floor(counts[index])}+
              </h3>
              <p className="text-gray-300 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* SEO Hidden Description */}
        <p className="sr-only">
          Our achievements include hundreds of websites built, hundreds of happy clients, and several years of experience, demonstrating our expertise in premium web development.
        </p>
      </div>
    </section>
  );
}
