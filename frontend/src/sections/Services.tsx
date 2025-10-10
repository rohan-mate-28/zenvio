"use client";

import { motion } from "framer-motion";
import { Code, Search, Server, Palette, Rocket, Wrench } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Custom Web Development",
    description:
      "We design and build modern, responsive, and high-performing websites tailored to your business goals. From corporate sites to eCommerce, we use the latest technologies to deliver scalable solutions.",
    icon: <Code className="w-10 h-10 text-indigo-600" />,
  },
  {
    id: 2,
    title: "SEO Optimization Services",
    description:
      "Boost your online visibility with tailored SEO strategies — keyword optimization, content improvements, and technical SEO that rank your site higher on Google and drive targeted traffic.",
    icon: <Search className="w-10 h-10 text-green-600" />,
  },
  {
    id: 3,
    title: "Reliable Web Hosting",
    description:
      "Keep your business online 24/7 with secure and lightning-fast web hosting. Our hosting includes free SSL, daily backups, and guaranteed uptime to ensure your website runs smoothly.",
    icon: <Server className="w-10 h-10 text-blue-600" />,
  },
  {
    id: 4,
    title: "Maintenance & Ongoing Support",
    description:
      "We provide continuous website maintenance, updates, and technical support so you can focus on growing your business without worrying about downtime or security risks.",
    icon: <Wrench className="w-10 h-10 text-purple-600" />,
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100"
      aria-label="Professional Web Services - Development, SEO, Hosting, Support"
    >
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900"
        >
          Our <span className="text-yellow-500">Services</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-12 max-w-3xl mx-auto text-lg"
        >
          Explore our full range of <strong>digital services</strong> designed
          to help your business succeed online. From{" "}
          <em>custom web development</em> to{" "}
          <em>SEO optimization and hosting</em>, we provide everything your
          brand needs to thrive.
        </motion.p>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              className="p-8 rounded-2xl shadow-lg bg-white hover:shadow-2xl transition relative group border border-gray-100"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-4">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
                  className="p-4 rounded-full bg-gray-50 shadow-md group-hover:scale-110 transition-transform"
                >
                  {service.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* SEO hidden content */}
        <p className="sr-only">
          Our web agency provides custom website development, SEO optimization,
          web hosting, and ongoing maintenance support. We specialize in
          building responsive, high-performing websites that rank well on
          Google and deliver results.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
