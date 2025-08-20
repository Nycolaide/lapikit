<script lang="ts" module>
	import { img, blockquote, table } from '$lib/components/markdown';
	// eslint-disable-next-line no-import-assign
	export { img, blockquote, table };
</script>

<script lang="ts">
	import Head from '$lib/components/head.svelte';
	import { t } from '$lib/i18n';
	import { capitalize } from 'site-kit/actions';
	import { Icon, Separator } from 'lapikit/components';
	import {
		discordUrl,
		githubDiscussionsUrl,
		githubEditPageUrl,
		githubIssuesUrl
	} from '$lib/config';
	let props = $props();
</script>

<Head
	title={props?.head?.title && capitalize(props.head.title)}
	description={props?.head?.description && capitalize(props.head.description)}
/>

{#if props?.subtitle}
	<h1 class="title">{capitalize(props?.subtitle)}</h1>
{/if}
{#if props?.title}
	<p class="subtitle">{capitalize(props?.title)}</p>
{/if}
{#if props?.description}
	<p class="description">{capitalize(props?.description)}</p>
{/if}

{@render props?.children?.()}

<Separator class="my-8" />

<div class="grid grid-cols-1 gap-4 text-sm opacity-70 md:grid-cols-[1fr_max-content]">
	<div>
		<p class="mt-0!">
			<Icon icon="mgc_question_line" size="xs" />
			{capitalize($t(`docs.github.have-a-question`))}
			<a href={githubDiscussionsUrl} target="_blank">GitHub</a>
			{$t(`common.or`)}
			<a href={discordUrl} target="_blank">{capitalize($t(`docs.github.discord-server`))}</a>
		</p>
		<p class="mt-0!">
			<Icon icon="mgc_bug_line" size="xs" />
			{capitalize($t(`docs.github.see-a-bug`))}
			<a
				href={props.github?.issues ? `${githubIssuesUrl}?${props.github.issues}` : githubIssuesUrl}
				target="_blank"
			>
				{capitalize($t(`docs.github.report-an-issue`))}
			</a>
		</p>
	</div>
	<div class="md:text-right">
		{#if props.github?.url}
			<p class="mt-0!">
				<Icon icon="mgc_pencil_line" size="xs" />
				<a href={`${githubEditPageUrl}${props.github.url}`} target="_blank">
					{capitalize($t(`docs.github.view-source`))}
				</a>
			</p>
		{/if}
	</div>
</div>

<style>
	h1.title {
		color: color-mix(in oklab, var(--kit-on-base) 40%, transparent);
		font-weight: var(--font-weight-semibold);
		font-size: var(--text-xl);
		line-height: var(--tw-leading, var(--text-5xl--line-height)) !important;
	}

	p.subtitle {
		font-weight: var(--font-weight-semibold);
		font-size: var(--text-5xl);
		line-height: var(--tw-leading, var(--text-5xl--line-height)) !important;
	}

	p.description {
		margin-top: calc(var(--kit-spacing) * 6) !important;
		font-size: 21px;
		line-height: calc(var(--kit-spacing) * 14) !important;
		font-weight: var(--font-weight-semibold);
		text-wrap: balance;
		color: color-mix(in oklab, var(--kit-on-base) 70%, transparent);
	}
</style>
