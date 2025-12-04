<script lang="ts">
	import {
		PUBLIC_BING_WEBMASTER_TOOLS_ENABLED,
		PUBLIC_BING_WEBMASTER_TOOLS_ID,
		PUBLIC_GOOGLE_ANALYTICS_ENABLED,
		PUBLIC_GOOGLE_ANALYTICS_ID,
		PUBLIC_GOOGLE_TAG_MANAGER_ENABLED,
		PUBLIC_GOOGLE_TAG_MANAGER_ID
	} from '$env/static/public';

	import { t } from '$lib/i18n';
	import { Button, Icon, Modal } from 'lapikit/components';
	import { RGPD } from 'site-kit';
	import { capitalize } from 'site-kit/actions';

	let { open = $bindable() } = $props();

	type Model = {
		open: boolean;
		action: (state: 'accept' | 'refuse') => void;
	};
</script>

<RGPD
	bind:open
	gta={PUBLIC_GOOGLE_ANALYTICS_ENABLED}
	gtaID={PUBLIC_GOOGLE_ANALYTICS_ID}
	gtm={PUBLIC_GOOGLE_TAG_MANAGER_ENABLED}
	gtmID={PUBLIC_GOOGLE_TAG_MANAGER_ID}
	bing={PUBLIC_BING_WEBMASTER_TOOLS_ENABLED}
	bingID={PUBLIC_BING_WEBMASTER_TOOLS_ID}
>
	{#snippet dialog(model: Model)}
		<Modal
			bind:open={model.open}
			size="sm"
			persistent
			aria-labelledby="dialog-consent-mode-title"
			rounded="xl"
		>
			<div class="p-4">
				<div class="flex items-center justify-between">
					<p class="text-lg" id="dialog-consent-mode-title">
						{capitalize($t('common.gdpr.title'))}
					</p>
					<Button
						onclick={() => model.action('refuse')}
						size="sm"
						rounded="full"
						background="background-tertiary"
					>
						{capitalize($t('common.gdpr.button.decline'))}
					</Button>
				</div>

				<div class="mt-4 text-start">
					<p>{capitalize($t('common.gdpr.description'))}</p>
				</div>

				<div class="mt-4 flex items-center justify-end gap-2">
					<Button
						onclick={() => model.action('accept')}
						background="accent-primary"
						color="white"
						rounded="full"
						density="comfortable"
					>
						{capitalize($t('common.gdpr.button.accept'))}
						<Icon icon="mgc_cookie_line" />
					</Button>
				</div>
			</div>
		</Modal>
	{/snippet}
</RGPD>
