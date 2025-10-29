/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter_400Regular', 'System'],
        medium: ['Inter_500Medium', 'System'],
        semibold: ['Inter_600SemiBold', 'System'],
        bold: ['Inter_700Bold', 'System'],
      },
      colors: {
        background: '#0F1115',
        surface: '#121319',
        card: '#171923',
        text: '#E6EDF3',
        primary: '#7C5CFF',
        success: '#34D399',
        warning: '#F59E0B',
        muted: '#9AA4B2',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0,0,0,0.35)',
      },
    },
  },
  plugins: [],
};
