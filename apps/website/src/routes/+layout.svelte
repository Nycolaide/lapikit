<script lang="ts">
	// icons
	import 'mingcute_icon/font/Mingcute.css';
	// fonts
	import '@fontsource/roboto';
	import '@fontsource/press-start-2p';
	// css
	import '../styles/app.css';

	import { App } from 'lapikit/components';

	let { children } = $props();
</script>

<App>
	{@render children()}
</App>
