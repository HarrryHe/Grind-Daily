/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin")

const CustomStyle = plugin(function({addUtilities}){
  addUtilities({
    ".rotate-y-180": {
      transform : "rotateY(180deg)"
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d"
    },
    ".perspective-1000":{
      perspective: "1000px"
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    }


  })
})
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", 
  ],
  theme: {
    extend: {
      keyframes: {
        shuffle: {
          '0%': { transform: 'translateX(0) rotate(0)' },
          '25%': { transform: 'translateX(-10px) rotate(-5deg)' },
          '50%': { transform: 'translateX(10px) rotate(5deg)' },
          '75%': { transform: 'translateX(-10px) rotate(-5deg)' },
          '100%': { transform: 'translateX(0) rotate(0)' },
        },
      },
      animation: {
        shuffle: 'shuffle 0.5s ease-in-out',
      },
    },
  },
  plugins: [CustomStyle],
}

