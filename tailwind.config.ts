import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050608",
          900: "#0a0c10",
          800: "#10131a",
          700: "#181c25",
          600: "#252a36",
          500: "#3a4051",
        },
        teal: {
          50: "#e8fffb",
          100: "#c2fff3",
          200: "#7df5dc",
          300: "#37e7c0",
          400: "#16d3a8",
          500: "#0bb38f",
          600: "#089073",
          700: "#066957",
        },
        accent: {
          amber: "#f6b73c",
          rose: "#ff6e7a",
          violet: "#9d7bff",
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Noto Sans JP"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Roboto Mono"', "ui-monospace", "monospace"],
        display: ['"Space Grotesk"', '"Inter"', '"Noto Sans JP"', "sans-serif"],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-teal":
          "radial-gradient(circle at 30% 20%, rgba(11,179,143,0.25), transparent 60%), radial-gradient(circle at 80% 80%, rgba(157,123,255,0.18), transparent 55%)",
      },
      animation: {
        "pulse-ring": "pulseRing 2.5s cubic-bezier(0.4,0,0.6,1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
