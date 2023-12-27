/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        darkBlue: "#31C3BD",
        lightBlue: "#65E9E4",
        darkYellow: "#F2B137",
        lightYellow: "#FFC860",
        darkNavy: "#1A2A33",
        semiDarkNavy: "#1F3641",
        darkSilver: "#A8BFC9",
        lightSilver: "#DBE8ED",
      },
    },
  },
  plugins: [],
};
