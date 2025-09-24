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
          `https://api.npmjs.org/downloads/point/${startDate}:${endDate}/iconza`
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
      { value: totalDownloads, label: "Downloads", icon: IconDownload }, // Use state here
      { label: "MIT Licensed", icon: IconLicense },
      { label: "Open Source", icon: IconSourceCode },
    ],
  };

  return (
    <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-inner">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 xl:grid-cols-3 place-items-center justify-between justify-items-stretch">
          {/* Left Column */}
          <div className="space-y-6 max-w-sm flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex h-10 w-10 items-center">
                <img src="/iconza.avif" alt="iconza" />
              </div>
              <span className="text-2xl font-semibold tracking-wide text-gray-900 dark:text-white">
                IconZa
              </span>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              A modern icon library built for developers. Beautiful, consistent,
              and easy to use icons for your next project.
            </p>
          </div>

          {/* Right Columns */}
          <div className="xl:col-span-2 grid gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 tracking-wide">
                Product
              </h3>
              <ul className="space-y-5">
                {navigation.main.map(({ name, href, icon: Icon }) => (
                  <li key={name}>
                    <Link
                      to={href}
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-lime-400 transition-colors text-sm font-medium"
                    >
                      <Icon className="h-6 w-6 flex-shrink-0" />
                      <span>{name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 tracking-wide">
                Stats
              </h3>
              <ul className="space-y-5 text-gray-600 dark:text-gray-400 text-sm">
                {navigation.stats.map(({ value, label, icon: Icon }) => (
                  <li
                    key={label}
                    className="flex items-center space-x-3 font-medium"
                  >
                    <Icon className="h-6 w-6 text-primary" />
                    <span>{value ? `${value.toLocaleString()} ` : ""}{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            &copy; {year} IconZa. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Made with <span aria-label="love" role="img">❤️</span> for the developer community
          </p>
        </div>
      </div>
    </footer>
  );
}
