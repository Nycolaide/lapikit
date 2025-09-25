<script lang="ts">
	import { t } from '$lib/i18n';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { capitalize } from 'site-kit/actions';
	import { PUBLIC_DEV_MODE } from '$env/static/public';

	// components
	import { Button, Icon, Separator } from 'lapikit/components';
	import ConsentModal from './consent-modal.svelte';

	// assets
	import LapikitLogo from '$lib/images/lapikit.webp?enhanced';
	import { discordUrl, githubUrl, licenceUrl, navigationFooter, npmUrl } from '$lib/config';

	let { children, ...rest }: { children?: Snippet } = $props();

	let year: number = new Date().getFullYear();
	let open: boolean = $state(false);
</script>

{#if PUBLIC_DEV_MODE == 'true'}
	<footer {...rest}>
		<div class="align-center flex h-px w-full flex-row items-center text-center">
			<Separator />
			<div class="mx-4 flex items-center gap-2">
				<enhanced:img id="lapikit-logo-icon" src={LapikitLogo} alt="Lapikit logo icon" />
			</div>
			<Separator />
		</div>

		<div
			class="mt-6 grid grid-cols-1 items-center justify-between gap-4 lg:grid-cols-[auto_minmax(100px,_1fr)_auto]"
		>
			<div class="order-first flex justify-center gap-2 lg:order-last">
				<Button variant="text" icon href={discordUrl} target="_blank">
					<Icon icon="mgc_discord_fill" />
				</Button>
				<Button variant="text" icon href={githubUrl} target="_blank">
					<Icon icon="mgc_github_fill" />
				</Button>
				<Button variant="text" icon href={npmUrl} target="_blank">
					<Icon icon="mgc_package_2_fill" />
				</Button>
			</div>
			<div class="order-2 flex justify-center gap-2">
				{#each navigationFooter as { key, path, external } (key)}
					<Button
						href={path}
						target={external && '_blank'}
						active={page.url.pathname === path}
						rounded="full"
						size="sm"
						variant="text"
					>
						{capitalize($t(`navigation.${key}`))}
					</Button>
				{/each}

				<Separator orientation="vertical" />
				<Button href="/terms" rounded="full" size="sm" variant="text">
					{capitalize($t('common.terms_and_privacy'))}
				</Button>
				<Button onclick={() => (open = true)} rounded="full" size="sm" variant="text">
					{capitalize($t('common.gdpr.cookie_settings'))}
				</Button>
			</div>
			<div class="order-last flex justify-center gap-2 lg:order-first">
				<span class="secondary text-sm">
					Published under <a href={licenceUrl} target="_blank">MIT License</a>
				</span>
			</div>
		</div>
		<div class="mb-4 flex justify-center gap-2 text-sm">
			<span class="secondary">
				Copyright © {year === 2025 ? year : `2025 - ${year}`} Lapikit.
				<Icon icon="mgc_heart_fill" color="red" size="sm" />
				{$t('common.hero.by')}
				<a href="https://nycolaide.dev" target="_blank">Nycolaide</a>
			</span>
		</div>
	</footer>
{:else}
	<footer {...rest} class="max-md:mb-[5rem] min-md:mb-[1rem]">
		{@render children?.()}

		<div
			class="mx-4 grid items-center justify-center text-center text-sm sm:flex sm:justify-between"
		>
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
{/if}

<ConsentModal bind:open />

<style>
	#lapikit-logo-icon {
		width: 2.5rem;
	}

	.secondary {
		color: var(--kit-label-secondary);
	}
</style>
