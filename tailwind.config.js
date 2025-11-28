/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./welcome/index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                'ghana-red': '#CE1126',
                'ghana-yellow': '#FCD116',
                'ghana-green': '#006B3F',
                'us-blue': '#3C3B6E',
                'casa-gold': '#D4AF37',
                'casa-dark': '#0F172A',
            },
            animation: {
                marquee: 'marquee 45s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        },
    },
    plugins: [],
}
