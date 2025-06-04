/** @type {import('lapikit').Config} */
export default {
	options: {
		minify: false
	},
	theme: {
		colorScheme: 'auto',
		colors: {
			svelte: 'orange',
			neutral: 'purple',
			secondary: { light: '#716b7f', dark: '#bfb5ce' },
			'secondary-container': { light: '#e8def8', dark: '##4a4458' },
			'on-secondary-container': { light: '#322f35', dark: '#e8def8' },
			surface: { light: '#FEF7FF', dark: '#141218' },
			'on-surface': { light: '#1F1D22', dark: '#E6E0E9' },
			'on-surface-variant': { light: '#49454F', dark: '#CAC4D0' },
			'surface-container': { light: '#F3EDF7', dark: '#211F26' }
		}
	},
	styles: {
		font: {
			sans: ['"Roboto Variable"', 'sans-serif'],
			game: ['"Press Start 2P"', 'system-ui']
		}
	}
};
