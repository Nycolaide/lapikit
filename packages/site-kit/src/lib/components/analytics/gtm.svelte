<script lang="ts">
	let { gtm, gtmID } = $props();
</script>

{#if gtm && gtmID}
	<!-- Google Tag Manager (noscript) -->
	<noscript>
		<iframe
			src={`https://www.googletagmanager.com/ns.html?id=${gtmID}`}
			height="0"
			width="0"
			style="display:none;visibility:hidden"
			title="Google Tag Manager"
		></iframe>
	</noscript>
	<!-- End Google Tag Manager (noscript) -->
{/if}
