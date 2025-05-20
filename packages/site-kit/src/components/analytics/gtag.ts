export function loadGtag(gtaID: string): Promise<void> {
	return new Promise((resolve) => {
		if (typeof window === 'undefined' || typeof document === 'undefined') return;

		if (window.gtag) return resolve();

		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${gtaID}`;
		script.onload = () => {
			window.dataLayer = window.dataLayer || [];
			window.gtag = function (...args) {
				window.dataLayer.push(args);
			};
			window.gtag('js', new Date());
			window.gtag('config', gtaID);
			resolve();
		};
		document.head.appendChild(script);
	});
}

export function sendPageView(path: string, title: string) {
	if (typeof window.gtag !== 'function') return;
	window.gtag('event', 'page_view', {
		page_path: path,
		page_title: title,
		page_location: window.location.href
	});
}

export function updateConsent(state: 'accept' | 'refuse') {
	if (typeof window.gtag !== 'function') return;

	window.gtag('consent', 'update', {
		ad_storage: state === 'accept' ? 'granted' : 'denied',
		analytics_storage: state === 'accept' ? 'granted' : 'denied',
		functionality_storage: state === 'accept' ? 'granted' : 'denied'
	});
}
