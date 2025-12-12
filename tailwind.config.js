/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./views/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx",
        "./index.tsx",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: '#FF8C42', // Vibrant Orange
                secondary: '#4ECDC4', // Sky Blue
                background: '#FFF9EC', // Cream
                accent: {
                    pink: '#FF99C8',
                    mint: '#D4F0F0',
                },
                // Keeping some existing colors if needed, but overriding main ones
            },
            fontFamily: {
                sans: ['Nunito', 'Quicksand', 'sans-serif'],
                heading: ['"Fredoka One"', '"Baloo 2"', 'cursive'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem', // For that squircle look
                'squircle': '30px',
            },
            boxShadow: {
                'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
                'button': '0 4px 0 0 rgba(0,0,0,0.1)', // For 3D effect
                'button-active': '0 0 0 0 rgba(0,0,0,0.1)',
            },
        },
    },
    plugins: [],
}
