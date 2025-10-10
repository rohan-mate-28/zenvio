"use client";

import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { logoutUser } from "@/store/slices/authSlice";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown"; 
import { useRouter } from "next/navigation"; // <-- Import router
type NavItemProps = {
  href: string;
  children: ReactNode;
};
const NAV_LINKS = [
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

const OptimizedNavbar = () => {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter(); // <-- initialize router
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => setMounted(true), []);

  const closeMenu = () => setMenuOpen(false);

  if (!mounted) return null;

  const NavItem = ({ href, children }:NavItemProps) => (
    <li>
      <Link
        href={href}
        onClick={closeMenu}
        className="text-sm md:text-base hover:text-yellow-400 transition"
      >
        {children}
      </Link>
    </li>
  );

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // wait for logout to complete
      router.push("/"); // redirect to home
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="navigation"
      aria-label="Main Website Navigation"
      className="bg-gray-800 text-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/loggg.png"
            alt="ZenVio Web Pack - Premium Freelance SEO and Web Services"
            width={35}
            height={35}
          />
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-cyan-300">
              ZenVio
            </span>
            <span className="text-sm font-semibold ml-1">Web Pack</span>
          </span>
        </Link>

        <ul role="list" className="hidden md:flex items-center gap-6 lg:gap-8">
          <NavItem href="/">Home</NavItem>
          {NAV_LINKS.map((link) => (
            <NavItem key={link.name} href={link.href}>{link.name}</NavItem>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "admin" && <NavItem href="/admin/dashboard">Dashboard</NavItem>}
              <ProfileDropdown />
              <button
                onClick={handleLogout} // <-- use updated logout handler
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition hover:scale-105 text-sm md:text-base"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login" onClick={closeMenu}>
                <button className="px-4 py-2 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-200 transition text-sm md:text-base">
                  Login
                </button>
              </Link>
               
            </div>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition z-50"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className={`md:hidden bg-gray-700/95 absolute w-full transition-all duration-300 overflow-hidden`}
      >
        <ul role="list" className="px-4 sm:px-6 py-4 space-y-3 flex flex-col items-start">
          <NavItem href="/">Home</NavItem>
          {NAV_LINKS.map((link) => (
            <NavItem key={link.name} href={link.href}>{link.name}</NavItem>
          ))}
          <hr className="w-full border-gray-600 my-2" />
          {user ? (
            <>
              <p className="w-full text-base font-semibold py-2">👋 Welcome {user.name}</p>
              {user.role === "admin" && <NavItem href="/admin/dashboard">Dashboard</NavItem>}
              <button
                onClick={() => { handleLogout(); closeMenu(); }}
                className="w-full px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-base font-semibold text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="w-full" onClick={closeMenu}>
                <button className="w-full px-4 py-2 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-200 text-base">
                  Login
                </button>
              </Link>
               
            </>
          )}
        </ul>
      </motion.div>
    </motion.nav>
  );
};

export default OptimizedNavbar;
