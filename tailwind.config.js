/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#252332', 
        secondary: '#DC0044', 
      },
      fontFamily:{
        sans:['Poppins','sans-serif']
      },
      backgroundImage: {
        bbaresthoLogo: "url('/src/assets/icones/b-barestho.svg')",
      },
    },
  },
  plugins: [],
}