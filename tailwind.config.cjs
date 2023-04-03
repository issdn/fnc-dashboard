/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#201E1F",
        accent: "#FF4000",
      },
      keyframes: {
        "pulse-800": {
          from: {
            backgroundColor: "#262626",
          },
          to: {
            backgroundColor: "#3f3f46",
          },
        },
        "pulse-700": {
          from: {
            backgroundColor: "#3f3f46",
          },
          to: {
            backgroundColor: "#52525b",
          },
        },
        scaleY: {
          "0%": {
            transform: "scaleY(0)",
          },
          "100%": {
            transform: "scaleY(1)",
          },
        },
        slideIn: {
          from: {
            opacity: "0",
            transform: "translateY(-100%)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "pulse-800": "pulse-800 2s ease-in-out infinite alternate",
        "pulse-700": "pulse-700 2s ease-in-out infinite alternate",
        scaleY: "scaleY 100ms ease-out",
        slideIn: "slideIn 100ms ease-in-out",
      },
    },
    fontFamily: {
      mono: ["Roboto Mono", "monospace"],
    },
  },
  plugins: [],
};

module.exports = config;
