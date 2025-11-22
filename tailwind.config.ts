import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Shadcn UI color system */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },

        /* FundAid Light Theme - Named Colors */
        'fundaid-page': '#F5F2ED',
        'fundaid-page-alt': '#F8F5EE',
        'fundaid-panel': '#FFFFFF',
        'fundaid-canvas': '#EFE9DF',

        'fundaid-text-main': '#14141F',
        'fundaid-text-muted': '#6B6B7C',
        'fundaid-text-data': '#6B6B7C',

        'fundaid-teal': '#2FB49E',
        'fundaid-lavender': '#A98CEB',
        'fundaid-coral': '#E4584A',

        /* Grayscale for structural elements */
        gray: {
          50: '#FAFBFD',
          100: '#F8F9FC',
          200: '#E8EAED',
          300: '#D1D5DB',
          400: '#BEC3C9',
          500: '#9CA3AF',
          600: '#6B7280',
          700: '#4B5563',
          800: '#1F2937',
          900: '#111827',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        /* Clean, subtle shadows - no glows */
        'fundaid-sm': '0 1px 2px rgba(20, 20, 31, 0.05)',
        'fundaid-md': '0 2px 4px rgba(20, 20, 31, 0.08)',
        'fundaid-lg': '0 4px 8px rgba(20, 20, 31, 0.12)',
        'fundaid-xl': '0 8px 16px rgba(20, 20, 31, 0.16)',

        /* Teal focus ring (no glow) */
        'fundaid-focus': '0 0 0 3px rgba(47, 180, 158, 0.2)',
      },
      transitionDuration: {
        'instant': '150ms',
        'fast': '300ms',
        'medium': '600ms',
        'slow': '1200ms',
        'cinematic': '2000ms',
      },
      transitionTimingFunction: {
        'fundaid': 'cubic-bezier(0.16, 1, 0.3, 1)',  // Smooth easing
      },
      animation: {
        /* Restrained animations only - no bounces, no flashy stuff */
        'fade-in': 'fade-in 0.8s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
