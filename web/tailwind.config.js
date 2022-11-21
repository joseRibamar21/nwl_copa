/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#038C17",
        primaryBorder: "#64D408",
        textLight:"fff",
        backgroundLight:"#EFF5FF",
        background:"#212121",
        cardBg: "#fff",
        secondary: "rgba(25, 222, 11, 0.1)",
        tertiary: "#D7E7FE",
        greenHighlight: "#64D408",
        typography: "#0A3133",
      },
    },
  },
  plugins: [],
}
