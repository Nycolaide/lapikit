<script lang="ts">
	import { t } from '$lib/i18n';
	import { page } from '$app/state';
	import type { Snippet } from 'svelte';
	import { capitalize } from 'site-kit/actions';
	import { PUBLIC_DEV_MODE } from '$env/static/public';

	// components
	import { Button, Card, Icon, Separator, Toolbar } from 'lapikit/components';
	import ConsentModal from './consent-modal.svelte';

	// assets
	import LapikitLogo from '$lib/images/lapikit.webp?enhanced';
	import { discordUrl, githubUrl, licenceUrl, navigationFooter, npmUrl } from '$lib/config';
	import { base } from '$app/paths';

	let { children, ...rest }: { children?: Snippet } = $props();

	let year: number = new Date().getFullYear();
	let open: boolean = $state(false);
</script>

{#if PUBLIC_DEV_MODE == 'true'}
	<footer {...rest} class="max-sm:mb-[6rem]">
		<div class="align-center flex h-px w-full flex-row items-center text-center">
			<Separator />
			<div class="mx-4 flex items-center gap-2">
				<enhanced:img id="lapikit-logo-icon" src={LapikitLogo} alt="Lapikit logo icon" />
			</div>
			<Separator />
		</div>

		<div class="mx-auto flex w-full max-w-[90rem] flex-col px-4 py-16 sm:px-6 sm:py-10 lg:px-8">
			<div class="grid gap-8 md:grid-cols-[1fr_auto]">
				<div class="grid gap-8 text-sm sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-8 lg:gap-16">
					{#each navigationFooter as { name, link } (name)}
						<ul>
							<li class="mt-4 text-lg font-semibold">{capitalize($t(`navigation.${name}`))}</li>
							{#each link as { key, path, external, custom } (key)}
								{#if !custom}
									<li>
										<Button
											href={path}
											target={external ? '_blank' : '_self'}
											rounded="full"
											variant="text"
										>
											{capitalize($t(`navigation.${key}`))}
										</Button>
									</li>
								{/if}

								{#if custom === 'cookie-consent'}
									<Button onclick={() => (open = true)} rounded="full" variant="text">
										{capitalize($t('common.gdpr.cookie_settings'))}
									</Button>
								{/if}
							{/each}
						</ul>
					{/each}
				</div>

				<Card
					background="service-discord"
					color="service-on-discord"
					class="mt-6 rounded-lg! p-6! text-center! sm:mx-auto sm:max-w-[350px] md:text-start!"
				>
					<p class="text-xl font-semibold">Join our community on Discord</p>
					<p class="my-2 sm:text-lg">News, updates, and discussions await you!</p>
					<div>
						<Button
							href={discordUrl}
							target="_blank"
							size={{ base: 'md', sm: 'lg' }}
							rounded="full"
							class="px-5!"
						>
							Chat with us
							{#snippet append()}
								<Icon size="lg" icon="mgc_chat_1_line" />
							{/snippet}
						</Button>
					</div>
				</Card>
			</div>

			<Toolbar
				class="mt-6"
				classContent="flex-col! md:flex-row! md:justify-between gap-2"
				background="transparent"
			>
				<p>
					Copyright © {year === 2025 ? year : `2025 - ${year}`} Lapikit. -
					<a href={licenceUrl} target="_blank">MIT License</a>
				</p>
				<div class="order-first flex gap-2 md:order-last">
					<Button variant="text" icon href={discordUrl} target="_blank">
						<Icon size="lg" icon="mgc_discord_fill" />
					</Button>
					<Button variant="text" icon href={githubUrl} target="_blank">
						<Icon size="lg" icon="mgc_github_fill" />
					</Button>
					<Button variant="text" icon href={npmUrl} target="_blank">
						<Icon size="lg" icon="mgc_package_2_fill" />
					</Button>
				</div>
			</Toolbar>
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
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	#lapikit-logo-icon {
		width: 2.5rem;
	}

	.secondary {
		color: var(--kit-label-secondary);
	}
</style>
