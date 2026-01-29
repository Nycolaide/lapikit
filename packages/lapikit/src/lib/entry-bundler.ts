import { liliCore } from '$lib/labs/compiler/preprocess/index.js';
import type { LapikitPreprocessOptions } from '$lib/labs/compiler/types/options.js';

function lapikitPreprocess(options?: LapikitPreprocessOptions) {
	return liliCore(options);
}

export { lapikitPreprocess };
