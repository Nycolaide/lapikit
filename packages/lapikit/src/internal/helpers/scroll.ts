import { BROWSER } from 'esm-env';

export function disabledScroll(state: boolean) {
	if (BROWSER) {
		document.body.style.overflow = state ? 'hidden' : '';
	}
}
