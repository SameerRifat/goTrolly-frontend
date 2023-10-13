/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'transparent': 'transparent',
      },
    },
    colors: {
      'main': '#F4C54E',
      'yellow': '#FFFF00',
      'mustard': '#FFD856',
      'tulip-tree': '#DFA746',
      'broom': '#EAD820',
      'white': '#FFFFFF',
      'black': '#000000',
      'gray': {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
        950: '#030712',
      },
    },
  },
  plugins: [],
}