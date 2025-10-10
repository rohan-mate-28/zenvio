"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import emailjs from "@emailjs/browser";

const plans = [
  {
    id: 1,
    title: "Starter",
    price: "₹13,000",
    features: ["5-6 Page Website", "Mobile Responsive", "Basic SEO", "Delivery in 5 Days"],
    highlighted: false,
    label: "Perfect for Small Businesses",
  },
  {
    id: 2,
    title: "Professional",
    price: "₹30,000",
    features: ["Up to 10 Pages", "Modern UI/UX Design", "SEO Optimized", "Basic Admin Panel", "Delivery in 10 Days"],
    highlighted: true,
    label: "Most Popular - Best Value",
  },
  {
    id: 3,
    title: "Business",
    price: "₹50,000",
    features: ["Unlimited Pages", "Custom Design & Branding", "E-Commerce / AMC Portal", "Advanced Admin Panel", "Free Maintenance 1 Year"],
    highlighted: false,
    label: "Enterprise Solutions",
  },
];

export default function PlansSection() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState<null | boolean>(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_phone: "",
    message: "",
    budget: "",
  });

  const handleGetStarted = (planTitle: string) => {
    if (user) {
      setSelectedPlan(planTitle);
      setModalOpen(true);
      setFormData({ ...formData, message: "", budget: "" });
    } else {
      window.location.href = "/auth/login";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // restrict phone input to digits only and max 10
    if (name === "user_phone") {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.send(
        "service_v1jt0vh", // Your service ID
        "template_fez7wss", // Your template ID
        { ...formData, plan: selectedPlan },
        "O4YCnTTt5kUrIiZqW" // Your public key
      );
      setSuccess(true);
      setFormData({ user_name: "", user_phone: "", message: "", budget: "" });
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="plans"
      className="py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4 text-white"
        >
          Our <span className="text-teal-400">Website Plans</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 max-w-xl mx-auto mb-12"
        >
          Choose the perfect plan for your business – from a simple landing page to a full-featured premium platform designed to scale.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`p-6 rounded-3xl shadow-lg border transition transform hover:-translate-y-2 ${
                plan.highlighted
                  ? "bg-gradient-to-tl from-teal-400 to-teal-500 border-yellow-400 scale-105 shadow-2xl"
                  : "bg-gray-900 border-gray-700"
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block mb-2 px-3 py-1 text-sm font-semibold text-gray-900 bg-yellow-400 rounded-full">
                  {plan.label}
                </span>
              )}
              <h3 className="text-xl font-semibold mb-2 text-white">{plan.title}</h3>
              <p className="text-3xl font-bold text-yellow-400 mb-6">{plan.price}</p>
              <ul className="space-y-3 mb-6 text-gray-300 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="text-green-400" size={18} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleGetStarted(plan.title)}
                className={`inline-block px-6 py-3 rounded-full font-semibold transition ${
                  plan.highlighted
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                    : "bg-teal-400 text-gray-900 hover:bg-teal-500"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-lg relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              <X size={24} />
            </button>

            {success !== true ? (
              <>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Get Started with {selectedPlan}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div>
                    <label className="block text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="user_phone"
                      value={formData.user_phone}
                      onChange={handleChange}
                      placeholder="10 digits only"
                      className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Project Description</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1">Budget (Optional)</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-teal-400 text-gray-900 py-2 rounded-lg font-semibold hover:bg-teal-500 transition disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Submit"}
                  </button>
                </form>
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
                  Your message has been sent successfully. We’ll get back to you soon.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
