import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0031ff",

          secondary: "#00810c",

          accent: "#008700",

          neutral: "#190611",

          "base-100": "#f6ffff",

          info: "#0092e3",

          success: "#009400",

          warning: "#ff9500",

          error: "#ff2b56",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },

  plugins: [require("daisyui")],
};
export default config;
