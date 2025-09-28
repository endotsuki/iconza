import { cn } from "@/lib/utils";
import { useState } from "react";
import { Icon } from "iconza";

export const FloatingSocialButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      href: "https://github.com/Onimuxha",
      iconName: "GitHubLight" as const,
      label: "GitHub",
    },
    {
      href: "https://www.npmjs.com/package/iconza",
      iconName: "NPM" as const,
      label: "NPM",
    },
    {
      href: "https://reddit.com/user/5ukuna_ryomen/",
      iconName: "Reddit" as const,
      label: "Reddit",
    },
    {
      href: "https://x.com/onimuxha",
      iconName: "XLight" as const,
      label: "X",
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
            "w-12 h-12 rounded-full bg-lime-500 text-black",
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
                "absolute w-5 h-0.5 bg-white transition-all duration-300",
                "transform",
                isOpen ? "rotate-45" : "rotate-0",
              )}
            />
            <div
              className={cn(
                "absolute w-5 h-0.5 bg-white transition-all duration-300",
                "transform",
                isOpen ? "-rotate-45" : "rotate-0",
              )}
            />
            {!isOpen && (
              <div
                className={cn(
                  "absolute w-0.5 h-5 bg-white transition-all duration-300",
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
                "bg-neutral-800 border border-lime-500/30 text-lime-500",
                "hover:scale-110 hover:text-white shadow-lg",
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
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <Icon
                  name={link.iconName}
                  size={20}
                  className="transition-colors duration-300"
                />
              </div>
            </a>
          ))}
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-sm z-30 lg:hidden"
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
      "bg-neutral-800 border border-neutral-800",
      "hover:scale-110 hover:-translate-y-1",
      "text-lime-500 hover:text-white",
      link.color,
      "before:absolute before:inset-0 before:rounded-xl",
      "before:bg-lime-500 before:opacity-0 before:transition-opacity",
      "hover:before:opacity-10",
      "after:absolute after:inset-0 after:rounded-xl",
      "after:border after:border-lime-500 after:opacity-0",
      "after:transition-all after:duration-300",
      "hover:after:opacity-100 hover:after:scale-90",
    )}
    aria-label={link.label}
    title={link.label}
  >
    <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center w-full h-full">
      <Icon
        name={link.iconName}
        size={25}
        className="transition-colors duration-300"
      />
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
