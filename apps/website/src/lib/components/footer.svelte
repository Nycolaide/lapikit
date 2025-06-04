<script lang="ts">
	import { t } from '$lib/i18n';
	import { Button, Separator } from 'lapikit/components';
	import type { Snippet } from 'svelte';
	import ConsentModal from './consent-modal.svelte';

	let { children, ...rest }: { children?: Snippet } = $props();

	let year = new Date().getFullYear();
	let open: boolean = $state(false);
</script>

<footer {...rest} class="max-md:mb-[5rem]">
	{@render children?.()}

	<div class="grid items-center justify-center text-center sm:flex sm:justify-between">
		<p>©{year} Lapikit.</p>
		<div class="order-first flex items-center gap-2 sm:order-none">
			<Button href="https://nycolaide.dev" target="_blank" size="sm" variant="text"
				>Nycolaide</Button
			>
			<Separator orientation="vertical" />
			<Button variant="text" size="sm" onclick={() => (open = true)}>
				{$t('app.cookie_settings')}
			</Button>
		</div>
	</div>
</footer>

<ConsentModal bind:open />
