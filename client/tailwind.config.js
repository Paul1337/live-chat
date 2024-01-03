/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                ubuntu: ['Ubuntu', 'sans-serif'],
                jost: ['Jost', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
