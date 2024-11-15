/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins-Regular", "sans-serif"],
        poppinsSemibold: ["Poppins-SemiBold", "sans-serif"],
        poppinsBold: ["Poppins-Bold", "sans-serif"],
      },
      colors: {
        lightGray: "#dfdfdf",
        charcoalGray: "#20252a",
        vividGreen: "#00B553",
        customRed: "#E9482B",
      }
    },
  },
  plugins: [],
}