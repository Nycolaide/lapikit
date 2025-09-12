// src/plugins/lapikit.ts
import createLapikit from 'lapikit';

export default createLapikit({
	breakpoints: {
		devices: {
			desktop: 1024,
			tablet: 768,
			mobile: 640
		},
		thresholds: {
			base: 0,
			xs: 448,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			'2xl': 1536,
			'3xl': 1792
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
						primary: '#000000'
					}
				}
			}
		},
		variables: {
			'test-variable': '1rem'
		}
	},
	typography: {
		defaultTypography: 'default',
		fonts: {
			default: {
				serif: ['Merriweather', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif']
			}
		}
	},
	styles: {
		spacing: '0.125rem', // 2px
		shape: {
			sm: '0.125rem'
		}
	}
});
