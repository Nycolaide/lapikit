<script lang="ts">
	import { Appbar } from 'lapikit/components';
	import type { GlobalProps } from './types';

	let { url = '' }: GlobalProps = $props();
</script>

<Appbar
	background="yellow"
	class="sticky top-0 z-100 md:top-[1rem] md:mr-auto md:ml-auto md:w-[95vw]"
	rounded="xl"
>
	{url}
</Appbar>
