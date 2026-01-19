import { useState, useEffect } from 'react';
import {
  IconStar,
  IconDownload,
  IconLicense,
  IconSourceCode,
  IconSmartHome,
  IconIcons,
  IconFileDescription,
  IconMessage,
  IconHeartFilled,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { Icon, icons } from 'iconza';

export function SiteFooter() {
  const year = new Date().getFullYear();
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

  const navigation = {
    main: [
      { name: 'Home', href: '/', icon: IconSmartHome },
      { name: 'Icons', href: '/icons', icon: IconIcons },
      { name: 'Documentation', href: '/docs', icon: IconFileDescription },
      { name: 'Contact', href: '/contact', icon: IconMessage },
    ],
    stats: [
      { value: Object.keys(icons).length, label: 'Icons', icon: IconStar },
      { value: totalDownloads, label: 'Downloads', icon: IconDownload },
      { label: 'MIT Licensed', icon: IconLicense },
      { label: 'Open Source', icon: IconSourceCode },
    ],
    social: [
      {
        name: 'GitHub Light',
        href: 'https://github.com/Onimuxha',
      },
      {
        name: 'X Light',
        href: 'https://x.com/onimuxha',
      },
      {
        name: 'Gmail',
        href: 'mailto:akumayami288@gmail.com',
      },
      {
        name: 'NPM',
        href: 'https://www.npmjs.com/~onimuxha',
      },
    ],
  };

  return (
    <footer className='border-t border-gray-800 bg-gradient-to-br from-gray-900 to-black'>
      <div className='mx-auto max-w-7xl px-6 py-16 lg:px-8'>
        <div className='grid gap-12 lg:grid-cols-4'>
          <div className='space-y-6 lg:col-span-2'>
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

            <p className='max-w-md text-lg leading-relaxed text-gray-400'>
              A modern icon library built for developers. Beautiful, consistent, and easy to use icons for your next project.
            </p>

            {/* Social Links */}
            <div className='flex space-x-4'>
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target='_blank'
                  className='group flex aspect-square items-center rounded-lg border border-gray-700 bg-gray-800/50 p-2 hover:border-primary/30'
                  aria-label={item.name}
                >
                  <Icon name={item.name} className='transition-all duration-300 group-hover:scale-125' />
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className='mb-6 flex items-center gap-2 text-lg font-semibold text-white'>Navigation</span>
            <ul className='space-y-4'>
              {navigation.main.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <Link
                    to={href}
                    className='group flex items-center gap-2 py-2 text-sm font-medium text-gray-400 transition-all duration-300 hover:text-primary'
                  >
                    <Icon size={20} stroke={1.5} className='transition-transform duration-300 group-hover:scale-110' />
                    <span className='transition-transform duration-300 group-hover:translate-x-1'>{name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className='mb-6 flex items-center gap-2 text-lg font-semibold text-white'>Statistics</span>
            <div className='grid gap-4'>
              {navigation.stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className='flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800/30 p-3 transition-colors hover:border-primary/30'
                >
                  <div className='flex items-center space-x-3'>
                    <div className='rounded-lg bg-primary/10 p-2'>
                      <Icon size={16} className='text-primary' />
                    </div>
                    <span className='text-sm font-medium text-gray-300'>{label}</span>
                  </div>
                  {value && <span className='rounded bg-primary/10 px-2 py-1 text-sm font-bold text-white'>{value.toLocaleString()}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-16 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent'></div>
        <div className='mt-8'>
          <div className='flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0'>
            <div className='flex items-center space-x-4 text-sm text-gray-400'>
              <span>&copy; {year} IconZa. All rights reserved.</span>
              <span className='hidden lg:block'>•</span>
              <span>Built with modern web technologies</span>
            </div>

            <div className='flex items-center space-x-2 text-gray-400'>
              <span className='text-sm'>Made with</span>
              <IconHeartFilled className='h-4 w-4 animate-pulse text-red-400' />
              <span className='text-sm'>for the developer community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
