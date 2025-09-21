<script lang="ts">
	import { t } from '$lib/i18n';
	import { Icon, Spacer, Toolbar } from 'lapikit/components';
	import { capitalize, formatNumber } from 'site-kit/actions';

	let { data } = $props();

	//states
	let lastPublish = $state('');

	$effect(() => {
		if (data?.npm) {
			lastPublish = new Intl.DateTimeFormat('en-US', {
				dateStyle: 'short',
				timeStyle: 'short'
			}).format(new Date(data.npm.lastPublished));
		}
	});
</script>

<Toolbar
	classContent="mt-[13px]"
	background="accent-success"
	color="white"
	rounded="xl"
	density="compact"
>
	<Spacer />
	<div class="flex items-center gap-4 text-center text-sm">
		<span class="flex items-center gap-1">
			<Icon icon="mgc_package_2_line" />
			v{data?.npm?.version}
		</span>

		<span class="flex items-center gap-1">
			<Icon icon="mgc_star_line" />
			{data?.github?.stargazers_count || 0}
			{capitalize($t('common.github.stars'))}
		</span>

		<span class="flex items-center gap-1">
			<Icon icon="mgc_git_pull_request_line" />
			{data?.github?.open_issues_count || 0}
			{capitalize($t('common.github.issues'))}
		</span>

		<span class="flex items-center gap-1">
			<Icon icon="mgc_download_line" />
			{formatNumber(data?.npm?.downloads || 0)}
			{capitalize($t('common.github.downloads'))}
		</span>

		<span class="flex items-center gap-1">
			<Icon icon="mgc_time_line" />
			{capitalize($t('common.github.last_published'))}
			{lastPublish}
		</span>
	</div>
	<Spacer />
</Toolbar>
