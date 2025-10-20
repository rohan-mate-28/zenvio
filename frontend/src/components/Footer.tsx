"use client";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Recent Work", href: "#portfolio" },
    { name: "Pricing Plans", href: "#plans" },
    { name: "Start a Project", href: "#contact" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "https://www.facebook.com/share/17avP1rWag/", label: "Facebook" },
    { icon: FaInstagram, href: "https://www.instagram.com/zenvioweb/", label: "Instagram" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-16 font-inter border-t border-gray-800 shadow-2xl">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-gray-700 pb-12">

          {/* Company Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-4xl font-extrabold text-yellow-400 mb-4 tracking-wider">ZenVio</h3>
            <p className="max-w-lg text-gray-400 leading-relaxed">
              We deliver premium web development services — crafting responsive, high-performance, and SEO-optimized digital solutions tailored to elevate your business.
            </p>

            {/* Social Links */}
            <div className="flex space-x-5 pt-4 text-2xl">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-gray-500 hover:text-yellow-400 transition transform hover:scale-110 duration-300"
                  aria-label={link.label}
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-yellow-400 inline-block pb-1">
              Explore
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-gray-400 hover:text-yellow-400 transition duration-200 text-base"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 border-b-2 border-yellow-400 inline-block pb-1">
              Contact Us
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start">
                <FaEnvelope className="text-yellow-400 mr-3 mt-1 flex-shrink-0" size={16} />
                <a href="mailto:contact.zenvio@gmail.com" className="hover:text-yellow-400 transition">
                  contact.zenvio@gmail.com
                </a>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-yellow-400 mr-3 mt-1 flex-shrink-0" size={16} />
                <a href="tel:+917387122435" className="hover:text-yellow-400 transition">
                  +91 73871 22435
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 text-sm flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p className="order-2 md:order-1 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} <span className="text-yellow-400 font-semibold">ZenVio</span>. All rights reserved.
          </p>
          <div className="flex space-x-6 order-1 md:order-2">
            <a href="/PrivacyPolicy" className="hover:text-yellow-400 transition">Privacy Policy</a>
            <a href="/TermsofService" className="hover:text-yellow-400 transition">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* SEO Hidden Description */}
      <p className="sr-only">
        ZenVio offers premium web development, SEO optimization, and custom digital solutions for businesses. Contact us for responsive websites, e-commerce, and enterprise platforms.
      </p>
    </footer>
  );
}
