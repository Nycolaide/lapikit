export const parserValues = (value: string | number | Array<string | number>) => {
	if (typeof value === 'number') return `${value}px`;
	if (Array.isArray(value)) return value.join(', ');
	return value;
};
