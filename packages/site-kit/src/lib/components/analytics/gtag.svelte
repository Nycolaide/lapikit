<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { loadGtag, sendPageView } from './gtag.js';
	let { gta, gtaID } = $props();

	let gtagReady = $state(false);

	loadGtag(gtaID).then(() => {
		if (gta) {
			gtagReady = true;
			sendPageView(window.location.pathname, document.title);
		}
	});

	afterNavigate(() => {
		if (gta) {
			if (gtagReady) {
				sendPageView(window.location.pathname, document.title);
			}
		}
	});
</script>
