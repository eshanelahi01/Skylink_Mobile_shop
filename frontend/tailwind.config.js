/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#120f0a",
        panel: "#ffffff",
        graphite: "#f1e8dc",
        mist: "#2e241b",
        steel: "#3d3024",
        accent: "#b77a1f",
        glow: "#f0d5a5",
        bronze: "#8c5812",
        ember: "#fff9f0"
      },
      fontFamily: {
        sans: ["Manrope", "Segoe UI", "system-ui", "sans-serif"],
        serif: ["Cormorant Garamond", "Georgia", "serif"]
      },
      boxShadow: {
        premium: "0 18px 42px rgba(80, 55, 18, 0.08)",
        glass: "0 12px 28px rgba(183, 122, 31, 0.12)",
        halo: "0 0 0 1px rgba(183, 122, 31, 0.12), 0 20px 52px rgba(183, 122, 31, 0.14)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at top, rgba(183,122,31,0.10), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0))",
        aurora: "radial-gradient(circle at 15% 18%, rgba(183,122,31,0.12), transparent 28%), radial-gradient(circle at 84% 8%, rgba(240,213,165,0.44), transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.98), rgba(251,245,236,0.98))"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { opacity: "0.35", transform: "translateX(-10%)" },
          "50%": { opacity: "0.72", transform: "translateX(10%)" },
          "100%": { opacity: "0.35", transform: "translateX(-10%)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 9s ease-in-out infinite"
      }
    }
  },
  plugins: []
};


