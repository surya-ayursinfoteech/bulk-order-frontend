/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#111827",
          foreground: "#FFFFFF"
        },
        accent: {
          DEFAULT: "#0EA5E9",
          foreground: "#F0F9FF"
        }
      },
      boxShadow: {
        card: "0 10px 25px -10px rgba(0,0,0,0.15)"
      },
      borderRadius: {
        xl2: "1rem"
      }
    },
  },
  plugins: [],
};
