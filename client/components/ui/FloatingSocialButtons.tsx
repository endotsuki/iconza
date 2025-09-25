import {
  IconCup,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTelegram,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const FloatingSocialButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      href: "https://github.com/yourusername",
      icon: <IconBrandGithub size={20} stroke={1.5} />,
      label: "GitHub",
      color: "hover:text-gray-100",
    },
    {
      href: "https://linkedin.com/in/yourusername",
      icon: <IconBrandLinkedin size={20} stroke={1.5} />,
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      href: "https://t.me/yourusername",
      icon: <IconBrandTelegram size={20} stroke={1.5} />,
      label: "Telegram",
      color: "hover:text-[#0088cc]",
    },
    {
      href: "https://buymeacoffee.com/onimuxha",
      icon: <IconCup size={20} stroke={1.5} />,
      label: "Buy Me a Coffee",
      color: "hover:text-amber-500",
    },
  ];

  return (
    <>
      {/* Desktop Version (lg and above) */}
      <aside
        className={cn(
          "fixed right-4 top-2/4 z-50 translate-y-24 hidden lg:flex",
          "bg-black/80 backdrop-blur-xl border border-lime-500/30",
          "rounded-2xl shadow-2xl p-3 flex-col gap-3",
          "transform transition-all duration-300 hover:scale-105",
          "hover:border-lime-500/50 hover:shadow-lime-500/20",
        )}
      >
        {links.map((link) => (
          <DesktopButton key={link.href} link={link} />
        ))}
      </aside>

      {/* Mobile Version (below lg) */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full bg-lime-500 text-black",
            "flex items-center justify-center shadow-2xl",
            "border-2 border-lime-400 transition-all duration-300",
            "hover:scale-110 active:scale-95 relative z-50",
            "focus:outline-none focus:ring-4 focus:ring-lime-500/50",
          )}
          aria-label="Social links"
        >
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div
              className={cn(
                "absolute w-5 h-0.5 bg-black transition-all duration-300",
                "transform",
                isOpen ? "rotate-45" : "rotate-0",
              )}
            />
            <div
              className={cn(
                "absolute w-5 h-0.5 bg-black transition-all duration-300",
                "transform",
                isOpen ? "-rotate-45" : "rotate-0",
              )}
            />
            {!isOpen && (
              <div
                className={cn(
                  "absolute w-0.5 h-5 bg-black transition-all duration-300",
                  "transform",
                  isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
                )}
              />
            )}
          </div>
        </button>

        {/* Expanded Menu */}
        <div
          className={cn(
            "absolute bottom-16 right-0 flex flex-col gap-3 z-40",
            "transition-all duration-300 transform origin-bottom-right",
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-50 translate-y-4 pointer-events-none",
          )}
        >
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex items-center justify-center",
                "w-12 h-12 rounded-full transition-all duration-300",
                "bg-black border border-lime-500/30 text-lime-500",
                "hover:scale-110 hover:text-white shadow-lg",
                link.color,
                "transform transition-all duration-300",
                isOpen
                  ? `translate-y-0 opacity-100`
                  : "translate-y-4 opacity-0",
              )}
              aria-label={link.label}
              title={link.label}
              style={{
                transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
              }}
              onClick={() => setIsOpen(false)}
            >
              <div className="relative z-10">{link.icon}</div>
            </a>
          ))}
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
};

// Desktop Button Component
const DesktopButton = ({ link }) => (
  <a
    href={link.href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "group relative flex items-center justify-center",
      "w-12 h-12 rounded-xl transition-all duration-300",
      "bg-neutral-900 border border-neutral-800",
      "hover:scale-110 hover:-translate-y-1",
      "text-lime-500 hover:text-white",
      link.color,
      "before:absolute before:inset-0 before:rounded-xl",
      "before:bg-lime-500 before:opacity-0 before:transition-opacity",
      "hover:before:opacity-10",
      "after:absolute after:inset-0 after:rounded-xl",
      "after:border-2 after:border-lime-500 after:opacity-0",
      "after:transition-all after:duration-300",
      "hover:after:opacity-100 hover:after:scale-90",
    )}
    aria-label={link.label}
    title={link.label}
  >
    <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
      {link.icon}
    </div>

    <div
      className={cn(
        "absolute right-full mr-3 px-2 py-1",
        "bg-black text-white text-xs rounded-md",
        "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
        "whitespace-nowrap pointer-events-none",
        "border border-lime-500/30",
      )}
    >
      {link.label}
      <div className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-black rotate-45 border-r border-b border-lime-500/30"></div>
    </div>
  </a>
);
