import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { IconSearch, IconChevronDown, IconLayoutGrid, IconListDetails, IconRestore, IconSquareRoundedCheckFilled, IconSlash } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Box from "@mui/material/Box";
import { cn } from "@/lib/utils";
import Slider from "@mui/material/Slider";
import { CodeBlock } from "@/components/ui/code-block";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Categories } from "../../packages/iconza/src";
import { IconGrid } from "../components/site/IconExplorer/IconGrid";
import { categories, iconsMap } from "../components/site/IconExplorer/iconUtils";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { SEO } from "@/components/SEO";

const featureList = [
  "Tree-shakable imports",
  "TypeScript support",
  "Optimized for performance",
  "Dark mode ready",
  "Multiple styles (outline, solid, etc.)",
];



export function IconExplorer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(40);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [tab, setTab] = useState(() => {
    const urlTab = searchParams.get("category");
    const savedTab = localStorage.getItem("selectedCategory");
    return urlTab || savedTab || "All";
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("selectedCategory", tab);
    setSearchParams({ category: tab }, { replace: true });
  }, [tab, setSearchParams]);

  const allData = useMemo(
    () => Object.values(Categories).flat(),
    []
  );

  const filtered = useMemo(() => {
    return allData.filter((i) => {
      const inCat = tab === "All" || i.category === tab;
      const q = query.trim().toLowerCase();
      const text = `${i.name} ${i.category} ${i.keywords.join(" ")}`.toLowerCase();
      return inCat && (q.length === 0 || text.includes(q));
    });
  }, [allData, query, tab]);
  // Add keyboard shortcut handler
  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen">
      <SEO title="Icon Explorer" description="Browse and search through our extensive collection of modern, accessible icons with brand colors and animations." />
      <SiteHeader />
      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mt-12 bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-sm shadow-lg">
            <h2 className="text-3xl sm:text-6xl font-medium text-center text-gray-900 dark:text-white mb-10">Quick Start</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {featureList.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <IconSquareRoundedCheckFilled className="inline w-5 h-5 mr-2 text-lime-500" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <CodeBlock
                language="jsx"
                filename="App.tsx"
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
        <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="text-center mb-28">
            <h2 className="text-3xl sm:text-6xl font-medium text-gray-900 dark:text-white">
              Browse Icons
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Use filters to find exactly what you need.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <IconSearch size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                ref={searchInputRef}
                placeholder="Search icons..."
                className="pl-12 pr-16 bg-white/50 dark:bg-gray-900/50 capitalize"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd
                className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex h-7 w-7 items-center justify-center rounded-full bg-lime-500/20 text-lime-700 dark:bg-lime-400/20 dark:text-lime-100 text-base pointer-events-none select-none shadow-sm"
              >
                <IconSlash size={18} />
              </kbd>
            </div>

          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-4">
            <div className="flex items-center gap-2">
              {[{ mode: "grid", icon: IconLayoutGrid }, { mode: "list", icon: IconListDetails }].map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as "grid" | "list")}
                  className={cn("p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700", viewMode === mode ? "bg-gray-300 dark:bg-gray-700" : "bg-transparent")}
                  title={`Switch to ${mode} view`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
            <DropdownMenu open={dropdownOpen} onOpenChange={(open) => setDropdownOpen(open)}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "group inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    "bg-zinc-900/10 dark:bg-zinc-800/40 backdrop-blur border border-white/30 dark:border-zinc-700",
                  )}
                >
                  {tab === "DesignTools" ? "Design" : tab}
                  <IconChevronDown
                    className={cn(
                      "ml-2 h-4 w-4 transition-transform duration-300",
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-1 mt-2 rounded-2xl border border-white/10 dark:border-zinc-800 bg-zinc-500/10 dark:bg-zinc-900/50 backdrop-blur shadow-xl">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onSelect={() => {
                      setTab(category);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 rounded-xl px-5 py-2 cursor-pointer text-sm text-zinc-800 dark:text-zinc-200 hover:text-white hover:bg-zinc-900/50 dark:hover:bg-zinc-50/10 transition-colors"
                  >
                    {iconsMap[category]}
                    <span>{category === "DesignTools" ? "Design" : category}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Results */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
            {query && ` matching "${query}"`}
            {tab !== "All" && ` in ${tab}`}
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
