interface Lapikit {
	adapterCSS: string;
	breakpoints: {
		thresholds: {
			[key: string]: number | string;
		};
	};
}

function createLapikit(lapikit: Lapikit) {
	console.log('Creating a new Lapikit instance...');
	console.log('Options loaded:', lapikit);

	// deepMerge
	const breakpointMerged = lapikit?.breakpoints?.thresholds;

	if (breakpointMerged) {
		console.log('Breakpoints found:', breakpointMerged);
	}
}

export default createLapikit;
