import createLapikit from 'lapikit';

export default createLapikit({
	breakpoints: {
		devices: {
			desktop: 1536, // 96rem (2xl)
			tablet: 1024, // 64rem (lg)
			mobile: 768 // 48rem (md)
		},
		thresholds: {
			sm: 640,
			md: 768,
			lg: 1024,
			'2xl': 1536,
			'6xl': 2560
		}
	}
});
