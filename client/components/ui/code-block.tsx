'use client';
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { CopyButton } from './copy-button';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = {
  name: string;
  code: string;
  language?: string;
  highlightLines?: number[];
};

type CodeBlockProps =
  | {
      code: string;
      language: string;
      filename?: string;
      highlightLines?: number[];
      tabs?: never;
    }
  | {
      tabs: Tab[];
      language?: string;
      filename?: string;
      highlightLines?: never;
      code?: never;
    };

export const CodeBlock = (props: CodeBlockProps) => {
  const isTabs = !!('tabs' in props && props.tabs?.length);

  const [activeTab, setActiveTab] = React.useState(0);

  const activeCode = isTabs ? props.tabs[activeTab].code : props.code;
  const activeLanguage = isTabs ? props.tabs[activeTab].language || props.language || 'bash' : props.language;
  const activeHighlightLines = isTabs ? props.tabs[activeTab].highlightLines || [] : props.highlightLines || [];

  return (
    <div className='relative w-full max-w-full overflow-hidden rounded-2xl bg-slate-900'>
      {/* Header: Tabs or Filename */}
      {(isTabs || props.filename) && (
        <div className='flex items-center justify-between rounded-t-lg border-b border-slate-700 bg-slate-800'>
          {/* Tabs */}
          {isTabs && (
            <div className='scrollbar-hide relative flex overflow-x-auto'>
              {props.tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`relative flex-shrink-0 px-4 py-4 font-sans text-sm font-medium transition-colors ${
                    activeTab === index ? 'text-white' : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  {tab.name}
                </button>
              ))}

              {/* Active Tab Indicator */}
              <div
                className='absolute bottom-0 h-[2px] rounded-full bg-blue-500 transition-all duration-300'
                style={{
                  width: `${props.tabs[activeTab]?.name.length * 0.65}rem`,
                  left: `${props.tabs.slice(0, activeTab).reduce((acc, t) => acc + t.name.length * 0.65 + 2, 0)}rem`,
                }}
              />
            </div>
          )}

          {/* Filename for single code */}
          {!isTabs && props.filename && <div className='truncate px-4 py-4 font-sans text-sm text-slate-400'>{props.filename}</div>}

          {/* Copy button always on the right */}
          <div className='flex items-center pr-4'>
            <CopyButton content={activeCode} variant='glass' size='default' />
          </div>
        </div>
      )}

      {/* Code Area */}
      <div className='no-scrollbar relative max-h-64 overflow-auto'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={isTabs ? activeTab : 0}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <SyntaxHighlighter
              language={activeLanguage}
              style={atomDark}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'transparent',
                fontSize: '0.875rem',
                fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                overflow: 'visible',
                width: '100%',
                minWidth: 'max-content',
              }}
              wrapLines={false}
              showLineNumbers
              lineNumberStyle={{
                minWidth: '2.5rem',
                paddingRight: '1rem',
                color: '#64748b',
                fontSize: '0.75rem',
                textAlign: 'right',
                userSelect: 'none',
              }}
              lineProps={(lineNumber) => ({
                style: {
                  backgroundColor: activeHighlightLines.includes(lineNumber) ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  display: 'block',
                  width: '100%',
                  paddingLeft: '0.5rem',
                  paddingRight: '1rem',
                  borderLeft: activeHighlightLines.includes(lineNumber) ? '3px solid #3b82f6' : '3px solid transparent',
                },
              })}
              PreTag='div'
              CodeTag='code'
            >
              {String(activeCode)}
            </SyntaxHighlighter>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
