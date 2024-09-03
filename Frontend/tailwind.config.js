/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: "#4E545F",
      },
      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;",
      },
      spacing: {
        '75px': '75px',
      },
      width: {
        '1440px': '1440px', // Custom width
      },
      fontSize: {
        '16px': '16px', // Custom font size
        '26px': '26px', // Custom font size
      },
      lineHeight: {
        '7': '1.75rem', // Custom line height
        '36px': '36px', // Custom line height
      },
    },
  },
  plugins: [],
};
