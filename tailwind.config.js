/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {
    colors: { ink: '#20231f', cream: '#f7f5f0', olive: '#6c7554', sand: '#e9e4d9' },
    fontFamily: { display: ['Georgia', 'serif'], sans: ['Inter', 'Arial', 'sans-serif'] }
  }},
  plugins: []
};