/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-primary": "#E4EEF7",
      },
      fontFamily: {
        gowun: ["GowunDodum-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
