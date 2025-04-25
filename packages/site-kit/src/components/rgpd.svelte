<script lang="ts">
	import { onMount } from 'svelte';
	import { getCookie, setCookie } from '../actions/index.js';
	import { loadGTM, updateConsent } from './analytics/gtm.js';

	// components
	import Analytics from './analytics/gtag.svelte';

	let { gta, gtaID, gtm, gtmID, bing, bingID, open = $bindable(), ...rest } = $props();

	onMount(() => {
		const cookie = getCookie('consent');
		if (!cookie) {
			open = true;
		} else {
			updateConsent(cookie === 'accept' ? 'accept' : 'refuse');
			if (cookie === 'accept' && gtm) loadGTM(gtmID);
		}
	});

	function handleSetConsentMode(state: 'accept' | 'refuse') {
		setCookie('consent', state);
		updateConsent(state);
		if (state === 'accept' && gtm) loadGTM(gtmID);
		open = false;
	}
</script>

<svelte:head>
	{#if bing}
		<meta name="msvalidate.01" content={bingID} />
	{/if}
</svelte:head>

<Analytics {gta} {gtaID} />

<div {...rest} style:display={!open ? 'none' : 'block'}>
	rgpd modal
	<div>
		<button onclick={() => handleSetConsentMode('refuse')}>refuse</button>
		<button onclick={() => handleSetConsentMode('accept')}>accept</button>
	</div>
</div>
