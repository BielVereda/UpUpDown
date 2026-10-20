/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0D0B18', soft: '#1A1829' },
        neon: {
          cyan: '#00F0FF',
          magenta: '#FF00EA',
          yellow: '#FFE600',
          green: '#00FF66',
        },
        ink: { DEFAULT: '#FFFFFF', muted: '#A1A1AA' },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 6px #00F0FF, 0 0 20px rgba(0,240,255,.55)',
        'neon-magenta': '0 0 6px #FF00EA, 0 0 20px rgba(255,0,234,.55)',
        'neon-yellow': '0 0 6px #FFE600, 0 0 20px rgba(255,230,0,.5)',
        'neon-green': '0 0 6px #00FF66, 0 0 20px rgba(0,255,102,.5)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.96' },
          '52%': { opacity: '.9' },
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 60px' },
        },
        blink: { '50%': { opacity: '0' } },
      },
      animation: {
        flicker: 'flicker 3s infinite',
        'grid-move': 'gridMove 2s linear infinite',
        blink: 'blink 1s steps(2) infinite',
      },
    },
  },
  plugins: [],
}
