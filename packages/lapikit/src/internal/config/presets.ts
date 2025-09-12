import { variables } from './variables.js';
import standardColors from '../core/standard-colors.js';

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
				colors: {
					label: {
						primary: '#000000',
						secondary: standardColors.gray.light,
						tertiary: standardColors.gray2.light,
						quaternary: standardColors.gray3.light
					},
					accent: {
						primary: standardColors.blue.light,
						success: standardColors.green.light,
						warning: standardColors.orange.light,
						destructive: standardColors.red.light,
						info: standardColors.cyan.light
					},
					separator: {
						default: standardColors.gray3.light,
						opaque: standardColors.gray4.light
					},
					state: {
						placeholder: standardColors.gray3.light,
						disabled: standardColors.gray2.light,
						link: standardColors.blue.light,
						highlight: standardColors.gray5.light,
						shadow: '#00000033'
					},
					background: {
						primary: '#FFFFFF',
						secondary: standardColors.gray6.light,
						tertiary: standardColors.gray5.light,
						grouped: {
							primary: standardColors.gray6.light,
							secondary: '#FFFFFF',
							tertiary: standardColors.gray6.light
						}
					}
				},
				variables: variables
			},
			dark: {
				dark: true,
				colors: {
					pink: 'pink',
					label: {
						primary: '#FFFFFF',
						secondary: standardColors.gray2.dark,
						tertiary: standardColors.gray3.dark,
						quaternary: standardColors.gray4.dark
					},
					accent: {
						primary: standardColors.blue.dark,
						success: standardColors.green.dark,
						warning: standardColors.orange.dark,
						destructive: standardColors.red.dark,
						info: standardColors.cyan.dark
					},
					separator: {
						default: standardColors.gray3.dark,
						opaque: standardColors.gray4.dark
					},
					state: {
						placeholder: standardColors.gray3.dark,
						disabled: standardColors.gray4.dark,
						link: standardColors.blue.dark,
						highlight: standardColors.gray5.dark,
						shadow: '#00000066'
					},
					background: {
						primary: '#000000',
						secondary: standardColors.gray6.dark,
						tertiary: standardColors.gray5.dark,
						grouped: {
							primary: standardColors.gray6.dark,
							secondary: standardColors.gray5.dark,
							tertiary: standardColors.gray4.dark
						}
					}
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
