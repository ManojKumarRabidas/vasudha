// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     './index.html',
//     './frontend/**/*.{js,jsx}',
//   ],
//   theme: {
//     colors: {
//       transparent: 'transparent',
//       white: '#FFFFFF',
//       black: '#000000',
//       primary: {
//         DEFAULT: '#1F7F4A',
//         light: '#2D9E6F',
//         dark: '#155633',
//       },
//       secondary: {
//         DEFAULT: '#F59E0B',
//         light: '#FBBF24',
//         dark: '#D97706',
//       },
//       accent: {
//         DEFAULT: '#14B8A6',
//         light: '#2DD4BF',
//         dark: '#0D9488',
//       },
//       success: '#10B981',
//       warning: '#F59E0B',
//       error: '#EF4444',
//       gray: {
//         50: '#F9FAFB',
//         100: '#F3F4F6',
//         200: '#E5E7EB',
//         300: '#D1D5DB',
//         400: '#9CA3AF',
//         500: '#6B7280',
//         600: '#4B5563',
//         700: '#374151',
//         800: '#1F2937',
//         900: '#111827',
//       },
//     },
//     fontFamily: {
//       sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
//     },
//     extend: {
//       spacing: {
//         xs: '0.5rem',
//         sm: '0.75rem',
//         md: '1rem',
//         lg: '1.5rem',
//         xl: '2rem',
//         '2xl': '3rem',
//       },
//       borderRadius: {
//         none: '0',
//         sm: '0.25rem',
//         base: '0.375rem',
//         md: '0.5rem',
//         lg: '0.75rem',
//         xl: '1rem',
//         full: '9999px',
//       },
//       boxShadow: {
//         sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
//         base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
//         md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//         lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//         xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//       },
//     },
//   },
//   plugins: [],
// }

export default {
  content: ['./index.html', './frontend/**/*.{js,jsx}'],
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