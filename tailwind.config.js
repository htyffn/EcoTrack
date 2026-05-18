/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // xAI Brand Colors
        'xai-dark': '#1f2228',
        'xai-white': '#ffffff',

        // Text Colors
        'text-primary': '#ffffff',
        'text-secondary': 'rgba(255, 255, 255, 0.7)',
        'text-tertiary': 'rgba(255, 255, 255, 0.5)',
        'text-quaternary': 'rgba(255, 255, 255, 0.3)',

        // Border Colors
        'border-default': 'rgba(255, 255, 255, 0.1)',
        'border-strong': 'rgba(255, 255, 255, 0.2)',

        // Surface Colors
        'surface-subtle': 'rgba(255, 255, 255, 0.03)',
        'surface-hover': 'rgba(255, 255, 255, 0.08)',
        'surface-elevated': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        'geist-mono': [
          'GeistMono',
          'ui-monospace',
          'SFMono-Regular',
          'Roboto Mono',
          'Menlo',
          'Monaco',
          'Liberation Mono',
          'DejaVu Sans Mono',
          'Courier New',
          'monospace',
        ],
        'universal-sans': [
          'universalSans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
      fontSize: {
        // Display
        'display-hero': ['5rem', { lineHeight: '1.5', fontWeight: '300' }], // 80px
        'display-xl': ['3.75rem', { lineHeight: '1.2', fontWeight: '400' }], // 60px

        // Headings
        'heading-lg': ['1.875rem', { lineHeight: '1.2', fontWeight: '400' }], // 30px
        'heading-md': ['1.5rem', { lineHeight: '1.2', fontWeight: '400' }], // 24px
        'heading-sm': ['1.25rem', { lineHeight: '1.2', fontWeight: '400' }], // 20px

        // Body
        'body-lg': ['1.125rem', { lineHeight: '1.5', fontWeight: '400' }], // 18px
        'body': ['1rem', { lineHeight: '1.5', fontWeight: '400' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px

        // Small
        'small': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }], // 12px
      },
      letterSpacing: {
        'button': '1.4px',
        'badge': '1px',
      },
      borderRadius: {
        // xAI uses sharp corners by default
        'none': '0',
        'subtle': '4px',
      },
      boxShadow: {
        // xAI explicitly has no shadows
        'none': 'none',
      },
      spacing: {
        // 8px base grid
        'xs': '4px',
        'sm': '8px',
        'md': '24px',
        'lg': '48px',
        'xl': '96px',
      },
      ringColor: {
        'focus': 'rgb(59, 130, 246)',
      },
      ringOpacity: {
        'focus': '0.5',
      },
    },
  },
  plugins: [],
};
