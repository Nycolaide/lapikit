import { variables } from './variables.js';
import { colors } from './colors.js';

export const preset = {
	breakpoints: {
		devices: {
			desktop: 1024, //64rem (lg)
			tablet: 768, //48rem (md)
			mobile: 640 //40rem (sm)
		},
		thresholds: {
			base: 0, // 0px
			xs: 448, //28rem
			sm: 640, //40rem
			md: 768, //48rem
			lg: 1024, //64rem
			xl: 1280, //80rem
			'2xl': 1536, //96rem
			'3xl': 1792 //112rem
		}
	},
	theme: {
		defaultTheme: 'light',
		colorScheme: true,
		themes: {
			light: {
				dark: false,
				colors: colors,
				variables: variables
			},
			dark: {
				dark: true,
				colors: colors,
				variables: variables
			}
		}
	},
	typography: {
		defaultTypography: 'default',
		fonts: {
			default: {
				sans: [
					'system-ui',
					'-apple-system',
					'BlinkMacSystemFont',
					'Segoe UI',
					'Roboto',
					'Helvetica Neue',
					'Arial',
					'sans-serif',
					'Apple Color Emoji',
					'Segoe UI Emoji',
					'Segoe UI Symbol'
				],
				mono: [
					'SFMono-Regular',
					'ui-monospace',
					'SF Mono',
					'Menlo',
					'Monaco',
					'Consolas',
					'Liberation Mono',
					'Courier New',
					'monospace'
				],
				serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
			}
		}
	},
	styles: {
		spacing: '0.125rem', // 2px
		shape: {
			sm: '0.125rem', // 2px
			md: '0.25rem', // 4px
			lg: '0.5rem', // 8px
			xl: '0.75rem', // 12px
			'2xl': '1rem', // 16px
			'3xl': '1.5rem', // 24px
			full: '9999px' // 9999px
		},
		dialog: {
			xs: '18.75rem', // 300px
			sm: '25rem', // 400px
			md: '37.5rem', // 600px
			lg: '53.125rem', // 850px
			xl: '75rem' // 1200px
		},
		modal: {
			xs: '18.75rem', // 300px
			sm: '25rem', // 400px
			md: '37.5rem', // 600px
			lg: '53.125rem', // 850px
			xl: '75rem' // 1200px
		},
		animation: {
			'ripple-duration': '0.4s'
		}
	}
};
