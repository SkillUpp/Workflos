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
        search: "url('../assets/images/search.svg')",
        arrow: "url('../assets/images/arrow.svg')",
        "search-bg": "url('../assets/images/search_bg.png')",
      },
      translate: {
        "-x": "-50%",
        "-y": "-50%",
      },
      colors: {
        customPurple: "#9747FF",
        "scrollbar-hide": "hidden",
        primary: "#9747ff",
        secondary: "#000000",
        tertiary: "#f0f0f0",
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
      spacing: {
        "50": "50px",
        "60": "60px",
        "89": "89px",
        "200": "200px",
        "306": "306px",
        "32": "32px",
        "36": "36px",
        "46": "46px",
        "70": "70px",
        "24": "24px",
      },
      fontSize: {
        "18": "18px",
        "24": "24px",
        "32": "32px",
        "40": "40px",
        "56": "56px",
        "70": "70px",
        "16": "16px",
      },
      borderRadius: {
        "24": "24px",
        "8": "8px",
        "5": "5px",
        "6": "6px",
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
