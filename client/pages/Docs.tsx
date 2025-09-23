import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CodeBlock } from "@/components/ui/code-block";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Highlighter } from "@/components/ui/highlighter";
import { IconArrowRight } from "@tabler/icons-react";

export default function Docs() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 pt-32 pb-20">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="max-w-7xl mx-auto px-4 text-center py-8">
            <h2 className="text-3xl sm:text-6xl font-medium text-gray-900 dark:text-white">
              Documentation
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Install, use, and extend a clean SVG icon system for React + TypeScript
            </p>
          </div>
        </motion.section>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Tabs defaultValue="quickstart" className="w-full">
            <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent p-0">
              {["quickstart", "usage", "api"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent capitalize font-medium px-6 py-3 data-[state=active]:border-black dark:data-[state=active]:border-white data-[state=active]:bg-transparent"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Quickstart Tab */}
            <TabsContent value="quickstart" className="mt-8">
              <div className="space-y-6">
                <StepCard title="Install">
                  <CodeBlock
                    language="bash"
                    filename="terminal"
                    code={`npm install iconza`}
                  />
                </StepCard>

                <StepCard title="Import and use">
                  <CodeBlock
                    language="jsx"
                    filename="App.tsx"
                    code={`import { Icon } from "iconza";

export default function App() {
  return (
    <div>
      <Icon name="Photoshop" size={24} />
      <Icon name="VSCode" size={48} className="ml-2" />
    </div>
);`}
                    highlightLines={[2, 5]}
                  />
                </StepCard>
              </div>
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent value="usage" className="mt-8">
              <div className="space-y-6">
                <Card title="Usage black or white icons with dark mode and light mode">
                  <CodeBlock
                    language="jsx"
                    filename="Example.tsx"
                    code={`<Icon name="GitHubDark" size={32} className="dark:invert" /> `}
                  />
                </Card>
                <p className="capitalize">recommanded to use <Highlighter action="underline" color="#FF9800">Dark Icon</Highlighter> good for dark mode and light mode for better visibility</p>

                <Card title="Sizing and accessibility">
                  <CodeBlock
                    language="jsx"
                    filename="Example.tsx"
                    code={`<Icon name="Photoshop" size={32} aria-label="Adobe Photoshop" />`}
                  />
                </Card>

                <Card title="Click handlers">
                  <CodeBlock
                    language="jsx"
                    filename="Example.tsx"
                    code={`<Icon name="VSCode" onClick={() => alert('clicked')} />`}
                  />
                </Card>

                <Card title="Custom styling">
                  <CodeBlock
                    language="jsx"
                    filename="Example.tsx"
                    code={`<Icon name="Figma" className="opacity-50 hover:opacity-100" />`}
                  />
                </Card>
              </div>
            </TabsContent>

            {/* API Tab */}
            <TabsContent value="api" className="mt-8">
              <Card title="createIcon(name, svgContent)">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Returns a React component that renders SVG safely with dangerouslySetInnerHTML.
                </p>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-500">
                  <div>Props: size?, className?, style?, aria-label?, onClick?</div>
                  <div>Keyboard: Enter/Space triggers onClick</div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/">
            <button className="group relative inline-flex h-12 overflow-hidden rounded-full p-0.5">
              <div className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#94c748_0%,#393BB2_50%,#94c748_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                <span className="transform transition-transform duration-300 group-hover:translate-x-6">
                  Back to Home Page
                </span>
                <IconArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:-translate-x-32" />
              </span>
            </button>
          </Link>
        </motion.div>
      </main>
      <SiteFooter />
    </div>
  );
}

function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="border border-gray-100 dark:border-gray-900 rounded-lg p-6 hover:border-gray-200 dark:hover:border-gray-800 transition-colors"
    >
      <h3 className="font-medium text-black dark:text-white mb-4">{title}</h3>
      {children}
    </motion.div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-gray-100 dark:border-gray-900 rounded-lg p-6"
    >
      <h3 className="font-medium text-black dark:text-white mb-3">{title}</h3>
      {children}
    </motion.div>
  );
}
