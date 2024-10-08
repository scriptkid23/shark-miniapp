/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ['"Inter"'],
      interSemiBold: ["Inter-SemiBold"],
      rubik: ["Rubik"],
      rubikBold: ["Rubik-Bold"],
      syneTactile: ["SyneTactile"],
      chakrapetch: ["ChakraPetch"],
      
    },
    extend: {},
  },
  darkMode: "selector",
  plugins: [nextui()],
};
