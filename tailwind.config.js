import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: [
      {
        "portfolio-light": {
          primary: "#1d4ed8",
          "primary-content": "#eff6ff",
          secondary: "#0f766e",
          "secondary-content": "#ecfeff",
          accent: "#d97706",
          "accent-content": "#fff7ed",
          neutral: "#111827",
          "neutral-content": "#f8fafc",
          "base-100": "#f6f2e8",
          "base-200": "#ede4d3",
          "base-300": "#dfd0b5",
          "base-content": "#1b2434",
          info: "#0284c7",
          "info-content": "#ecfeff",
          success: "#15803d",
          "success-content": "#052e16",
          warning: "#f59e0b",
          "warning-content": "#451a03",
          error: "#dc2626",
          "error-content": "#450a0a",
        },
      },
      {
        "portfolio-dark": {
          primary: "#7dd3fc",
          "primary-content": "#082f49",
          secondary: "#34d399",
          "secondary-content": "#052e2b",
          accent: "#f59e0b",
          "accent-content": "#271302",
          neutral: "#060b16",
          "neutral-content": "#e5eefb",
          "base-100": "#0f1726",
          "base-200": "#182235",
          "base-300": "#26344c",
          "base-content": "#e7edf7",
          info: "#38bdf8",
          "info-content": "#082f49",
          success: "#4ade80",
          "success-content": "#052e16",
          warning: "#f59e0b",
          "warning-content": "#451a03",
          error: "#f87171",
          "error-content": "#450a0a",
        },
      },
    ],
    darkTheme: "portfolio-dark",
    logs: false,
  },
}
