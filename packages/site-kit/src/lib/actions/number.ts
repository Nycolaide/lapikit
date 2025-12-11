export function formatNumber(
	value: number,
	options: {
		precision?: number;
		locale?: string;
		customSuffixes?: { value: number; suffix: string }[];
		forceDecimals?: boolean;
	} = {}
): string {
	const { precision = 1, locale = 'en-US', customSuffixes, forceDecimals = false } = options;

	if (value === 0) return '0';
	if (value < 0) return '-' + formatNumber(Math.abs(value), options);

	const suffixes = customSuffixes || [
		{ value: 1e12, suffix: 'T' },
		{ value: 1e9, suffix: 'B' },
		{ value: 1e6, suffix: 'M' },
		{ value: 1e3, suffix: 'k' }
	];

	for (const { value: threshold, suffix } of suffixes) {
		if (value >= threshold) {
			const formatted = value / threshold;

			if (!forceDecimals && formatted % 1 === 0) {
				return formatted.toLocaleString(locale) + suffix;
			}

			return (
				formatted.toLocaleString(locale, {
					minimumFractionDigits: forceDecimals ? precision : 0,
					maximumFractionDigits: precision
				}) + suffix
			);
		}
	}

	return value.toLocaleString(locale);
}
