"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.sendForm(
        "service_v1jt0vh",
        "template_fez7wss",
        formRef.current as HTMLFormElement,
        "O4YCnTTt5kUrIiZqW"
      );
      setSuccess(true);
      formRef.current?.reset();
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setSending(false);
    }
  };

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  return (
    <>
      <Head>
        <title>Contact ZenVio Web | Web Development, SEO, Hosting India</title>
        <meta
          name="description"
          content="Contact ZenVio Web for web development, SEO, hosting, and digital solutions. Start your project with our expert team today."
        />
        <meta
          name="keywords"
          content="ZenVio Web, Contact, Web Development, SEO, Hosting, Maintenance, Digital Marketing, India"
        />
        <link rel="canonical" href="https://zenvioweb.in/contact" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-32 text-center relative overflow-hidden">
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-5xl md:text-6xl font-bold mb-4">
          Let's Grow Your Business with <span className="text-yellow-400">ZenVio Web</span>
        </motion.h1>
        <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
          Get in touch with us today. Our experts are ready to design, develop, and optimize your digital presence.
        </motion.p>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white dark:bg-slate-900 text-center">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-4xl font-bold mb-12">
          Why Work With ZenVio Web?
        </motion.h2>
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto px-6">
          <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
            <FaEnvelope size={40} className="mx-auto text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable Support</h3>
            <p className="text-gray-600 dark:text-gray-300">We respond quickly to your queries and provide reliable solutions for your business needs.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
            <FaPhone size={40} className="mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
            <p className="text-gray-600 dark:text-gray-300">Our team has years of experience in web development, SEO, and digital marketing strategies.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
            <FaEnvelope size={40} className="mx-auto text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted by Clients</h3>
            <p className="text-gray-600 dark:text-gray-300">We have helped numerous businesses grow their online presence and improve ROI.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
            {success ? (
              <p className="text-green-500 font-semibold">Thank you! Your message has been sent.</p>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <input type="text" name="user_name" placeholder="Your Name" required
                  className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />
                <input type="email" name="user_email" placeholder="Your Email" required
                  className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />
                <input type="tel" name="user_phone" placeholder="Your Phone" required
                  className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-slate-800 text-gray-900 dark:text-white" />
                <textarea name="message" placeholder="Your Message" required rows={6}
                  className="w-full p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"></textarea>
                <button type="submit" disabled={sending}
                  className="w-full py-4 px-6 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition disabled:opacity-50">
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info + Socials */}
          <motion.div initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Contact Info</h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-center space-x-3"><FaEnvelope className="text-yellow-400" /> <a href="mailto:contact.zenvio@gmail.com" className="hover:text-yellow-400 transition">contact.zenvio@gmail.com</a></li>
              <li className="flex items-center space-x-3"><FaPhone className="text-yellow-400" /> <a href="tel:+917387122435" className="hover:text-yellow-400 transition">+91 73871 22435</a></li>
            </ul>

            <h3 className="text-xl font-semibold mt-10 mb-4 text-gray-900 dark:text-white">Follow Us</h3>
            <div className="flex space-x-5 text-2xl">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="text-gray-500 hover:text-yellow-400 transition transform hover:scale-110 duration-300" aria-label={link.label}>
                  <link.icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-slate-900 text-center">
        <motion.h2 initial="hidden" whileInView="visible" variants={fadeUp} viewport={{ once: true }} className="text-4xl font-bold mb-12">
          What Our Clients Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {[{ name: "Rohit Kumar", feedback: "ZenVio Web transformed our website and boosted our traffic significantly!" },
            { name: "Priya Sharma", feedback: "Excellent SEO and reliable support. Highly recommend!" },
            { name: "Amit Singh", feedback: "Professional, creative, and on time. Great team!" }].map((testimonial, i) => (
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
          Ready to Launch Your Project?
        </motion.h2>
        <motion.p initial="hidden" whileInView="visible" variants={fadeUp} className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Contact ZenVio Web today and let's craft your digital success story.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="py-4 px-8 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          Contact Us Now
        </motion.button>
      </section>

    
    </>
  );
}
