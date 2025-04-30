const breakpoints: {
	mobileBreakpoint: string;
	tabletBreakpoint: string;
	laptopBreakpoint: string;
	thresholds: {
		[key: string]: string | number;
	};
} = {
	mobileBreakpoint: 'sm',
	tabletBreakpoint: 'md',
	laptopBreakpoint: 'xl',
	thresholds: {
		none: 0, // 0px
		xs: '28rem', //448px
		sm: '40rem', //640px
		md: '48rem', //768px
		lg: '64rem', //1024px
		xl: '80rem', //1280px
		'2xl': '96rem', //1536px
		'3xl': '112rem' //1792px
	}
};

export const devices = () => {
	let css = ``;
	const list = {
		mobile: breakpoints.mobileBreakpoint,
		tablet: breakpoints.tabletBreakpoint,
		laptop: breakpoints.laptopBreakpoint
	};

	for (const [key, value] of Object.entries(list)) {
		const breakpointValue = breakpoints.thresholds[value];
		const breakpointValueMax =
			key !== 'laptop'
				? breakpoints.thresholds[
						key === 'mobile' ? list.tablet : key == 'tablet' ? list.laptop : ''
					]
				: undefined;

		css += `.device-${key}, .only-on-${key} {\n`;
		css += `display: none;\n`;
		css += `}\n`;

		css += `@media screen and (min-width: ${typeof breakpointValue === 'number' ? breakpointValue + 'px' : breakpointValue}) {\n`;
		css += `.device-${key} {\n`;
		css += `display: inherit !important;\n`;
		css += `}\n`;
		css += `}\n`;

		css += `@media screen and (min-width: ${typeof breakpointValue === 'number' ? breakpointValue + 'px' : breakpointValue}) ${breakpointValueMax ? `and (max-width: ${typeof breakpointValueMax === 'number' ? breakpointValueMax + 'px' : breakpointValueMax})` : ''}{\n`;
		css += `.only-on-${key} {\n`;
		css += `display: inherit !important;\n`;
		css += `}\n`;
		css += `}\n`;
	}

	return css;
};
