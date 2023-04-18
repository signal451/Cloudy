/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBackground: "rgb(18, 19, 23)",
        darkCard: "rgb(26, 28, 35)",
        darkInput: "rgb(36, 38, 45)",
        grayColor: "#9E9E9E",
        grayDeep: "#686868",
      },
      fontFamily: {
        mono: ["IBM Plex Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
