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
      "lg-abs": "40px",
      "xl-abs": "48px",

      "xs": ".5rem",
      "sm": ".75rem",
      "md": "1rem",
      "lg": "1.25rem",
      "xl": "1.5rem",
      "2xl": "2rem",
      "3xl": "4rem",
    },
    extend: {
      colors: {
        "primary": "#2392a1",
      },
    }
  },
  variants: {},
  plugins: [],
};