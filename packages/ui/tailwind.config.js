/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			mono: ["DiatypeRounded", "monospace"],
		},
		extend: {
			colors: {
				lightBrown: "var(--color-light-brown)",
				darkBrown: "var(--color-dark-brown)",
				green: "var(--color-green)",
				orange: "var(--color-orange)",
			},
		},
	},
	plugins: [],
};
