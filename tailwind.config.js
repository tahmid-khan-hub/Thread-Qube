import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'mb-4',
    'text-2xl',
    'text-lg',
    'text-sm',
    'font-semibold',
    'list-disc',
    'list-inside',
    'space-y-1',
    'text-gray-600',
    'mt-8',
    'mt-10',
    'mb-2',
    'text-gray-600',
    'leading-relaxed',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};
