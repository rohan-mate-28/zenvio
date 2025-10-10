"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 text-sm md:text-base font-medium w-full md:w-auto text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
      >
        Profile
      </button>
      

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 md:right-0 mt-2 w-full md:w-48 bg-white rounded-xl shadow-lg border z-50"
          >
            <ul className="py-2">
              <li>
                <button
                  onClick={() => { router.push("/profile"); setOpen(false); }}
                  className="flex items-center gap-2 w-full px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <User className="w-5 h-5" />
                  View Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => { router.push("/order"); setOpen(false); }}
                  className="flex items-center gap-2 w-full px-4 py-3 text-gray-700 hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5" />
                  Orders
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
