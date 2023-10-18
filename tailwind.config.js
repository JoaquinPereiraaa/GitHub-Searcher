/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "rgb-purple": "rgb(169, 133, 202)",
      },
      boxShadow: {
        green: "4px 6px 4px rgba(30, 255, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
