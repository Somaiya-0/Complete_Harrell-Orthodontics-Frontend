/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12233B",       // deep navy -- clinical authority
        breath: "#4F86FB",    // brand blue accent -- "airway/breathing" signature
        breathdark: "#4371D5",// hover/pressed state for the brand blue
        breathlight: "#EDF2FE",
        clay: "#C0693F",      // warm accent for CTAs (Cherry / financing)
        paper: "#F7F5F1",
        mist: "#EDEBE5",      // hairline borders on paper backgrounds
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(18,35,59,0.06)",
        card: "0 16px 32px -16px rgba(18,35,59,0.18)",
        lifted: "0 24px 48px -20px rgba(18,35,59,0.28)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
}

