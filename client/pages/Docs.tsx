import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CodeBlock } from "@/components/ui/code-block";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Highlighter } from "@/components/ui/highlighter";
import {
  IconArrowRight,
  IconRocket,
  IconCode,
  IconApi,
  IconHistory,
} from "@tabler/icons-react";
import { SEO } from "@/components/SEO";
import { VersionHistory } from "@/components/VersionHistory";
import { versionHistory } from "../../packages/iconza/src/versionHistory.ts";
import { useState } from "react";

export default function Docs() {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <div className="min-h-screen bg-transparent">
      <SEO
        title="Documentation"
        description="Browse and search through our extensive collection of modern, accessible icons with brand colors and animations."
      />
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-24 sm:pt-28 pb-16 sm:pb-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 sm:mb-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
              Developer Documentation
            </div>
            <div className="text-center mb-28">
              <h1 className="text-3xl sm:text-6xl font-medium text-white uppercase">
                Documentation & Guides
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed px-2">
                Master the clean SVG icon system for React + TypeScript with
                comprehensive guides and examples
              </p>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Tabs defaultValue="quickstart" className="w-full">
            <TabsList className="flex w-full rounded-lg bg-gray-900/50 p-1 border border-gray-800 backdrop-blur-sm">
              {[
                { value: "quickstart", icon: IconRocket, label: "Quick Start" },
                { value: "usage", icon: IconCode, label: "Usage" },
                { value: "api", icon: IconApi, label: "API" },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="flex-1 flex items-center justify-center gap-2 rounded-md py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium transition-all duration-200 
                 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg
                 data-[state=inactive]:text-gray-400 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-gray-800/50
                 min-w-0"
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate text-sm sm:text-base">{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Quickstart Tab */}
            <TabsContent
              value="quickstart"
              className="mt-6 sm:mt-8 space-y-6 sm:space-y-8"
            >
              <StepCard
                title="1. Installation"
                description="Add Iconza to your project dependencies"
                stepNumber={1}
              >
                <CodeBlock
                  language="bash"
                  filename="terminal"
                  code={`npm install iconza`}
                />
              </StepCard>

              <StepCard
                title="2. Import and Use"
                description="Start using icons in your components"
                stepNumber={2}
              >
                <CodeBlock
                  language="jsx"
                  filename="App.tsx"
                  code={`import { Icon } from "iconza";

export default function App() {
  return (
    <div className="flex items-center gap-4 p-6">
      <Icon name="AdobePhotoshop" size={24} />
      <Icon name="VSCode" size={48} className="text-primary" />
      <Icon name="Figma" size={32} className="opacity-80 hover:opacity-100 transition-opacity" />
    </div>
  );
}`}
                  highlightLines={[2, 6, 7]}
                />
              </StepCard>

              <StepCard
                title="3. Next Steps"
                description="Explore advanced usage patterns"
                stepNumber={3}
              >
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                  <div className="border border-gray-800 rounded-lg p-3 sm:p-4 hover:border-primary/30 transition-colors">
                    <h4 className="font-medium text-white text-base sm:text-lg mb-1 sm:mb-2">
                      Dark Mode Ready
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Icons that adapt to your theme automatically
                    </p>
                  </div>

                  <div className="border border-gray-800 rounded-lg p-3 sm:p-4 hover:border-primary/30 transition-colors">
                    <h4 className="font-medium text-white text-base sm:text-lg mb-1 sm:mb-2">
                      Customizable
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Full control over size, color, and styling
                    </p>
                  </div>
                </div>
              </StepCard>
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent
              value="usage"
              className="mt-6 sm:mt-8 space-y-4 sm:space-y-6"
            >
              <UsageCard
                title="Theme-Aware Icons"
                description="Perfect for both light and dark modes"
                badge="Recommended"
              >
                <CodeBlock
                  language="jsx"
                  filename="Example.tsx"
                  code={`<Icon name="GitHub Dark" size={32} className="dark:invert" />`}
                />
                <p className="text-xs sm:text-sm text-gray-400 mt-3">
                  Use{" "}
                  <Highlighter color="#primary">dark-themed icons</Highlighter>{" "}
                  with inversion for optimal visibility across themes
                </p>
              </UsageCard>

              <UsageCard
                title="Accessibility & Sizing"
                description="Make your icons accessible and properly sized"
              >
                <CodeBlock
                  language="jsx"
                  filename="Example.tsx"
                  code={`<Icon 
  name="AdobePhotoshop" 
  size={32} 
  aria-label="Adobe Photoshop Icon"
/>`}
                />
              </UsageCard>

              <UsageCard
                title="Interactive Icons"
                description="Add click handlers and hover effects"
              >
                <CodeBlock
                  language="jsx"
                  filename="Example.tsx"
                  code={`<Icon 
  name="VSCode" 
  onClick={() => console.log('Icon clicked!')}
  className="cursor-pointer hover:scale-110 transition-transform"
/>`}
                />
              </UsageCard>
            </TabsContent>

            {/* API Tab */}
            <TabsContent value="api" className="mt-6 sm:mt-8">
              <div className="border border-gray-800 rounded-lg p-4 sm:p-6 bg-gray-900/50">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2 mb-2">
                    <IconApi className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    createIcon(name, svgContent)
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base">
                    Create custom React components from SVG content with type
                    safety
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-4 sm:mb-6">
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base mb-2 sm:mb-3">
                      Props
                    </h4>
                    <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-asset rounded-full"></div>
                        <code>size?: number</code>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-asset rounded-full"></div>
                        <code>className?: string</code>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-asset rounded-full"></div>
                        <code>style?: React.CSSProperties</code>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-asset rounded-full"></div>
                        <code>aria-label?: string</code>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-3 sm:p-4 bg-black/30 rounded-lg border border-gray-800">
                  <p className="text-gray-300 text-xs sm:text-sm">
                    Returns a React component that renders SVG safely with{" "}
                    <code className="text-asset">
                      dangerouslySetInnerHTML
                    </code>{" "}
                    and full TypeScript support.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}

function StepCard({
  title,
  description,
  children,
  stepNumber,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  stepNumber: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
    >
      <div className="flex-shrink-0">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
          <span className="text-primary font-bold text-base sm:text-lg">
            {stepNumber}
          </span>
        </div>
      </div>
      <div className="flex-1 w-full">
        <div className="border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-primary/30 transition-all duration-300 bg-gray-900/50">
          <h3 className="font-bold text-white text-lg sm:text-xl mb-1 sm:mb-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
            {description}
          </p>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function UsageCard({
  title,
  description,
  children,
  badge,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  badge?: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="border border-gray-800 rounded-lg p-4 sm:p-6 hover:border-primary/30 transition-all duration-300 bg-gray-900/50">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div>
            <span className="text-white sm:text-lg flex items-center gap-2 flex-wrap">
              {title}
              {badge && (
                <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 sm:py-1 rounded-full text-xs">
                  {badge}
                </span>
              )}
            </span>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
