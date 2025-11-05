<script lang="ts">
	import { Button, Card, Icon } from 'lapikit/components';
	import { formatNumber } from 'site-kit/actions';
	import type { GitHubRepositoryData, NpmPackageData } from '$lib/types/api';
	import type { UrlInternal } from '$lib/types/internal';

	interface Props {
		url: UrlInternal;
		github?: GitHubRepositoryData | null;
		npm?: NpmPackageData | null;
	}

	let { url, github, npm }: Props = $props();
</script>

<div
	class="mx-auto flex w-full max-w-[90rem] flex-col gap-8 px-4 py-16 pt-8! sm:gap-16 sm:px-6 sm:py-24 lg:grid lg:px-8 lg:py-32"
>
	<div class="flex flex-col gap-4 md:flex-row md:items-stretch">
		<div class="flex flex-col gap-4 md:w-1/4">
			<Card
				href={url.npm.package}
				target="_blank"
				background="background-tertiary"
				class="flex flex-1 justify-center"
			>
				<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
					<Icon
						icon="/icons/npm-color.svg"
						size="xl"
						style="--icon-multiplier-size: 16"
						color="red"
						class="no-select"
						alt="NPM Logo"
					/>
					<div>
						<span class="text-highlighted text-xl font-semibold"
							>{formatNumber(npm?.downloads || 0)}</span
						>
						<p class="text-sm">Monthly downloads</p>
					</div>
				</div>
			</Card>

			<Card
				href={url.github.repository}
				target="_blank"
				background="background-tertiary"
				class="flex flex-1 justify-center"
			>
				<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
					<Icon
						icon="mgc_github_line"
						size="xl"
						style="--icon-multiplier-size: 16"
						color="service-github"
					/>
					<div>
						<span class="text-highlighted text-xl font-semibold"
							>{formatNumber(github?.stargazers_count || 0)}</span
						>
						<p class="text-sm">GitHub Stars</p>
					</div>
				</div>
			</Card>
		</div>

		<div class="flex md:w-1/2">
			<Card class="flex flex-1 justify-center" background="background-tertiary">
				<div class="flex h-full flex-col items-center justify-around gap-y-4 p-4 sm:p-6">
					<p class="text-center text-xl font-semibold">
						Open Source and built by developers, for developers
					</p>
					<p class="text-center">
						Lapikit is 100% open source, created and maintained by Nycolaide and a growing community
						of frontend developers. You can contribute on GitHub, report issues, or suggest new
						components.
					</p>
					<p class="text-center">
						Every contribution helps improve the developer experience for the entire Svelte
						community.
					</p>
					<Button
						href={url.github.repository}
						target="_blank"
						rounded="full"
						class="px-4!"
						color="service-on-github"
						background="service-github"
					>
						Contribute to Lapikit on GitHub
						{#snippet append()}
							<Icon icon="mgc_github_line" />
						{/snippet}
					</Button>
				</div>
			</Card>
		</div>

		<div class="flex flex-col gap-4 md:w-1/4">
			<Card
				href={url.social_network.x}
				target="_blank"
				background="background-tertiary"
				class="flex flex-1 justify-center"
			>
				<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
					<Icon
						icon="mgc_social_x_line"
						size="xl"
						style="--icon-multiplier-size: 16"
						color="service-x"
					/>
					<div>
						<span class="text-highlighted text-xl font-semibold">0</span>
						<p class="text-sm">Followers</p>
					</div>
				</div>
			</Card>

			<Card
				href={url.discord.invite}
				target="_blank"
				background="background-tertiary"
				class="flex flex-1 justify-center"
			>
				<div class="grid grid-cols-[auto_1fr] justify-center gap-x-8 gap-y-4 p-4 sm:p-6">
					<Icon
						icon="mgc_discord_fill"
						size="xl"
						style="--icon-multiplier-size: 16"
						color="service-discord"
					/>
					<div>
						<span class="text-highlighted text-xl font-semibold">2</span>
						<p class="text-sm">Members</p>
					</div>
				</div>
			</Card>
		</div>
	</div>
</div>
