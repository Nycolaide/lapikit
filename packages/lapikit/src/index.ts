interface Lapikit {
	adapterCSS: string;
}

function createLapikit(lapikit: Lapikit) {
	console.log('Creating a new Lapikit instance...');
	console.log('Options loaded:', lapikit);
}

export default createLapikit;
