import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { IconSearch, IconChevronDown, IconLayoutGrid, IconListDetails, IconSquareRoundedCheckFilled, IconSlash } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
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
  const [size] = useState(40);
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
          <div className="mt-12 bg-gray-900/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm shadow-lg">
            <h2 className="text-3xl sm:text-6xl font-medium text-center text-white mb-10 uppercase">Quick Start</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ul className="space-y-4 text-smtext-gray-400">
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
            <div className="inline-flex items-center gap-2 bg-lime-500/10 text-lime-400 border border-lime-500/20 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-lime-500"></div>
              Icon Explorer
            </div>
            <h2 className="text-3xl sm:text-6xl font-medium text-white uppercase">
              Browse Icons
            </h2>
            <p className="text-lg text-gray-300">Use filters to find exactly what you need.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <IconSearch size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                ref={searchInputRef}
                placeholder="Search icons..."
                className="pl-12 pr-16bg-gray-900/50 capitalize"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <kbd
                className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex h-7 w-7 items-center justify-center rounded-full bg-lime-400/20 text-lime-100 text-base pointer-events-none select-none shadow-sm"
              >
                <IconSlash size={18} />
              </kbd>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-4">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
              {[{ mode: "grid", icon: IconLayoutGrid }, { mode: "list", icon: IconListDetails }].map(({ mode, icon: Icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as "grid" | "list")}
                  className={cn(
                    "p-2 rounded-xl transition-all duration-500 relative overflow-hidden group border",
                    viewMode === mode
                      ? "border-lime-400/50 bg-lime-400/10 text-lime-400 shadow-lg shadow-lime-400/20"
                      : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600/50"
                  )}
                  title={`Switch to ${mode} view`}
                >
                  {viewMode === mode && (
                    <div className="absolute inset-0 bg-lime-400/10 rounded-xl animate-pulse" />
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 transform" />
                </button>
              ))}
            </div>
            <DropdownMenu open={dropdownOpen} onOpenChange={(open) => setDropdownOpen(open)}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "group inline-flex items-center rounded-full px-4 py-3 text-sm font-medium",
                    "bg-zinc-800/40 backdrop-blur border border-zinc-700",
                  )}
                >
                  {iconsMap[tab]}
                  {tab === "DesignTools" ? "Design" : tab}
                  <IconChevronDown
                    className={cn(
                      "ml-2 h-4 w-4 transition-transform duration-300",
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    )}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-1 mt-2 rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur shadow-xl">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onSelect={() => {
                      setTab(category);
                      setDropdownOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-5 py-2 cursor-pointer text-sm transition-colors",
                      tab === category
                        ? "bg-lime-500/10 text-lime-400 border border-lime-500/20"
                        : "text-zinc-200 my-1 hover:text-white hover:bg-zinc-50/10"
                    )}
                  >
                    <div className={cn(
                      "transition-colors",
                      tab === category ? "text-lime-400" : "text-zinc-400"
                    )}>
                      {iconsMap[category]}
                    </div>
                    <span>{category === "DesignTools" ? "Design" : category}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Results */}
          <p className="text-sm text-gray-400 mb-4 truncate max-w-lg">
            <span className="text-2xl font-medium tracking-tighter text-lime-500 mr-3">{filtered.length}</span>icon{filtered.length !== 1 ? "s" : ""}
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
