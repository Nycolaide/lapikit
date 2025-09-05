/**
 * Checks if a value is a plain object (object literal)
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
	return (
		value !== null &&
		typeof value === 'object' &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
}

/**
 * Recursively merges two objects together.
 * Properties from the source object override those from the target object.
 * Nested objects are merged recursively.
 *
 * @param target - The base object
 * @param source - The source object to merge (can be null or undefined)
 * @returns A new object containing the merge of both objects
 *
 * @example
 * ```typescript
 * const obj1 = { primary: { light: 'pink', medium: 'purple' } };
 * const obj2 = { primary: { dark: 'red' } };
 * const result = deepMerge(obj1, obj2);
 * // Result: { primary: { light: 'pink', medium: 'purple', dark: 'red' } }
 *
 * // Works with null/undefined source
 * const result2 = deepMerge(obj1, null);
 * // Result: { primary: { light: 'pink', medium: 'purple' } }
 * ```
 */
export function deepMerge<T extends Record<string, unknown>, U extends Record<string, unknown>>(
	target: T,
	source: U | null | undefined
): T & U {
	// If source is null or undefined, return a copy of target
	if (source == null) {
		return { ...target } as T & U;
	}

	// Create a copy of the target object to avoid mutations
	const result = { ...target } as T & U;

	for (const key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			const sourceValue = source[key];
			const targetValue = result[key as keyof (T & U)];

			// If both values are plain objects, merge them recursively
			if (isPlainObject(targetValue) && isPlainObject(sourceValue)) {
				(result as Record<string, unknown>)[key] = deepMerge(targetValue, sourceValue);
			} else {
				// Otherwise, the source value overrides the target value
				(result as Record<string, unknown>)[key] = sourceValue;
			}
		}
	}

	return result;
}

/**
 * Merges multiple objects together recursively.
 *
 * @param objects - The objects to merge (null and undefined values are ignored)
 * @returns A new object containing the merge of all objects
 *
 * @example
 * ```typescript
 * const result = deepMergeMultiple(
 *   { primary: { light: 'pink' } },
 *   null,
 *   { primary: { dark: 'red' } },
 *   undefined,
 *   { secondary: { light: 'blue' } }
 * );
 * // Result: {
 * //   primary: { light: 'pink', dark: 'red' },
 * //   secondary: { light: 'blue' }
 * // }
 * ```
 */
export function deepMergeMultiple(
	...objects: (Record<string, unknown> | null | undefined)[]
): Record<string, unknown> {
	return objects
		.filter((obj): obj is Record<string, unknown> => obj != null)
		.reduce(
			(acc, obj) => {
				return deepMerge(acc, obj);
			},
			{} as Record<string, unknown>
		);
}
