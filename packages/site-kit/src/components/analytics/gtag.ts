export function setDefaultConsent() {
	if (typeof window === 'undefined') return;

	window.dataLayer = window.dataLayer || [];
	if (!window.gtag) {
		window.gtag = function gtag() {
			window.dataLayer.push(arguments);
		};
	}

	// Définir le consentement par défaut AVANT de charger les scripts
	window.gtag('consent', 'default', {
		ad_storage: 'denied',
		analytics_storage: 'denied',
		functionality_storage: 'denied',
		ad_user_data: 'denied',
		ad_personalization: 'denied'
	});
}

export function loadGtag(gtaID: string): Promise<void> {
	return new Promise((resolve) => {
		if (typeof window === 'undefined' || typeof document === 'undefined') return;

		if (window.gtag) return resolve();

		const script = document.createElement('script');
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${gtaID}`;
		document.head.appendChild(script);

		script.onload = () => {
			const scriptLayer = document.createElement('script');
			scriptLayer.text = `
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				window.gtag = gtag;
				gtag('js', new Date());
				gtag('config', '${gtaID}');
			`;
			document.head.appendChild(scriptLayer);
			resolve();
		};
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
