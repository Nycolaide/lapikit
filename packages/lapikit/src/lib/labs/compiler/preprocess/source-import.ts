/**
 * componentName generates the component name used in imports
 * @param shortName The short name of the component
 * @returns The component name with "Kit" prefix and the first letter capitalized
 */
export function componentName(shortName: string): string {
	return 'Kit' + shortName.charAt(0).toUpperCase() + shortName.slice(1);
}

export const lapikitImportsRef = 'lapikit/labs/components';
