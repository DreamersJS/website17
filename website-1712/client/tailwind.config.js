/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        background: "rgb(var(--background))",
        text: "rgb(var(--text))",
      },
      // bg-green-gradient or bg-green-radial
      backgroundImage: {
        'green-gradient': 'linear-gradient(to bottom, #06210c, #177F2E)', // Custom gradient
        'green-radial': 'radial-gradient(circle, #06210c, #177F2E)', // Radial gradient
      },
    },
  },
  plugins: [],
}

