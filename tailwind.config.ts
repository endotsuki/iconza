import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default {
  content: ['./client/**/*.{ts,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(217.2 32.6% 17.5%)',
        input: 'hsl(217.2 32.6% 17.5%)',
        background: 'hsl(222.2 84% 4.9%)',
        foreground: 'hsl(210 40% 98%)',
        primary: {
          DEFAULT: colors.blue[500],
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: colors.indigo[500],
          foreground: '#ffffff',
        },
        asset: {
          DEFAULT: colors.green[500],
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        title: ['PlusJakarta', 'system-ui', 'sans-serif'],
        body: ['PlusJakarta', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
} satisfies Config;
