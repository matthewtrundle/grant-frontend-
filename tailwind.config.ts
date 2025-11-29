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

        /* FundAid Clinical Medical SaaS Theme */
        // Backgrounds
        'fundaid-page': '#FFFFFF',
        'fundaid-section-subtle': '#F5F7FA',
        'fundaid-section-accent': '#F2F6FF',
        'fundaid-card': '#FFFFFF',
        'fundaid-muted': '#F3F4F6',

        // Text
        'fundaid-text-primary': '#111827',
        'fundaid-text-secondary': '#374151',
        'fundaid-text-muted': '#6B7280',

        // Borders
        'fundaid-border-subtle': '#E5E7EB',
        'fundaid-border-medium': '#D1D5DB',

        // Brand Accents
        'fundaid-accent-primary': '#1446A0',
        'fundaid-accent-primary-hover': '#0F3580',
        'fundaid-accent-secondary': '#1BA39C',
        'fundaid-accent-data': '#6D5BD0',

        // Functional
        'fundaid-success': '#2BAF7D',
        'fundaid-error': '#EF4444',
        'fundaid-warning': '#F59E0B',

        /* Clinical grayscale - aligned with medical SaaS aesthetic */
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
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
        /* Clinical shadows - subtle, professional */
        'fundaid-sm': '0 1px 2px rgba(17, 24, 39, 0.06)',
        'fundaid-md': '0 2px 4px rgba(17, 24, 39, 0.08)',
        'fundaid-lg': '0 4px 8px rgba(17, 24, 39, 0.12)',
        'fundaid-xl': '0 8px 16px rgba(17, 24, 39, 0.16)',

        /* Primary blue focus ring (WCAG compliant) */
        'fundaid-focus': '0 0 0 3px rgba(20, 70, 160, 0.2)',
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
