import React, { useState, useEffect } from "react";
import {
  IconBrandGithub,
  IconBrandX,
  IconMail,
  IconStar,
  IconDownload,
  IconLicense,
  IconSourceCode,
  IconSmartHome,
  IconIcons,
  IconFileDescription,
  IconMessage,
  IconHeart,
  IconBrandNpm,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { icons } from "iconza";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const [totalDownloads, setTotalDownloads] = useState<number>(0);

  useEffect(() => {
    async function fetchTotal() {
      try {
        const startDate = "2024-01-01";
        const endDate = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `https://api.npmjs.org/downloads/point/${startDate}:${endDate}/iconza`,
        );
        const data: { downloads?: number } = await response.json();
        setTotalDownloads(data.downloads ?? 0);
      } catch (err) {
        console.error("Error fetching total downloads:", err);
        setTotalDownloads(0);
      }
    }
    fetchTotal();

    const interval = setInterval(fetchTotal, 3600000);
    return () => clearInterval(interval);
  }, []);

  const navigation = {
    main: [
      { name: "Home", href: "/", icon: IconSmartHome },
      { name: "Icons", href: "/icons", icon: IconIcons },
      { name: "Documentation", href: "/docs", icon: IconFileDescription },
      { name: "Contact", href: "/contact", icon: IconMessage },
    ],
    stats: [
      { value: Object.keys(icons).length, label: "Icons", icon: IconStar },
      { value: totalDownloads, label: "Downloads", icon: IconDownload },
      { label: "MIT Licensed", icon: IconLicense },
      { label: "Open Source", icon: IconSourceCode },
    ],
    social: [
      {
        name: "GitHub",
        href: "https://github.com",
        icon: IconBrandGithub,
        color: "hover:text-gray-400",
      },
      {
        name: "Twitter",
        href: "https://twitter.com",
        icon: IconBrandX,
        color: "hover:text-gray-400",
      },
      {
        name: "Email",
        href: "mailto:hello@example.com",
        icon: IconMail,
        color: "hover:text-lime-400",
      },
      {
        name: "NPM",
        href: "https://npmjs.com/package/iconza",
        icon: IconBrandNpm,
        color: "hover:text-red-400",
      },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <img src="/iconza.avif" alt="iconza" className="h-8 w-8" />
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                IconZa
              </span>
            </Link>

            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              A modern icon library built for developers. Beautiful, consistent,
              and easy to use icons for your next project.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  className={`p-2 rounded-lg bg-gray-800/50 border border-gray-700 text-gray-400 transition-all duration-200 ${item.color} hover:border-lime-500/30 hover:scale-110`}
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <span className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
              Navigation
            </span>
            <ul className="space-y-4">
              {navigation.main.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <Link
                    to={href}
                    className="flex items-center space-x-3 text-gray-400 hover:text-lime-400 transition-all duration-200 group text-sm font-medium py-2"
                  >
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span className="group-hover:translate-x-1 transition-transform">
                      {name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats Section */}
          <div>
            <span className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
              Statistics
            </span>
            <div className="grid gap-4">
              {navigation.stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700 hover:border-lime-500/30 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-lime-500/10">
                      <Icon className="h-4 w-4 text-lime-400" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      {label}
                    </span>
                  </div>
                  {value && (
                    <span className="text-white font-bold text-sm bg-lime-500/10 px-2 py-1 rounded">
                      {value.toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-lime-500/50 to-transparent"></div>
        <div className="mt-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>&copy; {year} IconZa. All rights reserved.</span>
              <span className="hidden lg:block">•</span>
              <span>Built with modern web technologies</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-400">
              <span className="text-sm">Made with</span>
              <IconHeart className="h-4 w-4 text-red-400 animate-pulse" />
              <span className="text-sm">for the developer community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
