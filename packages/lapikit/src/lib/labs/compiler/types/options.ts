export type LapikitPreprocessOptions = {
	plugins?: string[];
};

export type KitComponentScan = {
	code: string;
	changed: boolean;
	importedComponents: Map<string, string>;
};

export type ComponentInfo = {
	name: string;
	ref: string;
};
