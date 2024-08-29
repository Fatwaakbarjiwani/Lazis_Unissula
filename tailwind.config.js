/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Montserrat: ["Montserrat", "sans - serif"],
        Madimi: ["Madimi One", "sans-serif"],
      },
      colors: {
        primary: "#206143",
        second: "#E6EAEE",
        thirt: "#B65C60",
        fourth: "#A43338",
      },
      fontSize: {
        y: "40px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-stroke": {
          "-webkit-text-stroke": "1px #A43338",
          color: "white",
        },
        ".text-stroke2": {
          "-webkit-text-stroke": "3px #A43338",
          color: "white",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
