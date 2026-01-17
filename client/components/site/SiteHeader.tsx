import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IconSmartHome, IconFileDescription, IconIcons, IconMenu4, IconX, IconMessage, IconHistory } from '@tabler/icons-react';
import { VersionHistory } from '../VersionHistory';

export function SiteHeader() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const links = [
    { href: '/', label: 'Home', Icon: IconSmartHome },
    { href: '/icons', label: 'Icons', Icon: IconIcons },
    { href: '/docs', label: 'Documentation', Icon: IconFileDescription },
    { href: '/contact', label: 'Contact', Icon: IconMessage },
  ];

  return (
    <header className='fixed left-0 right-0 top-4 z-50'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6'>
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className='rounded-2xl border border-gray-800/50 bg-gradient-to-br from-primary/20 to-secondary/10 shadow-2xl backdrop-blur-xl'
        >
          <div className='flex h-16 items-center justify-between px-6 py-10'>
            {/* Logo */}
            <Link to='/' className='group inline-flex items-center space-x-3'>
              <img
                src='/iconza.avif'
                alt='IconZa footer'
                width={1154}
                height={1154}
                className='h-10 w-10 transform transition-transform duration-300 group-hover:scale-110'
              />
              <span className='bg-gradient-to-r from-white to-gray-300 bg-clip-text text-2xl font-bold text-transparent'>IconZa</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className='hidden items-center gap-1 lg:flex'>
              {links.map(({ href, label, Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    to={href}
                    className={`group relative flex items-center gap-2 rounded-xl px-5 py-2.5 transition-all duration-300 ${
                      isActive ? 'border border-primary/20 bg-primary/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={20} className='transition-transform group-hover:scale-110' />
                    <span className='text-sm font-medium'>{label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className='flex items-center gap-3'>
              <button
                onClick={() => setShowHistory(true)}
                className='group relative hidden h-10 overflow-hidden rounded-full p-px focus:outline-none sm:inline-flex sm:h-12'
              >
                <div className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,theme(colors.blue.500)_0%,theme(colors.black)_50%,theme(colors.blue.500)_100%)]' />
                <span className='inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-xs font-medium text-white backdrop-blur-3xl sm:px-8 sm:text-sm'>
                  <IconHistory size={20} className='transform transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4' />
                  <span className='transform transition-transform duration-300 group-hover:translate-x-1'>Changelog</span>
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className='rounded-lg border border-gray-700 bg-gray-800/50 p-2 text-gray-400 transition-all duration-300 hover:border-primary/30 hover:text-white lg:hidden'
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <IconX className='h-5 w-5' /> : <IconMenu4 className='h-5 w-5' />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className='overflow-hidden border-t border-gray-800/50 lg:hidden'
              >
                <div className='space-y-2 p-4'>
                  {links.map(({ href, label, Icon }) => {
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={href}
                        to={href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                          isActive
                            ? 'border border-primary/20 bg-primary/10 text-primary'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <Icon size={20} />
                        <span className='font-medium'>{label}</span>
                      </Link>
                    );
                  })}

                  {/* Mobile History Button */}
                  <button
                    onClick={() => setShowHistory(true)}
                    className='group relative inline-flex h-10 overflow-hidden rounded-full p-px sm:h-12'
                  >
                    <div className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#94c748_0%,#000000_50%,#94c748_100%)]' />
                    <span className='inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-xs font-medium text-white backdrop-blur-3xl sm:px-8 sm:text-sm'>
                      <IconHistory
                        size={20}
                        className='transform transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4'
                      />
                      <span className='transform font-medium transition-transform duration-300 group-hover:translate-x-1'>Changelog</span>
                    </span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Version History Modal */}
      <VersionHistory isOpen={showHistory} onClose={() => setShowHistory(false)} />
    </header>
  );
}
