import { useEffect, useMemo, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IconSearch, IconChevronDown, IconLayoutGrid, IconListDetails, IconSquareRoundedCheckFilled, IconSlash } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { CodeBlock } from '@/components/ui/code-block';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Categories } from '../../packages/iconza/src';
import { IconGrid } from '../components/site/IconExplorer/IconGrid';
import { categories, iconsMap } from '../components/site/IconExplorer/iconUtils';
import { SiteHeader } from '../components/site/SiteHeader';
import { SiteFooter } from '../components/site/SiteFooter';
import { SEO } from '@/components/SEO';

const featureList = [
  'Tree-shakable imports',
  'TypeScript support',
  'Optimized for performance',
  'Dark mode ready',
  'Multiple styles (outline, solid, etc.)',
];

export function IconExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [size] = useState(40);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [tab, setTab] = useState(() => {
    const urlTab = searchParams.get('category');
    const savedTab = localStorage.getItem('selectedCategory');
    return urlTab || savedTab || 'All';
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('selectedCategory', tab);
    setSearchParams({ category: tab }, { replace: true });
  }, [tab, setSearchParams]);

  const allData = useMemo(() => Object.values(Categories).flat(), []);

  const filtered = useMemo(() => {
    return allData.filter((i) => {
      const inCat = tab === 'All' || i.category === tab;
      const q = query.trim().toLowerCase();
      const text = `${i.name} ${i.category} ${i.keywords.join(' ')}`.toLowerCase();
      return inCat && (q.length === 0 || text.includes(q));
    });
  }, [allData, query, tab]);
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className='min-h-screen'>
      <SEO
        title='Icon Explorer'
        description='Browse and search through our extensive collection of modern, accessible icons with brand colors and animations.'
      />
      <SiteHeader />
      <main className='pt-24'>
        <div className='mx-auto max-w-7xl px-4 py-12'>
          <div className='mt-12 rounded-2xl border border-gray-700 bg-gray-900/50 p-8 shadow-lg backdrop-blur-sm'>
            <h1 className='mb-10 text-center text-3xl font-medium uppercase text-primary sm:text-6xl'>
              Quick Start: <span className='text-white'>Browse and Customize Icons</span>
            </h1>
            <div className='grid items-center gap-8 md:grid-cols-2'>
              <ul className='text-smtext-gray-400 space-y-4'>
                {featureList.map((feature) => (
                  <li key={feature} className='flex items-center'>
                    <IconSquareRoundedCheckFilled className='mr-2 inline h-5 w-5 text-asset' />
                    <span className='font-medium'>{feature}</span>
                  </li>
                ))}
              </ul>

              <CodeBlock
                language='jsx'
                filename='App.tsx'
                code={`// Install
npm install iconza

// Import & Use
import { Icon } from 'iconza'
<Icon name="React" size={24} />`}
                highlightLines={[2, 5]}
              />
            </div>
          </div>
        </div>

        {/* Icon Explorer */}
        <section className='mx-auto max-w-7xl px-4 py-12'>
          <div className='mb-28 text-center'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary sm:mb-6 sm:px-4 sm:text-sm'>
              <div className='h-1.5 w-1.5 rounded-full bg-primary'></div>
              Icon Explorer
            </div>
            <h2 className='text-3xl font-medium uppercase text-white sm:text-6xl'>Browse Icons</h2>
            <p className='text-lg text-gray-300'>Use filters to find exactly what you need.</p>
          </div>

          {/* Filters */}
          <div className='mb-6 flex flex-col items-center justify-between gap-4 sm:flex-row'>
            <div className='relative max-w-md flex-1'>
              <IconSearch size={20} className='absolute left-5 top-1/2 -translate-y-1/2 text-gray-400' />
              <Input
                ref={searchInputRef}
                placeholder='Search icons...'
                className='pr-16bg-gray-900/50 pl-12 capitalize'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd className='pointer-events-none absolute right-3 top-1/2 hidden h-8 w-8 -translate-y-1/2 select-none items-center justify-center rounded-xl bg-white/10 text-sm font-medium text-secondary shadow-lg shadow-primary/10 backdrop-blur-md sm:flex'>
                <IconSlash size={16} />
              </kbd>
            </div>
          </div>

          <div className='mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='flex items-center gap-1 rounded-2xl border border-gray-700/50 bg-gray-900/80 p-1 shadow-2xl backdrop-blur-xl'>
              {[
                { mode: 'grid', icon: IconLayoutGrid },
                { mode: 'list', icon: IconListDetails },
              ].map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as 'grid' | 'list')}
                  className={cn(
                    'group relative overflow-hidden rounded-xl border p-2 transition-all duration-500',
                    viewMode === mode
                      ? 'border-primary/50 bg-primary/10 text-primary shadow-lg shadow-primary/20'
                      : 'border-transparent text-gray-400 hover:border-gray-600/50 hover:text-gray-200'
                  )}
                  title={`Switch to ${mode} view`}
                >
                  {viewMode === mode && <div className='absolute inset-0 animate-pulse rounded-xl bg-primary/10' />}
                  <Icon size={20} className='relative z-10' />
                  <div className='absolute inset-0 -skew-x-12 transform bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                </button>
              ))}
            </div>
            <DropdownMenu open={dropdownOpen} onOpenChange={(open) => setDropdownOpen(open)}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    'group inline-flex items-center rounded-full px-4 py-3 text-sm font-medium',
                    'border border-zinc-700 bg-zinc-800/40 backdrop-blur'
                  )}
                >
                  {iconsMap[tab]}
                  {tab === 'DesignTools' ? 'Design' : tab}
                  <IconChevronDown
                    className={cn('ml-2 h-4 w-4 transition-transform duration-300', dropdownOpen ? 'rotate-180' : 'rotate-0')}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mt-2 w-52 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-1 shadow-xl backdrop-blur'>
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onSelect={() => {
                      setTab(category);
                      setDropdownOpen(false);
                    }}
                    className={cn(
                      'flex cursor-pointer items-center gap-2 rounded-xl px-5 py-2 text-sm transition-colors',
                      tab === category
                        ? 'border border-primary/20 bg-primary/10 text-primary'
                        : 'my-1 text-zinc-200 hover:bg-zinc-50/10 hover:text-white'
                    )}
                  >
                    <div className={cn('transition-colors', tab === category ? 'text-primary' : 'text-zinc-400')}>{iconsMap[category]}</div>
                    <span>{category === 'DesignTools' ? 'Design' : category}</span>
                    <span className='ml-auto text-primary'>
                      {category === 'All' ? Object.values(Categories).flat().length : (Categories[category] || []).length}
                    </span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Results */}
          <p className='mb-4 max-w-lg truncate text-sm text-gray-400'>
            <span className='mr-3 text-2xl font-medium tracking-tighter text-primary'>{filtered.length}</span>icon
            {filtered.length !== 1 ? 's' : ''}
            {query && ` matching "${query}"`}
            {tab !== 'All' && ` in ${tab}`}
          </p>

          <Tabs value={tab} onValueChange={setTab}>
            {categories.map((c) => (
              <TabsContent key={c} value={c}>
                <IconGrid category={c} size={size} query={query} data={filtered} viewMode={viewMode} />
              </TabsContent>
            ))}
          </Tabs>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
