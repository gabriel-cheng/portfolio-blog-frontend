/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
          maxWidth: {
              "2700": "168.75rem",
              "247": "13rem",
              "320px": "16rem"
          },
          width: {
              "500px": "31.25rem"
          },
          colors: {
              "background": "#343A40",
              "afterBackground": "#71717A",
              "lightGrey": "#494E53",
              "newOrange": "#FF036D",
              "secondOrange": "#FB553B",
              "loginBgColor1": "#770597",
              "loginBgColor2": "#AC3BFF",
              "loginTxtColor": "#9BCAEA",
              "popupGreenBackground": "#B5EACC",
              "popupGreenBorder": "#05A55B",
              "popupRedBackground": "#FFE3E0",
              "popupRedBorder": "#FC3930",
              "modalBackground": "#0000006b",
          },
          zIndex: {
              '2': '2'
          },
          boxShadow: {
              'default': '0 0 8px'
          }
      },
    },
    plugins: [],
  }
