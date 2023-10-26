/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        "ss": ["0.50rem",  {
          lineHeight: "0"
        }]
      },
      zIndex: {
        '0': 0,
        '10': 10,
        '20': 20,
        // ...
      },
    },
  },
  plugins: [
  ],
}
