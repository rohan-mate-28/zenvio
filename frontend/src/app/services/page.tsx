"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Search, Server, Wrench, Users, Target, TrendingUp } from "lucide-react";

const services = [
  {
    id: 1,
    icon: Globe,
    title: "Web Development",
    description:
      "We craft responsive, SEO-friendly websites that convert visitors into customers. From business sites to full-scale web applications, we deliver scalable solutions tailored to your brand.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    icon: Search,
    title: "SEO Optimization",
    description:
      "Boost your online visibility with data-driven SEO strategies, including keyword research, on-page optimization, and backlinks to help your business rank higher and reach the right audience.",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    icon: Server,
    title: "Reliable Web Hosting",
    description:
      "Enjoy 99.9% uptime, fast loading speeds, and secure hosting. Our scalable hosting solutions keep your website online and optimized, letting you focus on growing your business.",
    color: "from-yellow-500 to-orange-600",
  },
  {
    id: 4,
    icon: Wrench,
    title: "Maintenance & Support",
    description:
      "Proactive updates, security checks, and performance monitoring ensure your website runs smoothly. Our dedicated support team is always ready to help.",
    color: "from-purple-500 to-pink-600",
  },
];

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "CEO, TechCorp",
    feedback:
      "ZenVio Web transformed our online presence. Our site is faster, modern, and we saw a 40% increase in inquiries within 3 months!",
  },
  {
    name: "Neha Kapoor",
    role: "Marketing Head, GreenLeaf",
    feedback:
      "The SEO strategies implemented by ZenVio Web helped us reach the top positions on Google. Truly experts in digital growth!",
  },
];

const faqs = [
  {
    question: "How long does it take to build a website?",
    answer: "Typically 2-6 weeks depending on complexity and features required.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes! We offer maintenance and support plans to keep your website secure and updated.",
  },
  {
    question: "Will my website be SEO-friendly?",
    answer: "Absolutely. All websites are built with SEO best practices and performance optimization.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  return (
    <>
      <Head>
        <title>ZenVio Web Services | Web Development, SEO & Hosting India</title>
        <meta
          name="description"
          content="ZenVio Web offers expert web development, SEO, web hosting, and maintenance services in India. Grow your business online with our digital solutions."
        />
        <meta
          name="keywords"
          content="Web Development India, SEO Services India, Web Hosting, Website Maintenance, Digital Marketing, ZenVio Web"
        />
        <link rel="canonical" href="https://zenvioweb.in/services" />
      </Head>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Drive Growth with <span className="text-blue-400">ZenVio Web</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300"
          >
            We combine design, technology, and marketing strategies to help your business succeed online. From websites to SEO, hosting, and maintenance – we’ve got you covered.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12"
          >
            Our Core Services
          </motion.h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="group relative overflow-hidden border-none shadow-lg hover:shadow-2xl transition duration-300 rounded-2xl bg-white dark:bg-slate-900">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-90 transition duration-500`}
                  />
                  <CardContent className="relative p-8 flex flex-col items-center text-center space-y-4 z-10">
                    <service.icon
                      size={48}
                      className="text-blue-500 group-hover:text-white transition duration-300"
                    />
                    <h3 className="text-2xl font-semibold group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 group-hover:text-white">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Strategy */}
      <section className="py-24 bg-white dark:bg-slate-900 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            Why Choose ZenVio Web?
          </motion.h2>

          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3">
            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <Target size={40} className="mx-auto text-blue-500 mb-4"/>
              <h3 className="text-xl font-semibold mb-2">Marketing Strategy</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Every website and SEO plan is tailored with proven marketing strategies to drive leads and conversions.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <TrendingUp size={40} className="mx-auto text-green-500 mb-4"/>
              <h3 className="text-xl font-semibold mb-2">Performance Optimization</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fast, responsive websites that rank higher in search engines and give the best user experience.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="p-6 border rounded-xl hover:shadow-lg transition">
              <Users size={40} className="mx-auto text-purple-500 mb-4"/>
              <h3 className="text-xl font-semibold mb-2">Customer-Centric</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We prioritize your goals and work closely to ensure the website and SEO results exceed expectations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            What Our Clients Say
          </motion.h2>

          <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="p-6 border rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-lg transition"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-4">"{t.feedback}"</p>
                <h4 className="font-semibold">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={fadeUp}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="space-y-6 text-left">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="border rounded-xl p-6 hover:shadow-lg transition">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Online Presence?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Get in touch with ZenVio Web today and let’s grow your business online!
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-700 font-semibold hover:bg-gray-100 transition duration-300"
            onClick={() => (window.location.href = "/contact")}
          >
            Get a Free Consultation
          </Button>
        </motion.div>
      </section>
    </>
  );
}
