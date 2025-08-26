export function valueToPx(value: string | number): number {
	if (typeof value === 'number') return value;
	if (typeof value === 'string') {
		if (value.endsWith('rem')) {
			return parseFloat(value) * 16;
		}
		if (value.endsWith('em')) {
			return parseFloat(value) * 16;
		}
		if (value.endsWith('px')) {
			return parseFloat(value);
		}
		return parseFloat(value);
	}
	return 0;
}
