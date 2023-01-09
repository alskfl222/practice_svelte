const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      xs: "360px",
      ...defaultTheme.screens,
    },
    extend: {}
  },
  plugins: []
};