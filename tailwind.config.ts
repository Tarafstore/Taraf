import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        'surface-muted': 'var(--color-surface-muted)',
        ink: 'var(--color-ink)',
        'ink-soft': 'var(--color-ink-soft)',
        brand: 'var(--color-brand)',
        'brand-soft': 'var(--color-brand-soft)',
        line: 'var(--color-line)',
      },
      spacing: {
        section: 'var(--space-section)',
        'section-sm': 'var(--space-section-sm)',
        'container-x': 'var(--space-container-x)',
      },
      borderRadius: {
        soft: '0.25rem',
      },
      fontFamily: {
        sans: ['"Noto Kufi Arabic"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-ar': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-ar': ['2rem', { lineHeight: '1.3' }],
        'title-ar': ['1.5rem', { lineHeight: '1.35' }],
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        card: '0 1px 0 rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};

export default config;
