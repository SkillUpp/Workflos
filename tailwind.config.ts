import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      translate: {
        "-x": "-50%",
        "-y": "-50%",
      },
      colors: {
        customPurple: "#9747FF",
        "scrollbar-hide": "hidden",
      },
      animation: {
        spin: "spin 1s linear infinite",
        "all-3": "all 3s",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      }),
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities(
        {
          ".scrollbar-hide": {
            "scrollbar-width": "none" /* For Firefox */,
            "-ms-overflow-style": "none" /* For Internet Explorer and Edge */,
          },
          ".scrollbar-hide::-webkit-scrollbar": {
            display: "none" /* For Chrome, Safari, and Opera */,
          },
        },
        ["responsive", "hover"]
      );
    },
    require("@tailwindcss/typography"),
  ],
};
export default config;
