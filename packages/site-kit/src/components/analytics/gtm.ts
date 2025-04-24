export function loadGTM(gtmID: string) {
	if (typeof window === 'undefined') return;
	if (document.getElementById('gtm-script')) return;

	window.dataLayer = window.dataLayer || [];
	window.gtag = (...args: unknown[]) => window.dataLayer.push(args);

	const script = document.createElement('script');
	script.id = 'gtm-script';
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmID}`;
	document.head.appendChild(script);

	window.gtag('js', new Date());
}

export function updateConsent(state: 'accept' | 'refuse') {
	if (typeof window.gtag !== 'function') return;

	window.gtag('consent', 'update', {
		ad_storage: state === 'accept' ? 'granted' : 'denied',
		analytics_storage: state === 'accept' ? 'granted' : 'denied',
		functionality_storage: state === 'accept' ? 'granted' : 'denied'
	});
}
