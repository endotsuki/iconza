import * as React from 'react';
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { IconDownload, IconCopy, IconChecks, IconRestore } from '@tabler/icons-react';
import { toast } from "sonner";
import { motion } from "framer-motion";
import { copyText } from "@/lib/copy";
import { CodeBlock } from "@/components/ui/code-block";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { cn } from "@/lib/utils";
import { DialogDescription } from "@/components/ui/dialog";


export interface IconDetailProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  name: string;
  Component: React.ComponentType<{ size?: number; className?: string; "aria-label"?: string }>;
  svgContent: string;
  category: string;
  keywords: string[];
}

export function IconDetailDialog(props: IconDetailProps) {
  const { open, onOpenChange, name, Component, svgContent, category, keywords } = props;
  const [mode, setMode] = useState<"jsx" | "svg">("jsx");
  const [size, setSize] = useState(48);
  const [copied, setCopied] = useState(false);

  const jsxCode = `<Icon name="${name}" size={${size}} />`;
  const svgMin = useMemo(() => svgContent.trim(), [svgContent]);

  const downloadSvg = () => {
    try {
      const blob = new Blob([svgMin], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name}.svg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success("SVG downloaded");
    } catch (e) {
      toast.error("Download failed");
    }
  };

  const handleCopy = async () => {
    const code = mode === "jsx" ? jsxCode : svgMin;
    try {
      await copyText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Component usage copied to clipboard");
    } catch (e) {
      toast.error("Copy failed");
    }
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="rounded-2xl max-w-4xl w-[95vw] px-5 py-10 max-h-[90vh] overflow-hidden bg-white/40 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Component size={30} />
                </div>
                <div className="flex text-left flex-col">
                  <span className="text-xl font-medium">{name}</span>
                  <p className="text-base font-medium text-gray-500 dark:text-gray-400">
                    {keywords.slice(0, 3).join(", ")}
                  </p>
                </div>
              </div>
              <DialogDescription className="flex gap-2 text-sm font-medium">
                <span className="px-2 py-1 bg-gray-100/60 dark:bg-gray-800 rounded-lg">
                  {category}
                </span>
              </DialogDescription>
            </DialogTitle>
          </DialogHeader>

          {/* Content */}
          <div className="grid lg:grid-cols-5 gap-6 py-6">
            {/* Preview */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Size</span>
                  <span className="text-sm text-gray-500">{size}px</span>
                </div>
                <div className="flex items-center gap-3">
                  <Box
                    sx={{
                      width: 300,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Slider
                      defaultValue={50}
                      aria-label="Default"
                      id="size"
                      min={16}
                      max={100}
                      value={size}
                      onChange={(_, value) => setSize(typeof value === "number" ? value : value[0])}
                      valueLabelDisplay="off"
                      sx={{
                        "& .MuiSlider-thumb": {
                          marginTop: 0,
                        },
                        "& .MuiSlider-track": {
                          marginTop: 0,
                        },
                      }}
                    />
                  </Box>
                  <button
                    type="button"
                    onClick={() => setSize(48)}
                    title="Reset size"
                    className="group p-2 rounded-lg bg-lime-500/10 dark:bg-lime-500/10 backdrop-blur-md shadow-md text-white border border-lime-500/30 hover:shadow-lg transition-colors duration-300"
                  >
                    <IconRestore
                      size={20}
                      className="rotate-180 transition-transform duration-300 group-hover:rotate-0"
                    />
                  </button>

                </div>
              </div>

              <div className="flex items-center justify-center h-40 bg-gray-50 dark:bg-gray-900 rounded-2xl border relative overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
                  )}
                />
                <div className="inline-flex items-center justify-center rounded-xl p-4 backdrop-blur-lg bg-black/5 dark:bg-white/5 border border-white/30 dark:border-white/10 shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_2px_6px_rgba(255,255,255,0.08)] relative z-10">
                  <Component size={size} />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full border bg-white/20 dark:bg-gray-900/30 border-white/30 dark:border-gray-700/50 text-zinc-800 dark:text-zinc-200 backdrop-blur-md shadow-sm transition hover:bg-white/30 dark:hover:bg-gray-900/60 hover:shadow-md focus-visible:outline-none px-4 py-2 font-semibold text-sm"
                >
                  {copied ? <IconChecks size={15} /> : <IconCopy size={15} />}
                  Copy
                </button>
                <button
                  onClick={downloadSvg}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full border bg-white/20 dark:bg-gray-900/30 border-white/30 dark:border-gray-700/50 text-zinc-800 dark:text-zinc-200 backdrop-blur-md shadow-sm transition hover:bg-white/30 dark:hover:bg-gray-900/60 hover:shadow-md focus-visible:outline-none px-4 py-2 font-semibold text-sm"
                >
                  <IconDownload size={16} />
                  Download
                </button>
              </div>
            </div>

            {/* Code */}
            <div className="lg:col-span-3 min-w-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-medium">Code</span>
                <ToggleGroup
                  type="single"
                  value={mode}
                  onValueChange={(v) => v && setMode(v as any)}
                  className="flex gap-2 bg-transparent">
                  <ToggleGroupItem
                    value="jsx"
                    size="sm"
                    className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 data-[state=on]:bg-zinc-100 dark:data-[state=on]:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    JSX
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="svg"
                    size="sm"
                    className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 data-[state=on]:bg-zinc-100 dark:data-[state=on]:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                    SVG
                  </ToggleGroupItem>
                </ToggleGroup>

              </div>

              <CodeBlock
                language={mode === "jsx" ? "tsx" : "xml"}
                filename={`${name}.${mode}`}
                code={mode === "jsx" ?
                  `import { Icon } from "iconza";\n\n${jsxCode}` :
                  svgMin
                }
                highlightLines={mode === "jsx" ? [3] : undefined}
              />
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}