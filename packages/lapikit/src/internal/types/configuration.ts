export interface DevConfiguration {
	breakpoints?: {
		devices?: {
			[key: string]: number | string;
		};
		thresholds?: {
			[key: string]: number | string;
		};
	};
	theme?: {
		defaultTheme?: string;
		themes?: FragThemes;
	};
	typography?: {
		defaultTypography?: string;
		fonts?: FragTypography;
	};
	styles?: FragStyles;
}

export interface FragThemes {
	[key: string]: {
		dark?: boolean;
		colors?: {
			[key: string]: string;
		};
		variables?: {
			[key: string]: string | number;
		};
	};
}

export interface FragTypography {
	[key: string]: {
		[key: string]: string | string[];
	};
}

export interface FragStyles {
	[key: string]:
		| string
		| number
		| {
				[key: string]: string | number;
		  };
}
