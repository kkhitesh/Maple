/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // brand: "#F97316",
        brand: "#F95738",

        dark: "#082846",
        mid: "#F4D35E",
        light: "#FFFFFF",
      },
      fontFamily: {
        Montez: ["Montez", "cursive"],
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [],
};

// brand: "#F95738",
