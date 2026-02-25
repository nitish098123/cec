import type { Config } from "tailwindcss";

export default {
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
        inter: ["Inter", "serif"],
      },
      keyframes: {
        scroll: {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(-100%)" },
        },
        "testimonial-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        scroll: "scroll 35s linear infinite",
        sponsor: "sponsor 1s linear infinite",
        "testimonial-scroll": "testimonial-scroll 30s linear infinite",
      },
    },
  },
  plugins: [],
};
