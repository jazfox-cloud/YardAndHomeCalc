import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        evergreen: "#17483f",
        "evergreen-700": "#123931",
        clay: "#c96f2d",
        "soft-bg": "#f6f7f4"
      },
      boxShadow: {
        panel: "0 1px 2px rgba(20, 31, 27, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
