export const setUnit = (value: string | number) => {
	if (typeof value === 'number') return `${value}px`;
	if (typeof value === 'string') {
		const cleaned = value.trim();
		const isOnlyNumericLike = /^[\d.,]+$/.test(cleaned);
		if (isOnlyNumericLike) return `${value}px`;
	}
	return value;
};
