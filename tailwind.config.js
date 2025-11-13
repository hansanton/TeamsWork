/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hero': '#0A2540',
        'accent': {
          DEFAULT: '#635BFF',
          light: '#7A73FF',
          dark: '#4A41FF'
        },
        'success': {
          light: '#E3FFF2',
          DEFAULT: '#00D67D',
          dark: '#00B368'
        },
        'neutral': {
          50: '#F7F7FF',
          100: '#EEEEFF',
          200: '#E0E0FF',
          300: '#C5C5FF',
          400: '#A3A3FF',
          500: '#8585FF',
          600: '#6B6BE6',
          700: '#5252CC',
          800: '#3D3D99',
          900: '#292966'
        }
      },
      fontFamily: {
        display: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif'
        ],
        sans: [
          'SF Pro Text',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'system-ui',
          'sans-serif'
        ]
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem'
      },
      boxShadow: {
        'glow': '0 0 50px -12px rgba(99, 91, 255, 0.25)',
        'glow-success': '0 0 50px -12px rgba(0, 214, 125, 0.25)',
        'card': '0 8px 24px -4px rgba(10, 37, 64, 0.1)',
        'card-hover': '0 20px 40px -8px rgba(10, 37, 64, 0.25)'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        }
      }
    },
  },
  plugins: [],
}