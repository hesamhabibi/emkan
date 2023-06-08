/** @type {import('tailwindcss').Config} */

const { colors } = require('./tailwind-configs/colors');
const font = require('./tailwind-configs/fonts');
const { screens } = require('./tailwind-configs/screens');

module.exports = {

  content: ["./views/**/*.btml"],
  theme: {
    extend: {
      colors,
      fontFamily: font.family,
      screens,
    }
  },
  plugins: [],
}
