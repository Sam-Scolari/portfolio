const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    colors: {
      transparent: "transparent",
      black: "black",
      white: "white",
      grey: "#A9A9A9",
      pink: "#FF00E5",
      "hot-pink": "#E52268",
      purple: "#8247E5",
    },
    fontFamily: {
      inter: ["Inter"],
      "press-start": ["PressStart2P"],
      silkscreen: ["Silkscreen"],
    },
    extend: {
      cursor: {
        pointer: "url(/cursors/pointer.png),pointer",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle at center, var(--gradient-color-stops))",
      },
      keyframes: {
        slide: {
          "0%": {
            opacity: "0",
            y: "16",
          },
          "35%": {
            opacity: "1",
            y: "16",
          },
          "100%": {
            y: "56",
          },
        },
        blink: {
          "0%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        slide: "slide 2.25s ease-out infinite",
        blink: "blink 1s step-start infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
