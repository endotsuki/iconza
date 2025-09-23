import { IconBrandGithub } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-y-4 gap-x-6 px-6 py-8 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <p>
            © {year}{" "}
            <Link
              to="/"
              className="font-medium text-neutral-800 dark:text-neutral-200 hover:text-lime-500 transition-colors"
            >
              iconza
            </Link>
            . All rights reserved.
          </p>
        </div>

        {/* Right: Credit + Socials */}
        <div className="flex items-center gap-4">
          <p className="flex items-center gap-1.5">
            <span>Crafted by</span>
            <span
              className="font-medium text-neutral-800 dark:text-neutral-200 hover:underline transition-colors">
              Socheat
            </span>
          </p>
          <span className="text-neutral-300 dark:text-neutral-700">|</span>
          <a
            href="https://github.com/socheatsok78/iconza"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            title="GitHub Repository"
            className="text-neutral-700 dark:text-neutral-300 hover:text-lime-500 dark:hover:text-lime-500 transition-colors"
          >
            <IconBrandGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
