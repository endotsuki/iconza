import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/ui/code-block";
import { SEO } from "@/components/SEO";
import { icons } from "../../packages/iconza/src/index.ts";
import pkg from "../../packages/iconza/package.json";
import { FlipWords } from "../components/ui/flip-words.tsx";
import { SiteHeader } from "../components/site/SiteHeader.tsx";
import { SiteFooter } from "../components/site/SiteFooter.tsx";
import { HeroBackground } from "../components/ui/shap-loading-hero.tsx";
import {
  IconArrowRight,
  IconRocket,
  IconColorFilter,
  IconTextResize,
  IconBackground,
  IconLayersIntersect,
  IconSourceCode,
} from "@tabler/icons-react";
import { categories } from "../components/site/IconExplorer/iconUtils.tsx";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "../components/ui/terminal.tsx";
import { NumberTicker } from "../components/ui/number-ticker.tsx";
import { useState, useEffect } from "react";
import Button from "@/components/ui/go-btn.tsx";
import LogoLoop from "@/components/ui/LogoLoop.tsx";

const heroList = [
  "BehanceFill",
  "Dribbble",
  "Fresh",
  "ROG",
  "Envato",
  "PNPM",
  "Slack",
  "Chrome",
  "AtlassianBitbucket",
  "GoDaddy",
  "AdobeInDesign",
  "Discord",
] as const;

const loopIcon = [
  "Razer",
  "Debian",
  "RedHat",
  "Snapdragon",
  "TypeScript",
  "CSS",
  "ReactQuery",
  "Kotlin",
  "GraphQL",
  "VisualStudio",
  "Bitwarden",
  "HoundCI",
  "NordVPN",
  "Windows11",
  "Filmora",
  "Xing",
  "Tor"
] as const;

export async function getStaticProps() {
  const res = await fetch(
    "https://api.npmjs.org/downloads/point/last-week/iconza",
  );
  const data = await res.json();

  return {
    props: {
      downloadsLastWeek: data.downloads,
    },
    revalidate: 3600,
  };
}

const words = ["Beautiful.", "Better.", "Modern.", "Scalable."];

const features = [
  {
    icon: IconRocket,
    title: "Lightning Fast",
    description:
      "Optimized SVG icons that load instantly. Tree-shakable imports mean you only bundle what you use.",
  },
  {
    icon: IconTextResize,
    title: "Customizable",
    description:
      "Easily adjust size, color, and stroke width. Perfect for any design system or theme.",
  },
  {
    icon: IconColorFilter,
    title: "Brand Perfect",
    description:
      "Authentic brand colors and consistent visual identity. Dark mode support built right in.",
  },
  {
    icon: IconBackground,
    title: "Consistent Icons",
    description:
      "Uniform design language across all icons. Perfectly balanced for any UI or UX project.",
  },
  {
    icon: IconLayersIntersect,
    title: "Easy Integration",
    description:
      "Simple installation and usage. Works seamlessly with React, Vue, Angular, and plain HTML.",
  },
  {
    icon: IconSourceCode,
    title: "Open Source",
    description:
      "Community-driven and open for contributions. Regular updates with new icons and features.",
  },
];

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

const steps = [
  {
    title: "Install the package",
    description: "Run 'npm install iconza' in your project directory.",
  },
  {
    title: "Import icons",
    description: "Import any icon from 'iconza' and use it in your components.",
  },
  {
    title: "Customize",
    description: "Adjust size, color, and stroke to fit your design system.",
  },
];

export function HomeHero() {
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

  const stats: Stat[] = [
    { value: Object.keys(icons).length, label: "Total Icons" },
    { value: 100, suffix: "%", label: "Open Source" },
    { value: categories.length - 1, label: "Categories" },
    { value: totalDownloads, label: "Total Downloads" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <SEO title="Iconza - Free React Icon Library" description="Animated, accessible, and developer-first icon set built for React, Tailwind, and Vite." />
      <SiteHeader />
      <main>
        <section className="min-h-screen relative pt-24 overflow-hidden">
          <HeroBackground className="absolute inset-0 w-full h-full z-0 pointer-events-none" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 mb-20 md:py-20 grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="mt-2 inline-block rounded-full bg-lime-500/10 px-3 py-1 text-sm font-medium border border-lime-500/50 text-lime-400">
                v{pkg.version}
              </p>
              <h1 className="text-5xl md:text-7xl font-semibold text-balance">
                Every icon you need.
                <FlipWords
                  words={words}
                  className="font-normal text-lime-500"
                />
              </h1>

              <p className="mt-4 text-xl max-w-prose text-muted-foreground mb-8">
                A modern, accessible icon set with original brand colors, full
                TypeScript support, and delightful animations.
              </p>
              <div className="space-y-6">
                <CodeBlock
                  language="bash"
                  filename="terminal"
                  code={`npm install iconza`}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/icons">
                    <button className="group relative inline-flex h-12 overflow-hidden rounded-full p-px">
                      <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#84cc16_0%,#000000_50%,#84cc16_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        <IconArrowRight
                          size={20}
                          className="mr-2 transform transition-transform duration-300 group-hover:translate-x-28"
                        />
                        <span className="transform transition-transform duration-300 group-hover:-translate-x-6">
                          Explore All Icons
                        </span>
                      </span>
                    </button>
                  </Link>
                  <Button color="#84cc16" text="View Document" to="/docs" />
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {heroList.map((name, index) => {
                const Comp = icons[name];
                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="flex items-center justify-center rounded-3xl border border-white/20 p-6 backdrop-blur-sm bg-white/5"
                  >
                    <Comp size={48} aria-label={name} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <LogoLoop
            logos={loopIcon.map(name => ({
              component: icons[name],
              name: name
            }))}
            speed={70}
            direction="left"
            logoHeight={40}
            gap={40}
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Technology partners"
          />
        </section>


        {/* Features Section */}
        <section className="py-24 bg-gray-950/50">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-400 border border-lime-500/20 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-lime-500"></div>
              Overview
            </div>
            <h2 className="text-3xl sm:text-6xl font-medium text-white uppercase">
              Why Choose iconza?
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Built by developers, for developers. Every icon is crafted with
              attention to detail and optimized for modern web applications.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 mb-20">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gray-900/50 shadow-lg border border-gray-700"
              >
                <div
                  className={`w-12 h-12 mx-auto mb-6 rounded-2xl bg-lime-500/10 flex items-center justify-center`}
                >
                  <Icon className={`w-6 h-6 text-lime-500`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {title}
                </h3>
                <p className="text-gray-400">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, label, suffix }) => (
              <div key={label}>
                <NumberTicker
                  value={value}
                  suffix={suffix}
                  className="text-7xl font-medium tracking-tighter text-lime-500"
                />
                <div className="text-sm text-gray-400">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started Section */}
        <section className="py-24">
          {/* Heading with motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-400 border border-lime-500/20 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-lime-500"></div>
              Quick Start
            </div>
            <h2 className="text-3xl sm:text-6xl font-medium text-white uppercase">
              Get Started in Minutes
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
              Install iconza and start building beautiful interfaces right away.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto px-4">
            <div className="space-y-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center mt-1">
                    <span className="text-blue-500 font-semibold text-sm">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* CTA button with delayed animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: steps.length * 0.1 }}
                className="pt-6"
              >
                <Link to="/icons">
                  <button className="group relative inline-flex h-12 overflow-hidden rounded-full p-px">
                    <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#84cc16_0%,#000000_50%,#84cc16_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                      <IconArrowRight
                        size={20}
                        className="mr-2 transform transition-transform duration-300 group-hover:translate-x-28"
                      />
                      <span className="transform transition-transform duration-300 group-hover:-translate-x-6">
                        Get Started Now
                      </span>
                    </span>
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right: Terminal with delayed slide up */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Terminal>
                <TypingAnimation delay={0}>
                  $ npm install iconza
                </TypingAnimation>
                <AnimatedSpan className="text-lime-500">
                  ✔ Installed successfully!
                </AnimatedSpan>
                <AnimatedSpan className="text-blue-500">
                  ℹ Updated 1 file:
                </AnimatedSpan>
                <AnimatedSpan className="text-blue-500 pl-2">
                  - package.json
                </AnimatedSpan>
                <TypingAnimation className="text-muted-foreground">
                  Project initialization completed.
                </TypingAnimation>
                <TypingAnimation className="text-muted-foreground">
                  You may now add components.
                </TypingAnimation>
              </Terminal>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
