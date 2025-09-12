<script lang="ts">
	import { t } from '$lib/i18n';
	import { Button, Icon, Separator } from 'lapikit/components';
	import type { Snippet } from 'svelte';
	import ConsentModal from './consent-modal.svelte';
	import { capitalize } from 'site-kit/actions';

	let { children, ...rest }: { children?: Snippet } = $props();

	let year = new Date().getFullYear();
	let open: boolean = $state(false);
</script>

<footer {...rest} class="max-md:mb-[5rem] min-md:mb-[1rem]">
	{@render children?.()}

	<div class="mx-4 grid items-center justify-center text-center text-sm sm:flex sm:justify-between">
		<p>©{year} Lapikit.</p>
		<div class="order-first flex items-center gap-2 sm:order-none">
			<span class="text-sm">
				{capitalize($t('common.hero.made_with'))}
				<Icon icon="mgc_heart_fill" color="red" />
				{$t('common.hero.by')}
				<a href="https://nycolaide.dev" target="_blank">Nycolaide</a>
			</span>

			<Separator orientation="vertical" />

			<Button variant="text" size="sm" href="/terms">
				{capitalize($t('common.terms_and_privacy'))}
			</Button>

			<Button variant="text" size="sm" onclick={() => (open = true)}>
				{capitalize($t('common.gdpr.cookie_settings'))}
			</Button>
		</div>
	</div>
</footer>

<ConsentModal bind:open />
