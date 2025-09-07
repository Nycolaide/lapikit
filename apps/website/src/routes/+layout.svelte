<script lang="ts">
	// css
	import '../styles/app.css';

	// //plugins
	import '../plugins/lapikit.ts';

	// icons
	import 'mingcute_icon/font/Mingcute.css';
	// fonts
	import '@fontsource/roboto';
	import '@fontsource/press-start-2p';

	import { App } from 'lapikit/components';

	let { children } = $props();
</script>

<App>
	{@render children()}
</App>
