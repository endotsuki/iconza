import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSmartHome,
  IconFileDescription,
  IconIcons,
  IconMenu4,
  IconX,
  IconMessage,
  IconHistory,
} from "@tabler/icons-react";
import { VersionHistory } from "../VersionHistory";

export function SiteHeader() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const links = [
    { href: "/", label: "Home", Icon: IconSmartHome },
    { href: "/icons", label: "Icons", Icon: IconIcons },
    { href: "/docs", label: "Documentation", Icon: IconFileDescription },
    { href: "/contact", label: "Contact", Icon: IconMessage },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-gradient-to-br from-gray-900/10 to-black/10 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl"
        >
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/iconza.avif"
                alt="iconza"
                className="h-9 w-9 group-hover:scale-110 transition-transform duration-300"
              />
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
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 group relative ${isActive
                      ? "text-lime-400 bg-lime-500/10 border border-lime-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <Icon size={20} className="transition-transform group-hover:scale-110" />
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
              <button
                onClick={() => setShowHistory(true)}
                className="hidden group relative sm:inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-px focus:outline-none"
              >
                <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#94c748_0%,#000000_50%,#94c748_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 sm:px-8 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
                  <IconHistory size={20} className="sm:h-4 sm:w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                    Changelog
                  </span>
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 hover:text-white hover:border-lime-500/30 transition-all duration-300"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? (
                  <IconX className="h-5 w-5" />
                ) : (
                  <IconMenu4 className="h-5 w-5" />
                )}
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
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                          ? "bg-lime-500/10 text-lime-400 border border-lime-500/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                          }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{label}</span>
                      </Link>
                    );
                  })}

                  {/* Mobile History Button */}
                  <button
                    onClick={() => setShowHistory(true)}
                    className="group relative inline-flex h-10 sm:h-12 overflow-hidden rounded-full p-px"
                  >
                    <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#94c748_0%,#000000_50%,#94c748_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 sm:px-8 text-xs sm:text-sm font-medium text-white backdrop-blur-3xl gap-2">
                      <IconHistory size={20} className="sm:h-4 sm:w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                      <span className="transform transition-transform font-medium duration-300 group-hover:translate-x-1 ">
                        Changelog
                      </span>
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Version History Modal */}
      <VersionHistory isOpen={showHistory} onClose={() => setShowHistory(false)} />
    </header>
  );
}