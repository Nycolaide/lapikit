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
	import { Button, Modal, Separator } from 'lapikit/components';
	import { RGPD } from 'site-kit';

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
		<Modal bind:open={model.open} size="sm" persistent>
			<div class="flex items-center justify-between">
				<p>{$t('rgpd.title')}</p>
				<Button onclick={() => model.action('refuse')}>{$t('rgpd.decline')}</Button>
			</div>
			<Separator />
			<div class="mt-4 text-center">
				<p>{$t('rgpd.text')}</p>
			</div>
			<Separator />
			<div class="mt-4 flex items-center justify-end gap-2">
				<Button onclick={() => model.action('accept')}>{$t('rgpd.accept')}</Button>
			</div>
		</Modal>
	{/snippet}
</RGPD>
