export default {
  // content: ['./index.html', './**/*.{js,jsx}'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      // Only override these base tokens
      transparent: 'transparent',
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        50: '#F9FAFB', 100: '#F3F4F6', 200: '#E5E7EB',
        300: '#D1D5DB', 400: '#9CA3AF', 500: '#6B7280',
        600: '#4B5563', 700: '#374151', 800: '#1F2937', 900: '#111827',
      },
    },
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
    },
    extend: {
      colors: {
        // Your brand colors added ON TOP of Tailwind defaults
        primary: { DEFAULT: '#1F7F4A', light: '#2D9E6F', dark: '#155633' },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
        red: {           // ← ADD THIS manually since you override colors
          50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca',
          400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
        },
        blue: {
          50: '#eff6ff', 100: '#dbeafe',
          400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
        },
        green: {
          50: '#f0fdf4', 100: '#dcfce7',
          400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
        },
        yellow: {
          50: '#fefce8', 100: '#fef9c3',
          400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207',
        },
        orange: {
          50: '#fff7ed', 100: '#ffedd5',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
        },
      },
      // ...spacing, borderRadius, boxShadow stay here as before
    },
  },
  plugins: [],
}