<script lang="ts">
	import { t } from '$lib/i18n';
	import { Btn, Separator } from 'lapikit/components';
	import type { Snippet } from 'svelte';

	let {
		children,
		accessOnRGPD = $bindable(),
		...rest
	}: { children?: Snippet; accessOnRGPD?: boolean } = $props();

	let year = new Date().getFullYear();
</script>

<footer {...rest} class="max-md:mb-[5rem]">
	{@render children?.()}

	<div class="grid items-center justify-center text-center sm:flex sm:justify-between">
		<p>©{year} Lapikit.</p>
		<div class="order-first flex items-center gap-2 sm:order-none">
			<Btn href="https://nycolaide.dev" target="_blank" size="sm" variant="text">Nycolaide</Btn>
			<Separator orientation="vertical" />
			<Btn variant="text" size="sm" onclick={() => (accessOnRGPD = true)}>
				{$t('app.cookie_settings')}
			</Btn>
		</div>
	</div>
</footer>
