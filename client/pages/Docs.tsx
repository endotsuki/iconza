import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';
import { CodeBlock } from '@/components/ui/code-block';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Highlighter } from '@/components/ui/highlighter';
import { IconArrowRight, IconRocket, IconCode, IconApi, IconHistory } from '@tabler/icons-react';
import { SEO } from '@/components/SEO';
import { VersionHistory } from '@/components/VersionHistory';
import { versionHistory } from '../../packages/iconza/src/versionHistory.ts';
import { useState } from 'react';

export default function Docs() {
  const [showHistory, setShowHistory] = useState(false);
  return (
    <div className='min-h-screen bg-transparent'>
      <SEO
        title='Documentation'
        description='Browse and search through our extensive collection of modern, accessible icons with brand colors and animations.'
      />
      <SiteHeader />

      <main className='mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28'>
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-16 text-center sm:mb-20'
        >
          <div className='mx-auto max-w-4xl'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary sm:mb-6 sm:px-4 sm:text-sm'>
              <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
              Developer Documentation
            </div>
            <div className='mb-28 text-center'>
              <h1 className='text-3xl font-medium uppercase text-white sm:text-6xl'>Documentation & Guides</h1>
              <p className='mx-auto max-w-2xl px-2 text-lg leading-relaxed text-gray-300'>
                Master the clean SVG icon system for React + TypeScript with comprehensive guides and examples
              </p>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
          <Tabs defaultValue='quickstart' className='w-full'>
            <TabsList className='flex w-full rounded-lg border border-gray-800 bg-gray-900/50 p-1 backdrop-blur-sm'>
              {[
                { value: 'quickstart', icon: IconRocket, label: 'Quick Start' },
                { value: 'usage', icon: IconCode, label: 'Usage' },
                { value: 'api', icon: IconApi, label: 'API' },
              ].map(({ value, icon: Icon, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className='flex min-w-0 flex-1 items-center justify-center gap-2 rounded-md px-2 py-2 text-xs font-medium transition-all duration-200 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:text-gray-400 data-[state=active]:shadow-lg data-[state=inactive]:hover:bg-gray-800/50 data-[state=inactive]:hover:text-white sm:px-4 sm:py-3 sm:text-sm'
                >
                  <Icon className='h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5' />
                  <span className='truncate text-sm sm:text-base'>{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Quickstart Tab */}
            <TabsContent value='quickstart' className='mt-6 space-y-6 sm:mt-8 sm:space-y-8'>
              <StepCard title='1. Installation' description='Add Iconza to your project dependencies' stepNumber={1}>
                {/* <CodeBlock language='bash' filename='terminal' code={`npm install iconza`} /> */}
                <CodeBlock
                  tabs={[
                    { name: 'Yarn', code: 'yarn add iconza', language: 'bash' },
                    { name: 'NPM', code: 'npm install iconza', language: 'bash' },
                    { name: 'PNPM', code: 'pnpm add iconza', language: 'bash' },
                  ]}
                />
              </StepCard>

              <StepCard title='2. Import and Use' description='Start using icons in your components' stepNumber={2}>
                <CodeBlock
                  language='jsx'
                  filename='App.tsx'
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

              <StepCard title='3. Next Steps' description='Explore advanced usage patterns' stepNumber={3}>
                <div className='mt-4 grid gap-3 sm:grid-cols-2 sm:gap-4'>
                  <div className='rounded-lg border border-gray-800 p-3 transition-colors hover:border-primary/30 sm:p-4'>
                    <h4 className='mb-1 text-base font-medium text-white sm:mb-2 sm:text-lg'>Dark Mode Ready</h4>
                    <p className='text-xs text-gray-400 sm:text-sm'>Icons that adapt to your theme automatically</p>
                  </div>

                  <div className='rounded-lg border border-gray-800 p-3 transition-colors hover:border-primary/30 sm:p-4'>
                    <h4 className='mb-1 text-base font-medium text-white sm:mb-2 sm:text-lg'>Customizable</h4>
                    <p className='text-xs text-gray-400 sm:text-sm'>Full control over size, color, and styling</p>
                  </div>
                </div>
              </StepCard>
            </TabsContent>

            {/* Usage Tab */}
            <TabsContent value='usage' className='mt-6 space-y-4 sm:mt-8 sm:space-y-6'>
              <UsageCard title='Theme-Aware Icons' description='Perfect for both light and dark modes' badge='Recommended'>
                <CodeBlock language='jsx' filename='Example.tsx' code={`<Icon name="GitHub Dark" size={32} className="dark:invert" />`} />
                <p className='mt-3 text-xs text-gray-400 sm:text-sm'>
                  Use <Highlighter color='#primary'>dark-themed icons</Highlighter> with inversion for optimal visibility across themes
                </p>
              </UsageCard>

              <UsageCard title='Accessibility & Sizing' description='Make your icons accessible and properly sized'>
                <CodeBlock
                  language='jsx'
                  filename='Example.tsx'
                  code={`<Icon 
  name="AdobePhotoshop" 
  size={32} 
  aria-label="Adobe Photoshop Icon"
/>`}
                />
              </UsageCard>

              <UsageCard title='Interactive Icons' description='Add click handlers and hover effects'>
                <CodeBlock
                  language='jsx'
                  filename='Example.tsx'
                  code={`<Icon 
  name="VSCode" 
  onClick={() => console.log('Icon clicked!')}
  className="cursor-pointer hover:scale-110 transition-transform"
/>`}
                />
              </UsageCard>
            </TabsContent>

            {/* API Tab */}
            <TabsContent value='api' className='mt-6 sm:mt-8'>
              <div className='rounded-lg border border-gray-800 bg-gray-900/50 p-4 sm:p-6'>
                <div className='mb-4 sm:mb-6'>
                  <h3 className='mb-2 flex items-center gap-2 text-xl font-bold text-white sm:text-2xl'>
                    <IconApi className='h-5 w-5 text-primary sm:h-6 sm:w-6' />
                    createIcon(name, svgContent)
                  </h3>
                  <p className='text-sm text-gray-400 sm:text-base'>Create custom React components from SVG content with type safety</p>
                </div>

                <div className='mb-4 grid gap-6 sm:mb-6 sm:gap-8 md:grid-cols-2'>
                  <div>
                    <h4 className='mb-2 text-sm font-semibold text-white sm:mb-3 sm:text-base'>Props</h4>
                    <ul className='space-y-1 text-xs text-gray-400 sm:space-y-2 sm:text-sm'>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-asset sm:h-2 sm:w-2'></div>
                        <code>size?: number</code>
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-asset sm:h-2 sm:w-2'></div>
                        <code>className?: string</code>
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-asset sm:h-2 sm:w-2'></div>
                        <code>style?: React.CSSProperties</code>
                      </li>
                      <li className='flex items-center gap-2'>
                        <div className='h-1.5 w-1.5 rounded-full bg-asset sm:h-2 sm:w-2'></div>
                        <code>aria-label?: string</code>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className='rounded-lg border border-gray-800 bg-black/30 p-3 sm:p-4'>
                  <p className='text-xs text-gray-300 sm:text-sm'>
                    Returns a React component that renders SVG safely with <code className='text-asset'>dangerouslySetInnerHTML</code> and
                    full TypeScript support.
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
      className='flex flex-col items-start gap-4 sm:flex-row sm:gap-6'
    >
      <div className='flex-shrink-0'>
        <div className='flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/20 sm:h-10 sm:w-10'>
          <span className='text-base font-bold text-primary sm:text-lg'>{stepNumber}</span>
        </div>
      </div>
      <div className='w-full flex-1'>
        <div className='rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-all duration-300 hover:border-primary/30 sm:p-6'>
          <h3 className='mb-1 text-lg font-bold text-white sm:mb-2 sm:text-xl'>{title}</h3>
          <p className='mb-3 text-sm text-gray-400 sm:mb-4 sm:text-base'>{description}</p>
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
      <div className='rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition-all duration-300 hover:border-primary/30 sm:p-6'>
        <div className='mb-3 flex items-start justify-between sm:mb-4'>
          <div>
            <span className='flex flex-wrap items-center gap-2 text-white sm:text-lg'>
              {title}
              {badge && (
                <span className='rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs text-primary sm:py-1'>
                  {badge}
                </span>
              )}
            </span>
            <p className='mt-1 text-sm text-gray-400'>{description}</p>
          </div>
        </div>
        {children}
      </div>
    </motion.div>
  );
}
