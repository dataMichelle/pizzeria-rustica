const { Quicksand } = require("next/font/google");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        oswald: ['"Oswald"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
        merienda: ['"Merienda"', "cursive"],
        quicksand: ['"Quicksand"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
