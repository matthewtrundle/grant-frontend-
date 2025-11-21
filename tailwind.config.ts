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
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
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
        // DNA/Biotech Design System - Background Colors
        'bg-dna': {
          primary: '#FAFBFD',    // Very light off-white with blue undertones
          secondary: '#F8F9FC',  // Slightly cooler off-white
          card: '#FFFFFF',       // Pure white for cards
          'card-tint': '#F9FBFC', // White with slight blue tint
        },
        // DNA/Biotech - Primary Accents (DNA Strand Colors)
        'dna-teal': {
          DEFAULT: '#0B7E8C',    // Deep teal/cyan - DNA strands, trust
          light: '#1B9BA8',      // Lighter teal for gradients
          50: '#E6F7F9',
          100: '#CCF0F3',
          200: '#99E1E7',
          300: '#66D2DB',
          400: '#33C3CF',
          500: '#0B7E8C',
          600: '#096570',
          700: '#074C54',
          800: '#053238',
          900: '#02191C',
        },
        'dna-green': {
          DEFAULT: '#2ECC71',    // Vibrant green - biology/growth
          dark: '#27AE60',       // Deeper green for contrast
          50: '#E8F8F0',
          100: '#D1F1E1',
          200: '#A3E3C3',
          300: '#75D5A5',
          400: '#47C787',
          500: '#2ECC71',
          600: '#25A35A',
          700: '#1C7A44',
          800: '#13512D',
          900: '#0A2917',
        },
        // DNA/Biotech - Tech/Data Colors
        'bio-blue': {
          DEFAULT: '#3A9ECC',    // Soft blue for data elements
          light: '#4ABEFF',      // Light blue for highlights
          50: '#EBF6FC',
          100: '#D7EDF9',
          200: '#AFDBF3',
          300: '#87C9ED',
          400: '#5FB7E7',
          500: '#3A9ECC',
          600: '#2E7FA3',
          700: '#235F7A',
          800: '#174051',
          900: '#0C2029',
        },
        // DNA/Biotech - Supporting Colors
        'neon-green': {
          DEFAULT: '#00FF9F',    // DNA helix accent lines (use sparingly!)
          alt: '#20DD7A',        // Alternative neon green
        },
        'navy-deep': '#1A2847',  // Deep navy for text and serious elements

        // Existing grayscale (updated to match DNA aesthetic)
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
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        // Subtle Scientific Shadows (DNA/Biotech theme)
        'subtle': '0 2px 8px rgba(26, 40, 71, 0.04)',
        'soft': '0 4px 12px rgba(26, 40, 71, 0.06)',
        'lifted': '0 8px 24px rgba(26, 40, 71, 0.08)',
        'float': '0 12px 32px rgba(26, 40, 71, 0.10)',
        // DNA Theme Shadows
        'focus': '0 0 0 4px rgba(11, 126, 140, 0.1)',  // Teal focus ring
        'glow-teal': '0 0 20px rgba(11, 126, 140, 0.3)', // Teal glow (use sparingly)
        'glow-green': '0 0 20px rgba(46, 204, 113, 0.3)', // Green glow (use sparingly)
      },
      transitionDuration: {
        'instant': '150ms',
        'quick': '300ms',
        'snappy': '450ms',
        'smooth': '800ms',
        'slow': '1200ms',
        'cinematic': '2000ms',
        'epic': '3000ms',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'circ-inOut': 'cubic-bezier(0.85, 0, 0.15, 1)',
        'back-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        // DNA/Biotech Animations
        'dna-float': 'dna-float 20s ease-in-out infinite',
        'molecule-pulse': 'molecule-pulse 3s ease-in-out infinite',
        'helix-rotate': 'helix-rotate 30s linear infinite',
        'fade-in': 'fade-in 0.8s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
        // Legacy animations (keeping for compatibility)
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        // DNA/Biotech Keyframes
        'dna-float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(5deg)' },
        },
        'molecule-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' },
        },
        'helix-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Legacy keyframes
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
