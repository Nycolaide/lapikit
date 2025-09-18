type AccordionOptions = {
	multiple?: boolean;
	readOnly?: boolean;
};

export function useAccordion({ multiple = false, readOnly = false }: AccordionOptions = {}) {
	// state
	let openIndex: (string | number)[] = $state([10]);

	return {
		get values() {
			return openIndex;
		},
		toggle(id: string | number) {
			if (!readOnly) {
				if (multiple) {
					if (openIndex.includes(id)) {
						openIndex = openIndex.filter((i) => i !== id);
					} else {
						openIndex = [...openIndex, id];
					}
				} else {
					openIndex = openIndex.includes(id) ? [] : [id];
				}
			}
		}
	};
}
