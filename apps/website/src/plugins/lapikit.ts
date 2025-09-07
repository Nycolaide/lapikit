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
		defaultTheme: 'light'
	},
	typography: {
		fonts: {
			default: {
				sans: ['Roboto Variable', 'sans-serif'],
				game: ['Press Start 2P', 'system-ui']
			}
		}
	}
});
