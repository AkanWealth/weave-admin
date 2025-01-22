import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      rubikRegular: ["Rubik_Regular"],
      rubikMedium: ["Rubik_Medium"],
      rubikBold: ["Rubik_Bold"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "base-white": "#FFFFFF",
        "base-black": "#111111",
        "base-secondary": "#e8e8e8",
        secondary: "#777",
        green: "#165c26",
        "weave-primary": "#4aa0a4",
        "weave-secondary": "#f4b847",
        "weave-success": "#28a745",
        "weave-warning": "#ffa500",
        "weave-error": "#e74c3c",
        "weave-accent": "#96e6a8",
        "weave-info": "#6eb3b6",
        "weave-light": "#eaf6ec",
        "weave-dark": "#29585a",
        "weave-blank": "#f5fdf6",
        "weave-blank-deep": "#EDF6F6",
      },
    },
  },
  plugins: [],
} satisfies Config;
