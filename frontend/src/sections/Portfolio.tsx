"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const projects = [
  {
    id: 1,
    title: "GYM  ",
    image: "/gymwebport.png",
    live: "https://gymwebport.netlify.app/",
  },
  {
    id: 2,
    title: "CA Firm  ",
    image:
      "/cawebport.png",
    live: "https://cawebport.netlify.app/",
  },
  {
    id: 3,
    title: "Real Estate  ",
    image:
      "/realestate-webport.png",
    live: "https://realestate-webport.netlify.app/",
  }
   
];

const PortfolioSection = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
    setIsMobile(window.innerWidth <= 768);
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          My Projects
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          A collection of my recent work — websites, apps, and tools I’ve built
          for clients and personal projects.
        </motion.p>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative group rounded-2xl shadow-lg overflow-hidden bg-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => !isMobile && setActiveProject(project.id)}
              onMouseLeave={() => !isMobile && setActiveProject(null)}
              onTouchStart={() => isMobile && setActiveProject(project.id)}
              onTouchEnd={() => isMobile && setActiveProject(null)}
            >
              {/* Image container */}
              <div className="h-72 overflow-hidden">
                <motion.div
                  animate={{
                    y:
                      activeProject === project.id
                        ? -400 // scroll up
                        : 0,
                  }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={1200}
                    className="w-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-left">
                <h3 className="text-lg font-semibold text-white">
                  {project.title}
                </h3>
                <div className="flex gap-2 mt-2">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-3 py-1 bg-white/20 text-white rounded-lg hover:bg-white/40 transition"
                  >
                    Live Demo 🚀
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
