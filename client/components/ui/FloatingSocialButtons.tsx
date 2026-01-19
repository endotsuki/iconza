import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Icon } from 'iconza';

export const FloatingSocialButtons = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      href: 'https://github.com/Onimuxha',
      iconName: 'GitHub Light' as const,
      label: 'GitHub',
    },
    {
      href: 'https://www.npmjs.com/package/iconza',
      iconName: 'NPM' as const,
      label: 'NPM',
    },
    {
      href: 'https://reddit.com/user/5ukuna_ryomen/',
      iconName: 'Reddit' as const,
      label: 'Reddit',
    },
    {
      href: 'https://x.com/onimuxha',
      iconName: 'X Light' as const,
      label: 'X',
    },
  ];

  return (
    <>
      {/* Desktop Version (lg and above) */}
      <aside
        className={cn(
          'fixed right-4 top-2/4 z-50 hidden translate-y-24 lg:flex',
          'border border-primary/30 bg-black/80 backdrop-blur-xl',
          'flex-col gap-3 rounded-2xl p-3 shadow-2xl',
          'transform transition-all duration-300 hover:scale-105',
          'hover:border-primary/50 hover:shadow-primary/20'
        )}
      >
        {links.map((link) => (
          <DesktopButton key={link.href} link={link} />
        ))}
      </aside>

      {/* Mobile Version (below lg) */}
      <div className='fixed bottom-6 right-6 z-50 lg:hidden'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'h-12 w-12 rounded-full bg-primary text-black',
            'flex items-center justify-center shadow-2xl',
            'border-2 border-primary transition-all duration-300',
            'relative z-50 hover:scale-110 active:scale-95',
            'focus:outline-none focus:ring-4 focus:ring-primary/50'
          )}
          aria-label='Social links'
        >
          <div className='relative flex h-6 w-6 items-center justify-center'>
            <div
              className={cn('absolute h-0.5 w-5 bg-white transition-all duration-300', 'transform', isOpen ? 'rotate-45' : 'rotate-0')}
            />
            <div
              className={cn('absolute h-0.5 w-5 bg-white transition-all duration-300', 'transform', isOpen ? '-rotate-45' : 'rotate-0')}
            />
            {!isOpen && (
              <div
                className={cn(
                  'absolute h-5 w-0.5 bg-white transition-all duration-300',
                  'transform',
                  isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                )}
              />
            )}
          </div>
        </button>

        {/* Expanded Menu */}
        <div
          className={cn(
            'absolute bottom-16 right-0 z-40 flex flex-col gap-3',
            'origin-bottom-right transform transition-all duration-300',
            isOpen ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-4 scale-50 opacity-0'
          )}
        >
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                'group relative flex items-center justify-center',
                'h-12 w-12 rounded-full transition-all duration-300',
                'border border-primary/30 bg-neutral-800 text-primary',
                'shadow-lg hover:scale-110 hover:text-white',
                isOpen ? `translate-y-0 opacity-100` : 'translate-y-4 opacity-0'
              )}
              aria-label={link.label}
              style={{
                transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
              }}
              onClick={() => setIsOpen(false)}
            >
              <div className='relative z-10 flex h-full w-full items-center justify-center'>
                <Icon name={link.iconName} size={20} className='transition-colors duration-300' />
              </div>
            </a>
          ))}
        </div>

        {isOpen && <div className='fixed inset-0 z-30 bg-black/10 backdrop-blur-sm lg:hidden' onClick={() => setIsOpen(false)} />}
      </div>
    </>
  );
};

// Desktop Button Component
const DesktopButton = ({ link }) => (
  <a
    href={link.href}
    target='_blank'
    rel='noopener noreferrer'
    className={cn(
      'group relative flex items-center justify-center',
      'h-12 w-12 rounded-xl transition-all duration-300',
      'border border-neutral-800 bg-neutral-800',
      'hover:-translate-y-1 hover:before:opacity-10',
      link.color,
      'before:absolute before:inset-0 before:rounded-xl',
      'before:bg-primary before:opacity-0 before:transition-opacity',
      'after:absolute after:inset-0 after:rounded-xl',
      'after:border after:border-primary after:opacity-0',
      'after:transition-all after:duration-300',
      'hover:after:scale-90 hover:after:opacity-100'
    )}
    aria-label={link.label}
  >
    <div className='relative z-10 flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-110'>
      <Icon name={link.iconName} size={25} className='transition-colors duration-300' />
    </div>

    <div
      className={cn(
        'absolute right-full mr-3 px-2 py-1',
        'rounded-md bg-black text-xs text-white',
        'opacity-0 transition-opacity duration-200 group-hover:opacity-100',
        'pointer-events-none whitespace-nowrap',
        'border border-primary/30'
      )}
    >
      {link.label}
      <div className='absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1 rotate-45 transform border-b border-r border-primary/30 bg-black'></div>
    </div>
  </a>
);
