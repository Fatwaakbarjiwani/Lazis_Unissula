/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        Montserrat: ["Montserrat", "sans - serif"],
        Madimi: ["Madimi One", "sans-serif"],
      },
      colors: {
        // primary: "#206143",
        primary: "#69C53E",
        second: "#E6EAEE",
        thirt: "#B65C60",
        fourth: "#A43338",
      },
      fontSize: {
        y: "40px",
      },
      screens: {
        xs: "370px",
        as: "240px",
        bs: "380px",
        cs: "490px",
        ds: "1200px",
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
          "-webkit-text-stroke": "1/2px #A43338",
          color: "white",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
    // Add typography plugin for HTML content rendering
    function ({ addUtilities }) {
      const typographyUtilities = {
        ".prose": {
          "max-width": "none",
          color: "inherit",
        },
        ".prose p": {
          "margin-top": "1.25em",
          "margin-bottom": "1.25em",
        },
        ".prose ul": {
          "list-style-type": "disc",
          "margin-top": "1.25em",
          "margin-bottom": "1.25em",
          "padding-left": "1.625em",
        },
        ".prose ol": {
          "list-style-type": "decimal",
          "margin-top": "1.25em",
          "margin-bottom": "1.25em",
          "padding-left": "1.625em",
        },
        ".prose li": {
          "margin-top": "0.5em",
          "margin-bottom": "0.5em",
        },
        ".prose strong": {
          "font-weight": "600",
        },
        ".prose-sm": {
          "font-size": "0.875rem",
          "line-height": "1.7142857",
        },
      };
      addUtilities(typographyUtilities);
    },
  ],
};
