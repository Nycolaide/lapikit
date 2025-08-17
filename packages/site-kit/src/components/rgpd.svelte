<script lang="ts">
	import { onMount } from 'svelte';
	import { getCookie, setCookie } from '../actions/index.js';
	import { loadGTM, updateConsent } from './analytics/gtm.js';

	// components
	import Analytics from './analytics/gtag.svelte';

	let { dialog, gta, gtaID, gtm, gtmID, bing, bingID, open = $bindable() } = $props();

	onMount(() => {
		const cookie = getCookie('_lapikit_consent');
		if (!cookie) {
			open = true;
		} else {
			updateConsent(cookie === 'accept' ? 'accept' : 'refuse');
			if (cookie === 'accept' && gtm) loadGTM(gtmID);
		}
	});

	function handleSetConsentMode(state: 'accept' | 'refuse') {
		setCookie('_lapikit_consent', state);
		updateConsent(state);
		if (state === 'accept' && gtm) loadGTM(gtmID);
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
</svelte:head>

<Analytics {gta} {gtaID} />

{@render dialog?.(model)}
