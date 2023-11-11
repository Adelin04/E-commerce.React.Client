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
    // Target must be serverless
    target: 'serverless',
    extend: {},
  },
  plugins: [],
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}
export default config
