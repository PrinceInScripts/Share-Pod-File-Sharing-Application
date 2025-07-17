/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ['class', '[data-mode="dark"]'], // use dark mode from [data-mode]
  theme: {
    extend: {
      colors: {
        pinkTheme: {
          bg: '#ffe4e6',
          text: '#be123c',
        },
        blueTheme: {
          bg: '#e0f2fe',
          text: '#1e40af',
        },
        greenTheme: {
          bg: '#dcfce7',
          text: '#166534',
        },
        purpleTheme: {
          bg: '#ede9fe',
          text: '#6b21a8',
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
      },
    },
  },
  plugins: [],
};
