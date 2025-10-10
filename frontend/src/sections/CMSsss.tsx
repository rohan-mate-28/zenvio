"use client";

import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { IndianRupee, X, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import emailjs from "@emailjs/browser";

// --- Icon Components ---
const IconUser = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className="w-5 h-5 text-teal-500 opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
const IconPhone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className="w-5 h-5 text-teal-500 opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.408 5.408l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className="w-5 h-5 text-teal-500 opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-17 4v7a2 2 0 002 2h12a2 2 0 002-2v-7m-17 0l8-5 8 5" />
  </svg>
);
const IconMessage = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} className="w-5 h-5 text-teal-500 opacity-80" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.111A9.553 9.553 0 0112 3a9 9 0 019 9z" />
  </svg>
);

// --- Types ---
type FormData = {
  user_name: string;
  user_email: string;
  user_phone: string;
  message: string;
  plan: string;
  budget: string;
};

type FormMessage = { type: "error" | "success"; message: string } | null;

export default function CMS() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    user_email: "",
    user_phone: "",
    message: "",
    plan: "Premium Website + CMS",
    budget: "26,000",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<FormMessage>(null);

  const inputRefs = useRef<{ [key: string]: HTMLInputElement | HTMLTextAreaElement | null }>({});

  const CURRENT_PRICE = "26,000";
  const LOGIN_PATH = "/auth/login";

  // --- Handlers ---
  const handlePurchaseClick = () => {
    if (!user) {
      router.push(LOGIN_PATH);
    } else {
      setIsModalOpen(true);
      setTimeout(() => inputRefs.current["user_name"]?.focus(), 100);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormMessage(null);
    setFormData({ user_name: "", user_email: "", user_phone: "", message: "", plan: "Premium Website + CMS", budget: CURRENT_PRICE });
  };

  const handlePlaceOrder = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormMessage(null);

    if (!formData.user_name || !formData.user_phone || !formData.user_email || !formData.message) {
      setFormMessage({ type: "error", message: "Please complete all fields." });
      return;
    }

    setIsLoading(true);
    const referenceId = `CMS${Math.floor(Math.random() * 10000)}`;

    try {
      await emailjs.send(
        "service_v1jt0vh",
        "template_fez7wss",
        { ...formData, reference_id: referenceId },
        "O4YCnTTt5kUrIiZqW"
      );

      setFormMessage({
        type: "success",
        message: `🎉 Order confirmed! Reference ID: ${referenceId}. We'll contact you soon at ${formData.user_email}.`,
      });
      setFormData({ user_name: "", user_email: "", user_phone: "", message: "", plan: "Premium Website + CMS", budget: CURRENT_PRICE });
    } catch (err) {
      console.error(err);
      setFormMessage({ type: "error", message: "Failed to send order. Try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  // --- Input Components ---
  const InputField: React.FC<{ name: keyof FormData; type?: string; icon: React.FC<React.SVGProps<SVGSVGElement>>; placeholder: string }> = ({ name, type = "text", icon: Icon, placeholder }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-600 opacity-70" />
      <input
        ref={(el) => { inputRefs.current[name] = el; }}
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        required
        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-inner bg-gray-50 text-gray-800 placeholder:text-gray-400 outline-none caret-teal-600 hover:border-teal-300"
      />
    </div>
  );

  const TextareaField: React.FC<{ name: keyof FormData; icon: React.FC<React.SVGProps<SVGSVGElement>>; placeholder: string }> = ({ name, icon: Icon, placeholder }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-3 w-5 h-5 text-teal-600 opacity-70" />
      <textarea
        ref={el => { inputRefs.current[name] = el }}
        name={name}
        value={formData[name] || ""}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={4}
        required
        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-inner bg-gray-50 text-gray-800 placeholder:text-gray-400 outline-none caret-teal-600 resize-none hover:border-teal-300"
      />
    </div>
  );

  // --- Render ---
  return (
    <section className="min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col items-center justify-center px-6 py-12 perspective-1000">
  {/* Header */}
  <div className="text-center max-w-3xl mb-12">
    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 animate-fadeInDown">
      Premium Website + CMS
    </h2>
    <p className="text-gray-700 text-lg sm:text-xl animate-fadeIn delay-200">
      Fully responsive, SEO-optimized website with a custom CMS to manage your content easily.
    </p>
  </div>

  {/* Feature Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mb-12">
    {[
      { title: "Responsive Design", desc: "Looks perfect on desktop, tablet & mobile devices.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> },
      { title: "Custom CMS", desc: "Easily manage content and update your website anytime.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-4H5v4h4zm6 0v-4h-4v4h4zm-6-6V7H5v4h4zm6 0V7h-4v4h4z" /> },
      { title: "SEO Optimized", desc: "Built with SEO best practices for better ranking in Google.", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" /> },
    ].map((item, idx) => (
      <div
        key={idx}
        className="bg-white shadow-2xl rounded-3xl p-6 flex flex-col items-center text-center transform transition-transform duration-500 hover:scale-105 hover:-translate-y-2 hover:rotate-1 hover:shadow-teal-300/40 cursor-pointer"
        style={{ perspective: "800px" }}
      >
        <svg className="w-12 h-12 text-teal-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {item.icon}
        </svg>
        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.desc}</p>
      </div>
    ))}
  </div>

  {/* Purchase Button */}
  <button
    onClick={handlePurchaseClick}
    className="px-10 py-4 text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-teal-600 to-indigo-600 rounded-3xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-teal-500/50 hover:from-teal-700 hover:to-indigo-700 active:scale-95 active:translate-y-0"
  >
    Purchase Now
  </button>

  {/* Modal */}
  {isModalOpen && (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-3xl p-8 w-full max-w-lg transform transition-transform duration-500 shadow-2xl animate-slideInDown"
        style={{ perspective: "1000px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-indigo-700">Confirm Order</h3>
          <button onClick={closeModal} className="text-gray-400 hover:text-indigo-600 p-2 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {formMessage && (
          <div
            className={`p-4 mb-6 rounded-xl text-base border ${
              formMessage.type === "error"
                ? "bg-red-50 text-red-700 border-red-300"
                : "bg-green-50 text-green-700 border-green-300"
            }`}
          >
            {formMessage.message}
          </div>
        )}

        {!formMessage?.message?.includes("success") && (
          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <InputField name="user_name" icon={IconUser} placeholder="Your Full Name" />
            <InputField name="user_email" icon={IconMail} placeholder="Your Email" type="email" />
            <InputField name="user_phone" icon={IconPhone} placeholder="Mobile Number" type="tel" />
            <TextareaField name="message" icon={IconMessage} placeholder="Brief Project Description" />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-lg font-semibold bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition-all flex justify-center items-center disabled:bg-gray-400"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Finalizing...
                </>
              ) : (
                "Confirm & Get Started"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )}

  {/* Animation Keyframes (Tailwind plugin) */}
  <style jsx>{`
    @keyframes fadeInDown {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeInDown { animation: fadeInDown 0.6s ease forwards; }
    .animate-fadeIn { animation: fadeInDown 0.8s ease forwards; }
    @keyframes slideInDown {
      0% { opacity: 0; transform: translateY(-50px) rotateX(10deg); }
      100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
    }
    .animate-slideInDown { animation: slideInDown 0.5s ease-out forwards; }
  `}</style>
</section>

  );
}
