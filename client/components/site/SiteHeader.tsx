import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import {
  IconSmartHome,
  IconFileDescription,
  IconIcons,
  IconMenu4,
  IconX,
  IconMessage,
} from "@tabler/icons-react";

export function SiteHeader() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", Icon: IconSmartHome },
    { href: "/icons", label: "Icons", Icon: IconIcons },
    { href: "/docs", label: "Documentation", Icon: IconFileDescription },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-500/10 border border-lime-500/20 group-hover:border-lime-500/40 transition-all duration-300">
                <img
                  src="/iconza.avif"
                  alt="iconza"
                  className="h-6 w-6 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                IconZa
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map(({ href, label, Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    to={href}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-300 group relative ${
                      isActive
                        ? "text-lime-400 bg-lime-500/10 border border-lime-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    <span className="font-medium text-sm">{label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-lime-400 rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Contact Button */}
              <Link
                to="/contact"
                className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-lime-500 text-black font-semibold transition-all duration-300 hover:bg-lime-400 hover:scale-105 group"
              >
                <IconMessage className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-sm transition-transform group-hover:translate-x-0.5">
                  Contact
                </span>
              </Link>

              {/* Theme Toggler */}
              <div className="relative">
                <AnimatedThemeToggler />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white hover:border-lime-500/30 transition-all duration-300"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <IconX className="h-5 w-5" /> : <IconMenu4 className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-gray-800/50 overflow-hidden"
              >
                <div className="p-4 space-y-2">
                  {links.map(({ href, label, Icon }) => {
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={href}
                        to={href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-lime-500/10 text-lime-400 border border-lime-500/20"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{label}</span>
                      </Link>
                    );
                  })}
                  
                  {/* Mobile Contact Button */}
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-lime-500 text-black font-semibold transition-all duration-300 hover:bg-lime-400 mt-2 justify-center"
                  >
                    <IconMessage className="h-5 w-5" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}