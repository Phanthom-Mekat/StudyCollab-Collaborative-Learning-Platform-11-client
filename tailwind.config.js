/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			dark: '#0f172a',
  			'primary': '#4f46e5',
  			'secondary': '#a78bfa',
  			'accent': '#f3f4f6'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    daisyui,
      // eslint-disable-next-line no-undef
      require("tailwindcss-animate")
],
}