/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // High-end deep theme palette
        primary: {
          DEFAULT: '#ff6a00',
          500: '#ff6a00', // Accent
          900: '#0a0a0f', // Global BG
        },
        bg: {
          primary: '#0a0a0f',
          secondary: '#0f0f16',
          tertiary: '#14141e',
        },
        accent: {
          DEFAULT: '#ff6a00',
          glow: 'rgba(255, 106, 0, 0.3)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #ff6a00 0%, #ff8c42 100%)',
        'gradient-purple': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-blue': 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 106, 0, 0.3)',
        'glow-strong': '0 0 40px rgba(255, 106, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
