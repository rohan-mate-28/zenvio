"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin,Mail  } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
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

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-br from-[#1e1e2f] via-[#2c2c42] to-[#1e1e2f] overflow-hidden"
      aria-label="Contact Section - Get in Touch for Premium Web Development Services"
    >
      {/* Background floating blobs */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-white"
        >
          Get in <span className="text-yellow-400">Touch</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 text-center max-w-xl mx-auto mb-12"
        >
          Have a project idea or need a stunning website? Let’s talk. We’d love
          to hear from you and help grow your business with premium web
          solutions.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <Phone className="text-yellow-400" />
              <p className="text-gray-200">+91 73871 22435</p>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-yellow-400" />
              <p className="text-gray-200">Pune, India</p>
            </div>
             <div className="flex items-center gap-4">
              <Mail  className="text-yellow-400" />
              <p className="text-gray-200">contact.zenvio@gmail.com</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900 p-8 rounded-3xl shadow-2xl space-y-4 relative"
          >
            {success !== true ? (
              <>
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
                  required
                />
                <input
                  type="tel"
                  name="user_phone"
                  placeholder="Your Phone Number"
                  className="w-full p-4 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-4 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-800 text-white"
                  required
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Send Message"}
                </button>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <span className="text-3xl md:text-4xl font-bold text-green-400 mb-4 animate-bounce">
                  🎉
                </span>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-300 text-center">
                  Your message has been sent successfully. We’ll get back to you
                  soon.
                </p>
              </motion.div>
            )}
          </motion.form>
        </div>

        {/* SEO Hidden Description */}
        <p className="sr-only">
          Contact Zenio Web Pack via phone or message form for premium website
          design, development, and digital solutions. We provide responsive
          websites, SEO-optimized platforms, and scalable solutions for
          businesses.
        </p>
      </div>
    </section>
  );
}
