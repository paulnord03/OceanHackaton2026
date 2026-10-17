/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: '#0A3C59',
          mid: '#125A82',
          light: '#1E7AAB',
          surface: '#0d4a6b',
        },
        lagoon: {
          DEFAULT: '#2EC4B6',
          dark: '#25A99C',
          light: '#5FE0D2',
          soft: '#A8F0E8',
        },
        coral: {
          DEFAULT: '#FF9F1C',
          dark: '#E8881A',
          light: '#FFB85C',
          soft: '#FFE0B0',
        },
        tint: '#E0F4F7',
        sand: '#FFF6E6',
      },
      fontFamily: {
        display: ['Fredoka', 'Nunito', 'system-ui', 'sans-serif'],
        body: ['Nunito', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '24px',
        '5xl': '32px',
      },
      boxShadow: {
        card: '0 12px 40px -8px rgba(10, 60, 89, 0.25)',
        'card-lg': '0 24px 60px -12px rgba(10, 60, 89, 0.4)',
        glow: '0 0 40px rgba(46, 196, 182, 0.5)',
        'glow-coral': '0 0 30px rgba(255, 159, 28, 0.55)',
        'inner-lagoon': 'inset 0 0 24px rgba(46, 196, 182, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'swim-gentle': {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
        'bob-up': {
          '0%': { transform: 'translateY(28px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-out-left': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-40px)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'bubble-rise': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
          '100%': { transform: 'translateY(-140px) scale(0.3)', opacity: '0' },
        },
        'caustic-drift': {
          '0%, 100%': { transform: 'translate(0,0) scale(1)', opacity: '0.35' },
          '50%': { transform: 'translate(30px,-20px) scale(1.1)', opacity: '0.55' },
        },
        'ripple': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'pulse-coral': {
          '0%, 100%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 rgba(255, 159, 28, 0.55)',
          },
          '50%': {
            transform: 'scale(1.03)',
            boxShadow: '0 0 0 16px rgba(255, 159, 28, 0)',
          },
        },
        'pin-pop': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.18)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'swim-gentle': 'swim-gentle 5s ease-in-out infinite',
        'bob-up': 'bob-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.5s ease-out both',
        'slide-out-left': 'slide-out-left 0.35s ease-in both',
        'slide-in-right': 'slide-in-right 0.45s ease-out both',
        'bubble-rise': 'bubble-rise 7s ease-in infinite',
        'caustic-drift': 'caustic-drift 12s ease-in-out infinite',
        ripple: 'ripple 4s ease-out infinite',
        'pulse-coral': 'pulse-coral 2.2s ease-in-out infinite',
        'pin-pop': 'pin-pop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        shimmer: 'shimmer 3s linear infinite',
        'rotate-slow': 'rotate-slow 40s linear infinite',
      },
    },
  },
  plugins: [],
};
