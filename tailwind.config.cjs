/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#201E1F",
        accent: "#FF4000",
      },
    },
  },
  plugins: [],
};

module.exports = config;
