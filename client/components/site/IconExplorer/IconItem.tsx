import { motion, useScroll, useInView } from 'framer-motion';
import { IconPortal } from '../IconPortal';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { IconLink, IconCopy, IconCheck } from '@tabler/icons-react';
import { toast } from 'sonner';

interface IconItemProps {
  name: string;
  Comp: React.ComponentType<{ size: number }>;
  size: number;
  viewMode: 'grid' | 'list';
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
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (sourceUrl) {
      window.open(sourceUrl, '_blank');
    } else {
      toast.error('Source URL not available');
    }
  };

  const listItemVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.98,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  if (viewMode === 'list') {
    return (
      <>
        <motion.div
          ref={ref}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
          variants={listItemVariants}
          className={cn('flex w-full items-center gap-4 rounded-2xl border border-white/10 p-4', 'group bg-gray-800/50', 'transform-gpu')}
        >
          <button onClick={handleOpen} className='flex flex-1 items-center gap-4'>
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-gray-700'>
              <Comp size={Math.min(size, 32)} aria-label={name} />
            </div>
            <div className='flex-1 space-y-1 text-left'>
              <h3 className='font-medium'>{name}</h3>
              <div className='inline-block rounded bg-gray-700 px-2 py-1 text-xs'>{category}</div>
              <p className='truncate text-sm text-gray-400'>{keywords.slice(0, 3).join(', ')}</p>
            </div>
          </button>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleCopy}
              className='cursor-copy rounded-lg p-2 transition-colors hover:bg-gray-700/50'
              title='Copy icon name'
            >
              {copied ? (
                <IconCheck className='h-4 w-4 text-primary' />
              ) : (
                <IconCopy className='h-4 w-4 text-gray-400 group-hover:text-white' />
              )}
            </button>
            <button onClick={handleLink} className='rounded-lg p-2 transition-colors hover:bg-gray-700/50' title='View icon details'>
              <IconLink className='h-4 w-4 text-gray-400 group-hover:text-white' />
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
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
        className={cn(
          'group flex w-full flex-col items-center gap-3 rounded-2xl border p-4',
          'border-white/20 bg-gray-800/60',
          'relative transform-gpu'
        )}
      >
        <button onClick={handleOpen} className='flex w-full flex-col items-center gap-2'>
          <div className='relative z-10 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 shadow-[inset_0_2px_6px_rgba(255,255,255,0.08)] backdrop-blur-lg'>
            {/* className="border border-red-500" */}
            <Comp size={size} aria-label={name} />
          </div>
          <div className='space-y-3 text-center'>
            <span className='block text-sm font-light'>{name}</span>
            <div className='inline-block rounded bg-slate-500/20 px-2 py-1 text-xs text-white'>{category}</div>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={handleCopy}
              className='cursor-copy rounded-lg p-2 transition-colors hover:bg-gray-700/50'
              title='Copy icon name'
            >
              {copied ? (
                <IconCheck className='h-4 w-4 text-primary' />
              ) : (
                <IconCopy className='h-4 w-4 text-gray-400 group-hover:text-white' />
              )}
            </button>
            <button onClick={handleLink} className='rounded-lg p-2 transition-colors hover:bg-gray-700/50' title='View source URL'>
              <IconLink className='h-4 w-4 text-gray-400 group-hover:text-white' />
            </button>
          </div>
        </button>
      </motion.div>
      <IconPortal name={name} open={open} onOpenChange={setOpen} />
    </>
  );
}
