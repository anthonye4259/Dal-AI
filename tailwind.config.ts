import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0A0A",
                foreground: "#FAFAFA",
                surface: "#1F1F1F",
                border: "#2A2A2A",
                primary: {
                    DEFAULT: "#7ED957", // Mobile App Lime Green
                    foreground: "#000000",
                },
                secondary: {
                    DEFAULT: "#1F1F1F",
                    foreground: "#FAFAFA",
                },
                accent: {
                    DEFAULT: "#6DD5C3", // Mobile App Teal/Accent
                    foreground: "#000000",
                },
                text: {
                    secondary: "#A1A1AA",
                    muted: "#71717A",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
export default config;
