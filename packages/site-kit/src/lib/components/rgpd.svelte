<script lang="ts">
	import { onMount } from 'svelte';
	import { getCookie, setCookie } from '$lib/actions/index.js';
	import { updateConsent } from './analytics/gtm.js';
	import { setDefaultConsent as setDefaultConsentGtag } from './analytics/gtag.js';

	// components
	import Analytics from './analytics/gtag.svelte';
	import GoogleTagManager from './analytics/gtm.svelte';

	let { dialog, gta, gtaID, gtm, gtmID, bing, bingID, open = $bindable() } = $props();

	if (gta) setDefaultConsentGtag();

	onMount(() => {
		const cookie = getCookie('_lapikit_consent');
		if (!cookie) {
			open = true;
		} else {
			updateConsent(cookie === 'accept' ? 'accept' : 'refuse');
		}
	});

	function handleSetConsentMode(state: 'accept' | 'refuse') {
		setCookie('_lapikit_consent', state);
		updateConsent(state);
		open = false;
	}

	type Model = {
		open: boolean;
		action: (state: 'accept' | 'refuse') => void;
	};

	let model: Model = {
		get open() {
			return open !== undefined ? open : false;
		},
		set open(value: boolean) {
			open = value;
		},
		action: (state: 'accept' | 'refuse') => handleSetConsentMode(state)
	};
</script>

<svelte:head>
	{#if bing}
		<meta name="msvalidate.01" content={bingID} />
	{/if}
	{#if gtm && gtmID}
		<!-- Google Tag Manager -->
		{@html `<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			window.gtag = gtag;
			// Définir le consentement par défaut
			gtag('consent', 'default', {
				ad_storage: 'denied',
				analytics_storage: 'denied',
				functionality_storage: 'denied',
				ad_user_data: 'denied',
				ad_personalization: 'denied'
			});
			(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
				var f = d.getElementsByTagName(s)[0],
					j = d.createElement(s),
					dl = l != 'dataLayer' ? '&l=' + l : '';
				j.async = true;
				j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, 'script', 'dataLayer', '${gtmID}');
		</script>`}
		<!-- End Google Tag Manager -->
	{/if}
</svelte:head>

<Analytics {gta} {gtaID} />

<GoogleTagManager {gtm} {gtmID} />

{@render dialog?.(model)}
