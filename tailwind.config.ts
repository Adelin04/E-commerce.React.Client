import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory: 
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': { 'max': '650px' },
      'md': { 'max': '768px' },
      'lg': { 'max': '976px' },
      'xl': { 'max': '1440px' },
    },
    extend: {},
  },
  plugins: [],
}
export default config
