export function disabledScroll(state: boolean) {
	if (typeof window !== "undefined" && typeof document !== "undefined") {
		document.body.style.overflow = state ? 'hidden' : '';
	}
}
