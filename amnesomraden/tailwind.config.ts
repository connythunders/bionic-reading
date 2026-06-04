import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Lugn, NPF-vänlig palett med god kontrast
        botten: "#f7f7f4",
        kort: "#ffffff",
        ankare: "#1f6f5c",
        "ankare-ljus": "#e6f0ec",
        ram: "#e2e2dc",
        text: "#1f2421",
        dampad: "#5a615b",
      },
      fontFamily: {
        sans: [
          "var(--font-system)",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl2: "1.1rem",
      },
    },
  },
  plugins: [],
};

export default config;
