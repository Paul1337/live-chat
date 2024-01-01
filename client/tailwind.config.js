/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				ubuntu: ['Ubuntu', 'sans-serif'],
			},
		},
		// fontFamily: {
		// 	FiraSans: ['FiraSans', 'sans-serif'],
		// },
	},
	plugins: [],
};
