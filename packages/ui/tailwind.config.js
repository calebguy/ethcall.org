/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				orange: "#e05333",
				background: "#1e1f21",
				yellow: "#ecb366",
				blue: "#4c7bc2",
			},
		},
	},
	plugins: [],
};
