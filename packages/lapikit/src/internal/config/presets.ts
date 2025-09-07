import { variables } from './variables.js';

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
		themes: {
			light: {
				dark: false,
				colors: {
					blue: '#007AFF',
					green: '#34C759',
					red: '#FF3B30',
					yellow: '#FFCC00',
					orange: '#FF9500',
					purple: '#AF52DE',
					pink: '#FF2D55',
					indigo: '#5856D6',
					cyan: '#5AC8FA',
					gray: '#8E8E93',
					'gray-2': '#AEAEB2',
					'gray-3': '#C7C7CC',
					'gray-4': '#D1D1D6',
					'gray-5': '#E5E5EA',
					'gray-6': '#F2F2F7',
					background: '#FFFFFF',
					'secondary-background': '#F2F2F7',
					'tertiary-background': '#EFEFF4',
					label: '#000000',
					'secondary-label': 'rgba(60,60,67,0.6)'
				},
				variables: variables
			},
			dark: {
				dark: true,
				colors: {
					blue: '#0A84FF',
					green: '#30D158',
					red: '#FF453A',
					yellow: '#FFD60A',
					orange: '#FF9F0A',
					purple: '#BF5AF2',
					pink: '#FF375F',
					indigo: '#5E5CE6',
					cyan: '#64D2FF',
					gray: '#8E8E93',
					'gray-2': '#636366',
					'gray-3': '#48484A',
					'gray-4': '#3A3A3C',
					'gray-5': '#2C2C2E',
					'gray-6': '#1C1C1E',
					background: '#000000',
					'secondary-background': '#1C1C1E',
					'tertiary-background': '#2C2C2E',
					label: '#FFFFFF',
					'secondary-label': 'rgba(235,235,245,0.6)'
				},
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
