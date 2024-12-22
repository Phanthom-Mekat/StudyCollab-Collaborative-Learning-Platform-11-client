/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0f172a',
          "primary":  "#ff6a3d",
          "secondary": "#ffd7be",
          "accent": "#f3f4f6",
      },
    },
  },
  plugins: [
    daisyui,
  ],
}