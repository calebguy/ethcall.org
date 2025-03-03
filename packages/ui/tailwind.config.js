/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			bagnard: ["Bagnard", "sans-serif"],
		},
		extend: {
			colors: {
				background: "var(--color-background)",
				primary: "var(--color-primary)",
			},
		},
	},
	plugins: [],
};
