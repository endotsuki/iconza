import { motion, useScroll, useInView } from "framer-motion";
import { IconPortal } from "../IconPortal";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { IconLink, IconCopy, IconCheck } from "@tabler/icons-react";
import { toast } from "sonner";

interface IconItemProps {
  name: string;
  Comp: React.ComponentType<{ size: number }>;
  size: number;
  viewMode: "grid" | "list";
  category: string;
  keywords: string[];
  sourceUrl?: string;
}

export function IconItem({ name, Comp, size, viewMode, category, keywords, sourceUrl }: IconItemProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleOpen = () => setOpen(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(name);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (sourceUrl) {
      window.open(sourceUrl, '_blank');
    } else {
      toast.error("Source URL not available");
    }
  };

  const listItemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.98,
      transition: { duration: 0.2 }
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.4 }
    }
  };

  if (viewMode === "list") {
    return (
      <>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={listItemVariants}
          className={cn(
            "flex w-full items-center gap-4 p-4 rounded-2xl border border-white/10",
            "bg-gray-800/50 group",
            "transform-gpu"
          )}
        >
          <button
            onClick={handleOpen}
            className="flex-1 flex items-center gap-4"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-xl">
              <Comp size={Math.min(size, 32)} aria-label={name} />
            </div>
            <div className="flex-1 text-left space-y-1">
              <h3 className="font-medium">{name}</h3>
              <div className="text-xs inline-block bg-gray-700 px-2 py-1 rounded">
                {category}
              </div>
              <p className="text-sm text-gray-400 truncate">
                {keywords.slice(0, 3).join(", ")}
              </p>
            </div>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-gray-700/50 cursor-copy transition-colors"
              title="Copy icon name"
            >
              {copied ? (
                <IconCheck className="w-4 h-4 text-lime-400" />
              ) : (
                <IconCopy className="w-4 h-4 text-gray-400 group-hover:text-white" />
              )}
            </button>
            <button
              onClick={handleLink}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
              title="View icon details"
            >
              <IconLink className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </motion.div>
        <IconPortal name={name} open={open} onOpenChange={setOpen} />
      </>
    );
  }

  return (
    <>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={cn(
          "group w-full flex flex-col items-center gap-3 p-4 rounded-2xl border",
          "border-white/20 bg-gray-800/60",
          "transform-gpu relative"
        )}
      >
        <button
          onClick={handleOpen}
          className="w-full flex flex-col items-center gap-2"
        >
          <div className="inline-flex items-center justify-center rounded-xl p-2 backdrop-blur-lg bg-white/5 border border-white/10 shadow-[inset_0_2px_6px_rgba(255,255,255,0.08)] relative z-10">
            <Comp size={size} aria-label={name} />
          </div>
          <div className="text-center space-y-3">
            <span className="text-sm font-light block">{name}</span>
            <div className="text-xs inline-block bg-slate-500/20 text-white px-2 py-1 rounded">
              {category}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-gray-700/50 cursor-copy transition-colors"
              title="Copy icon name"
            >
              {copied ? (
                <IconCheck className="w-4 h-4 text-lime-400" />
              ) : (
                <IconCopy className="w-4 h-4 text-gray-400 group-hover:text-white" />
              )}
            </button>
            <button
              onClick={handleLink}
              className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
              title="View source URL"
            >
              <IconLink className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </button>
      </motion.div>
      <IconPortal name={name} open={open} onOpenChange={setOpen} />
    </>
  );
}
