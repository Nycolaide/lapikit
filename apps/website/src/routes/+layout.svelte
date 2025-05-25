<script lang="ts">
	// icons
	import 'mingcute_icon/font/Mingcute.css';
	// fonts
	import '@fontsource/roboto';
	import '@fontsource/press-start-2p';
	// css
	import '$lib/styles/app.css';

	import { App } from 'lapikit/components';
	import Footer from '$lib/components/footer.svelte';
	import ConsentModal from '$lib/components/consent-modal.svelte';

	let { children } = $props();
	let open: boolean = $state(false);
</script>

<svelte:head>
	<title>lapikit</title>
</svelte:head>

<App>
	{@render children()}

	<Footer bind:accessOnRGPD={open} />

	<ConsentModal bind:open />
</App>
