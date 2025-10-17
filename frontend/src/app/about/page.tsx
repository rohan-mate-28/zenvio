"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { FaUsers, FaLaptopCode, FaChartLine, FaAward, FaLightbulb, FaRocket } from "react-icons/fa";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function About() {
  return (
    <>
      <Head>
        <title>About ZenVio Web | Premium Web Development & SEO India</title>
        <meta
          name="description"
          content="ZenVio Web is a top web development and SEO agency in India. Learn about our story, mission, values, expertise, and how we help businesses grow online."
        />
        <meta
          name="keywords"
          content="ZenVio Web, About, Web Development, SEO, Digital Marketing, India, Web Design, Agency, Expert Developers"
        />
        <link rel="canonical" href="https://zenvioweb.in/about" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-32 text-center relative overflow-hidden">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-5xl md:text-6xl font-bold mb-6"
        >
          About <span className="text-yellow-400">ZenVio Web</span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300"
        >
          We craft premium web solutions, SEO-optimized websites, and digital strategies that grow businesses online. Our expertise transforms ideas into high-performing digital experiences.
        </motion.p>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8"
          >
            Our Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed"
          >
            ZenVio Web started with a mission to empower businesses with modern digital solutions. From humble beginnings, we’ve evolved into a full-service agency delivering web development, SEO, hosting, and digital marketing solutions that help brands thrive in the digital world.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-slate-900 text-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="p-6 border rounded-xl hover:shadow-lg transition"
          >
            <FaLaptopCode size={50} className="mx-auto text-yellow-400 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To deliver responsive, scalable, and SEO-optimized digital solutions that accelerate growth and elevate businesses online.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="p-6 border rounded-xl hover:shadow-lg transition"
          >
            <FaChartLine size={50} className="mx-auto text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To become India’s most trusted digital partner, empowering brands with innovative web solutions and impactful online strategies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            Our Values
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <FaUsers size={40} className="mx-auto text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Client-Centric</h3>
              <p className="text-gray-600 dark:text-gray-300">We prioritize our clients’ goals to deliver tailored digital solutions that maximize impact.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <FaAward size={40} className="mx-auto text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">Every project is executed with high standards, precision, and attention to detail.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <FaLightbulb size={40} className="mx-auto text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">We leverage creativity and technology to craft unique solutions for every client.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise & Services */}
      <section className="py-24 bg-white dark:bg-slate-900 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            Our Expertise
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <FaLaptopCode size={40} className="mx-auto text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              <p className="text-gray-600 dark:text-gray-300">Building responsive, high-performance websites and applications that engage users.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <FaChartLine size={40} className="mx-auto text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">SEO Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300">Enhancing website visibility on search engines to drive traffic and conversions.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <FaRocket size={40} className="mx-auto text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Digital Strategy</h3>
              <p className="text-gray-600 dark:text-gray-300">Providing actionable digital marketing strategies for measurable business growth.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            Our Process
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10 text-left">
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">1. Consultation</h3>
              <p className="text-gray-600 dark:text-gray-300">We understand your goals and gather requirements to define project scope and objectives.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">2. Strategy & Design</h3>
              <p className="text-gray-600 dark:text-gray-300">Our team creates a tailored strategy, wireframes, and design mockups aligned with your brand.</p>
            </motion.div>
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">3. Development & Launch</h3>
              <p className="text-gray-600 dark:text-gray-300">We build your website, optimize it for SEO and performance, test thoroughly, and launch your project successfully.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-slate-900 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-12"
        >
          What Our Clients Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[
            { name: "Rohit Kumar", feedback: "ZenVio Web transformed our website and boosted our traffic significantly!" },
            { name: "Priya Sharma", feedback: "Excellent SEO and reliable support. Highly recommend!" },
            { name: "Amit Singh", feedback: "Professional, creative, and on time. Great team!" },
          ].map((testimonial, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 border rounded-xl hover:shadow-lg transition">
              <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.feedback}"</p>
              <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Build Your Digital Presence?
        </motion.h2>
        <motion.p initial="hidden" whileInView="visible" variants={fadeUp} className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Contact ZenVio Web today to start your journey with a high-performing, SEO-optimized website that converts.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => window.location.href = "/contact"}
          className="py-4 px-8 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          Contact Us Now
        </motion.button>
      </section>

    </>
  );
}
