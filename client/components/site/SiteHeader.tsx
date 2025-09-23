import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

import { IconSmartHome, IconBook, IconIcons, IconMenu4, IconX, IconMessage } from "@tabler/icons-react";

export function SiteHeader() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", Icon: IconSmartHome },
    { href: "/icons", label: "Icons", Icon: IconIcons },
    { href: "/docs", label: "Docs", Icon: IconBook },
  ];

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="backdrop-blur-md bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-2xl shadow-lg py-5 px-9 flex items-center justify-between"
      >
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/iconza.avif"
            alt="iconza"
            className="h-10 w-10 hover:scale-105 transition-transform duration-200"
          />
        </Link>
        {/* Nav links (desktop) */}
        <nav className="hidden lg:flex items-center gap-6">
          {links.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-1 px-3 py-2 rounded-2xl transition-colors duration-200 ${isActive
                  ? "border border-lime-500/50 text-lime-800 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-lime-500/40 dark:hover:bg-lime-900/50 hover:text-lime-600 dark:hover:text-white"
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="group relative hidden md:inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-lime-500/10 text-lime-500/90 font-medium transition-all duration-300 hover:bg-lime-500/50 hover:text-white"
          >
            <IconMessage
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Contact
            </span>
          </Link>

          <AnimatedThemeToggler />

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <IconX /> : <IconMenu4 />}
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mt-2 backdrop-blur-lg bg-white/20 dark:bg-black/20 border border-white/30 dark:border-white/10 rounded-3xl shadow-lg py-4 px-6 flex flex-col gap-2 lg:hidden"
        >
          {links.map(({ href, label, Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                to={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 w-full ${isActive
                  ? "bg-white/70 dark:bg-gray-800/60 text-gray-900 dark:text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white/40 dark:hover:bg-gray-900/50 hover:text-gray-900 dark:hover:text-white"
                  }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="group relative inline-flex items-center justify-start gap-2 px-6 py-2 rounded-full border border-lime-500 text-lime-500 font-medium transition-all duration-300 hover:bg-lime-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
          >
            <IconMessage
              className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              Contact
            </span>
          </Link>
        </motion.div>
      )}
    </header>
  );
}