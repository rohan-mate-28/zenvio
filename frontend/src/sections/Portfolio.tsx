"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "GYM Website",
    image: "/gymwebport.png",
    live: "https://gymwebport.netlify.app/",
  },
  {
    id: 2,
    title: "CA Firm Website",
    image: "/cawebport.png",
    live: "https://cawebport.netlify.app/",
  },
  {
    id: 3,
    title: "Real Estate Website",
    image: "/realestate-webport.png",
    live: "https://realestate-webport.netlify.app/",
  },
];

export default function PortfolioSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">My Projects</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          A collection of my recent work — websites, apps, and tools I’ve built
          for clients and personal projects.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative group rounded-2xl shadow-lg overflow-hidden bg-white cursor-pointer h-80"
              onMouseEnter={() => !isMobile && setActiveProject(project.id)}
              onMouseLeave={() => !isMobile && setActiveProject(null)}
              onTouchStart={() => isMobile && setActiveProject(project.id)}
              onTouchEnd={() => isMobile && setActiveProject(null)}
            >
              {/* Image Container */}
              <div
                className="relative w-full h-full overflow-hidden"
                ref={(el) => { imageRefs.current[index] = el; }} // ✅ just assign, no return
              >
                <motion.div
                  animate={{
                    y: (() => {
                      const container = imageRefs.current[index];
                      if (!container) return 0;

                      const containerHeight = container.clientHeight;
                      const img = container.querySelector("img");
                      if (!img) return 0;

                      const imageHeight = img.clientHeight;
                      const diff = imageHeight - containerHeight;

                      // Full image scroll
                      return activeProject === project.id ? -diff : 0;
                    })(),
                  }}
                  transition={{
                    duration: 10, // slow
                    ease: [0.22, 1, 0.36, 1],
                  }}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
