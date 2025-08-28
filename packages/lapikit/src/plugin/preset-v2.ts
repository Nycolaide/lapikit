export const preset = {
	breakpoints: {
		devices: {
			desktop: 1024, //64rem (lg)
			tablet: 768, //48rem (md)
			mobile: 375 //28rem (sm)
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
					primary: '#ff3e00',
					secondary: '#ff3e00',
					accent: '#ff3e00',
					neutral: '#ff3e00',
					'base-100': '#ff3e00',
					'base-200': '#ff3e00',
					'base-300': '#ff3e00'
				}
			},
			dark: {
				dark: true,
				colors: {
					primary: '#15ff00ff',
					secondary: '#15ff00ff',
					accent: '#15ff00ff',
					neutral: '#15ff00ff',
					'base-100': '#15ff00ff',
					'base-200': '#15ff00ff  ',
					'base-300': '#15ff00ff'
				}
			}
		}
	}
};
