import createLapikit from 'lapikit';

export default createLapikit({
	breakpoints: {
		devices: {
			desktop: 1024, // 64rem (lg)
			tablet: 768, // 48rem (md)
			mobile: 640 // 40rem (sm)
		}
	}
});
