/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        200: "13rem",
      },
      height: {
        200: "13rem",
      },
    },
  },
  plugins: [],
};
