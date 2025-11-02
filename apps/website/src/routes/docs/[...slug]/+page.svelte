<script lang="ts">
	import { capitalize } from 'site-kit/actions';

	let { data } = $props();

	$effect(() => {
		console.log('Page data:', data);
	});
</script>

<svelte:head>
	<title>{capitalize(data.page.meta.head.title)} • Lapikit</title>
	<meta name="description" content={data.page.meta.head.description} />
</svelte:head>

<div class="grid pb-6 pl-4 pr-4 pt-12 md:pl-0 xl:grid-cols-[1fr_220px]">
	<div>
		<div class="markdown mx-auto w-full min-w-0 md:max-w-[760px]">
			<data.page.content />
		</div>
	</div>
	<aside class="max-xl:hidden">Aside</aside>
</div>
