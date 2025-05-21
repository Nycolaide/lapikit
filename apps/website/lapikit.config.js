/** @type {import('lapikit').Config} */
export default {
	options: {
		minify: true
	},
	theme: {
		colorScheme: 'auto',
		colors: {
			svelte: 'orange',
			neutral: 'purple',
			surface: { light: '#FEF7FF', dark: '#141218' },
			'on-surface': { light: '#1F1D22', dark: '#E6E0E9' },
			'on-surface-variant': { light: '#49454F', dark: '#CAC4D0' },
			'surface-container': { light: '#F3EDF7', dark: '#211F26' }
		}
	},
	styles: {
		font: {
			sans: ['Roboto Variable', 'sans-serif']
		}
	}
};
