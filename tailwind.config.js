/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "525px",
        "2xl": "1280px",
      },
      colors: {
        primary: "#6c7fd8",
        TB: "#3d4750",
        secondary: "#777",
        "secondary-D": "#9ba5b5",
        "box-border-D": "#494e5d",
        "box-D": "#2d313e",
        body: "#22252f",
      },
    },
  },
  plugins: [],
};
