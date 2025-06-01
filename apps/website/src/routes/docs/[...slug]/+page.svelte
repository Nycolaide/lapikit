<script lang="ts">
	import { TableOfContents } from '$lib/components/index.js';

	let { data } = $props();
</script>

<div class="grid xl:grid-cols-[1fr_220px]">
	<div>
		<data.content />
	</div>
	<aside class="max-xl:none">
		<TableOfContents headings={data.meta.headings} />
	</aside>
</div>
