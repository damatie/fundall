module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-gray': '#FCFBFC',
        'fundall-green': '#4CE895',
        'dark': '#30443C'
      },
      height: {
        'h86': '86px',
      },
      width: {
        'w93': '93px',
      },
      borderRadius: {
        'p-img': ' 20px'
      }
    },
  },
  plugins: [],
}
