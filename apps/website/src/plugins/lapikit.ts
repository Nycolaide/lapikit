/**
 * Lapikit
 * Library documentation: https://lapikit.dev
 */

// Styles
import 'lapikit/styles';
import 'lapikit/themes';

// Composables
import createLapikit from 'lapikit';

// https://lapikit.dev/docs/getting-started
export default createLapikit({
	theme: {
		defaultTheme: 'light',
		themes: {
			light: {
				colors: {
					service: {
						github: 'oklch(23.166% .0107 242.2)',
						'on-github': 'oklch(97.913% 0 89.88)',
						svelte: '#ff3e00',
						'buy-me-a-coffee': '#FFDD00',
						'on-buy-me-a-coffee': '#000000',
						discord: '#5661ec',
						'on-discord': '#ffffff',
						npm: '#CB3837',
						'on-npm': '#ffffff',
						x: 'oklch(23.166% .0107 242.2)',
						instagram: 'linear-gradient(45deg, #833AB4 0%, #C13584 25%, #F56040 50%, #FCAF45 100%)',
						'on-instagram': '#ffffff'
					}
				}
			},
			dark: {
				colors: {
					service: {
						github: 'oklch(97.913% 0 89.88)',
						'on-github': 'oklch(23.166% .0107 242.2)',
						svelte: '#ff3e00',
						'buy-me-a-coffee': '#FFDD00',
						'on-buy-me-a-coffee': '#000000',
						discord: '#5661ec',
						'on-discord': '#ffffff',
						npm: '#CB3837',
						'on-npm': '#ffffff',
						x: 'oklch(97.913% 0 89.88)',
						instagram: 'linear-gradient(45deg, #833AB4 0%, #C13584 25%, #F56040 50%, #FCAF45 100%)',
						'on-instagram': '#ffffff'
					}
				}
			}
		}
	},
	typography: {
		fonts: {
			default: {
				sans: ['Roboto Variable', 'sans-serif']
			}
		}
	}
});
