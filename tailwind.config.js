module.exports = {
  content: ["./frontend/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "xs": "128px",
      "sm": "256px",
      "md": "512px",
      "lg": "1200px",
      "xl": "1600px",
    },
    fontSize: {
      "xs-abs": "8px",
      "sm-abs": "16px",
      "md-abs": "32px",
      "lg-abs": "38px",
      "xl-abs": "50px",

      "xs": "0.8vw",
      "sm": "1vw",
      "md": "1.5vw",
      "lg": "2vw",
      "xl": "3vw",
      "2xl": "5vw",
      "3xl": "10vw",
      "4xl": "14vw",
    },
    minWidth: {
      "md": "50%",
    },
    maxWidth: {
      "md": "400px",
    },
    extend: {

    }
  },
  variants: {},
  plugins: [],
};