import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CodeBlock } from '@/components/ui/code-block';
import { SEO } from '@/components/SEO';
import { icons } from '../../packages/iconza/src/index.ts';
import pkg from '../../packages/iconza/package.json';
import { FlipWords } from '../components/ui/flip-words.tsx';
import { SiteHeader } from '../components/site/SiteHeader.tsx';
import { SiteFooter } from '../components/site/SiteFooter.tsx';
import { HeroBackground } from '../components/ui/shap-loading-hero.tsx';
import { categories } from '../components/site/IconExplorer/iconUtils.tsx';
import { Terminal, TypingAnimation, AnimatedSpan } from '../components/ui/terminal.tsx';
import { NumberTicker } from '../components/ui/number-ticker.tsx';
import { useState, useEffect } from 'react';
import LogoLoop from '@/components/ui/LogoLoop.tsx';
import { Button } from '@/components/ui/button.tsx';
import { IconArrowLeft, IconChevronRight, IconPackage } from '@tabler/icons-react';
import { features, heroList, loopIcon, steps, words } from '@/data/homeData.tsx';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export function HomeHero() {
  const [totalDownloads, setTotalDownloads] = useState<number>(0);

  useEffect(() => {
    async function fetchTotal() {
      try {
        const startDate = '2024-01-01';
        const endDate = new Date().toISOString().split('T')[0];
        const response = await fetch(`https://api.npmjs.org/downloads/point/${startDate}:${endDate}/iconza`);
        const data: { downloads?: number } = await response.json();
        setTotalDownloads(data.downloads ?? 0);
      } catch (err) {
        console.error('Error fetching total downloads:', err);
        setTotalDownloads(0);
      }
    }
    fetchTotal();

    const interval = setInterval(fetchTotal, 3600000);
    return () => clearInterval(interval);
  }, []);

  const stats: Stat[] = [
    { value: Object.keys(icons).length, label: 'Total Icons' },
    { value: 100, suffix: '%', label: 'Open Source' },
    { value: categories.length - 1, label: 'Categories' },
    { value: totalDownloads, label: 'Total Downloads' },
  ];

  return (
    <div className='to-muted/40 min-h-screen bg-gradient-to-b from-background'>
      <SEO
        title='Iconza - Free React Icon Library'
        description='Animated, accessible, and developer-first icon set built for React, Tailwind, and Vite.'
      />
      <SiteHeader />
      <main>
        <section className='relative min-h-screen overflow-hidden pt-24'>
          <HeroBackground className='pointer-events-none absolute inset-0 z-0 h-full w-full' />
          <div className='relative z-10 mx-auto mb-20 grid max-w-7xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20'>
            <div>
              <div className='mb-6 flex w-fit items-center gap-1 rounded-full border border-secondary/50 bg-primary/10 px-3 py-2 text-sm font-medium text-secondary'>
                <IconPackage size={20} stroke={1.5} />v{pkg.version}
              </div>
              <h1 className='text-balance text-5xl font-semibold md:text-7xl'>
                Every icon you need.
                <FlipWords words={words} className='font-normal text-primary' />
              </h1>

              <p className='text-muted-foreground mb-8 mt-4 max-w-prose text-xl'>
                A modern, accessible icon set with original brand colors, full TypeScript support, and delightful animations.
              </p>
              <div className='space-y-6'>
                <CodeBlock
                  tabs={[
                    { name: 'Yarn', code: 'yarn add iconza', language: 'bash' },
                    { name: 'NPM', code: 'npm install iconza', language: 'bash' },
                    { name: 'PNPM', code: 'pnpm add iconza', language: 'bash' },
                  ]}
                />

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className='flex flex-col gap-4 sm:flex-row'
                >
                  <Link to='/icons'>
                    <Button variant='on-hold' className='group flex items-center gap-2'>
                      Explore Icons
                      <IconArrowLeft className='transition-transform duration-300 group-hover:rotate-180' />
                    </Button>
                  </Link>
                  <Link to='/docs'>
                    <Button variant='design-review' className='group flex items-center gap-2'>
                      View Docs
                      <span className='relative flex items-center'>
                        <IconChevronRight className='absolute left-2 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100' />
                        <IconChevronRight className='transition-transform duration-300 group-hover:translate-x-1' />
                      </span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className='grid grid-cols-3 gap-4'>
              {heroList.map((name, index) => {
                const Comp = icons[name];
                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className='flex items-center justify-center rounded-3xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm'
                  >
                    <Comp size={48} aria-label={name} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <LogoLoop
            logos={loopIcon.map((name) => ({
              component: icons[name],
              name: name,
            }))}
            speed={70}
            direction='left'
            logoHeight={50}
            gap={40}
            fadeOut
            fadeOutColor='#0f172a'
            ariaLabel='Technology partners'
          />
        </section>

        {/* Features Section */}
        <section className='bg-gray-950/50 py-24'>
          <div className='mx-auto mb-16 max-w-7xl px-4 text-center'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary sm:mb-6 sm:px-4 sm:text-sm'>
              <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
              Overview
            </div>
            <h2 className='text-3xl font-medium uppercase text-white sm:text-6xl'>Why Choose iconza?</h2>
            <p className='mx-auto mt-4 max-w-2xl text-lg text-gray-300'>
              Built by developers, for developers. Every icon is crafted with attention to detail and optimized for modern web applications.
            </p>
          </div>

          {/* Features */}
          <div className='mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3'>
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className='rounded-3xl border border-gray-700 bg-gray-900/50 p-8 text-center shadow-lg'
              >
                <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 p-3'>
                  <Icon size='30' stroke={1.5} className='text-primary' />
                </div>
                <h3 className='mb-4 text-xl font-semibold text-white'>{title}</h3>
                <p className='text-gray-400'>{description}</p>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className='mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 text-center md:grid-cols-4'>
            {stats.map(({ value, label, suffix }) => (
              <div key={label}>
                <NumberTicker value={value} suffix={suffix} className='text-7xl font-semibold tracking-tighter text-primary' />
                <div className='text-sm text-gray-400'>{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Getting Started Section */}
        <section className='py-24'>
          {/* Heading with motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className='mx-auto mb-16 max-w-7xl px-4 text-center'
          >
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary sm:mb-6 sm:px-4 sm:text-sm'>
              <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
              Quick Start
            </div>
            <h2 className='text-3xl font-medium uppercase text-white sm:text-6xl'>Get Started in Minutes</h2>
            <p className='mx-auto mt-4 max-w-2xl text-lg text-gray-300'>
              Install iconza and start building beautiful interfaces right away.
            </p>
          </motion.div>

          <div className='mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2'>
            <div className='space-y-6'>
              {steps.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className='flex items-start gap-4'
                >
                  <div className='mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10'>
                    <span className='text-sm font-semibold text-blue-500'>{i + 1}</span>
                  </div>
                  <div>
                    <h3 className='mb-2 font-semibold text-white'>{step.title}</h3>
                    <p className='text-gray-400'>{step.description}</p>
                  </div>
                </motion.div>
              ))}

              {/* CTA button with delayed animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: steps.length * 0.1 }}
                className='pt-6'
              >
                <Link to='/icons'>
                  <Button variant='on-hold' className='group flex items-center gap-2'>
                    Get Started
                    <IconArrowLeft className='transition-transform duration-300 group-hover:rotate-180' />
                  </Button>
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
                <TypingAnimation delay={0}>$ npm install iconza</TypingAnimation>
                <AnimatedSpan className='text-primary'>✔ Installed successfully!</AnimatedSpan>
                <AnimatedSpan className='text-blue-500'>ℹ Updated 1 file:</AnimatedSpan>
                <AnimatedSpan className='pl-2 text-blue-500'>- package.json</AnimatedSpan>
                <TypingAnimation className='text-muted-foreground'>Project initialization completed.</TypingAnimation>
                <TypingAnimation className='text-muted-foreground'>You may now add components.</TypingAnimation>
              </Terminal>
            </motion.div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
