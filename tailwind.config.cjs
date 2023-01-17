const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			xs: '360px',
			...defaultTheme.screens
		},
		extend: {
			dropShadow: {
				'xs': '0 1px 1px rgba(0, 0, 0, 0.7)'
			}
		}
	},
	darkMode: 'class',
	plugins: []
};
