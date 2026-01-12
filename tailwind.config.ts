import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tea: {
          light: "#F3E5D8",
          medium: "#D4C4B0",
          dark: "#8B5A3C",
          accent: "#A67C52",
          green: "#6B8E5A",
        },
      },
    },
  },
  plugins: [],
};
export default config;
