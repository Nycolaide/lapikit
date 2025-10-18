<script lang="ts">
	import { t } from '$lib/i18n';
	import { capitalize } from 'site-kit/actions';

	import { Button, Dropdown, Icon, List, ListItem } from 'lapikit/components';
	import { useTheme } from 'lapikit/actions';
	import { theme } from 'lapikit/stores';

	let { app, icon, ...rest }: { app?: boolean; icon?: boolean; class?: string } = $props();

	// states
	let ref = $state(null);
</script>

{#if icon}
	<Button
		icon
		onclick={() => useTheme($theme === 'light' ? 'dark' : 'light')}
		density={app ? 'comfortable' : 'default'}
		variant={app ? 'filled' : 'text'}
		aria-label={capitalize($t('navigation.theme_toggle'))}
		{...rest}
	>
		{#if $theme !== 'light'}
			<Icon icon="mgc_sun_line" />
		{:else}
			<Icon icon="mgc_moon_line" />
		{/if}
	</Button>
{:else}
	<Dropdown closeOnClick {...rest}>
		{#snippet activator(model)}
			<Button bind:ref onclick={() => model.toggle(ref)} rounded="full">
				{#snippet prepend()}
					<Icon
						color={$theme !== 'light' ? 'oklch(86.9% 0.022 252.894)' : 'oklch(90.5% 0.182 98.111)'}
						icon={$theme !== 'light' ? 'mgc_moon_fill' : 'mgc_sun_fill'}
					/>
				{/snippet}
				{#if $theme !== 'light'}
					Dark theme
				{:else}
					Light theme
				{/if}
				<Icon icon={model.open ? 'mgc_up_fill' : 'mgc_down_fill'} />
			</Button>
		{/snippet}
		<List nav density="compact">
			<ListItem onclick={() => useTheme('dark')} active={$theme === 'dark'}>
				{#snippet append()}
					<Icon color="oklch(86.9% 0.022 252.894)" icon="mgc_moon_fill" />
				{/snippet}
				Dark theme
			</ListItem>
			<ListItem onclick={() => useTheme('light')} active={$theme === 'light'}>
				{#snippet append()}
					<Icon color="oklch(90.5% 0.182 98.111)" icon="mgc_sun_fill" />
				{/snippet}
				Light theme
			</ListItem>
		</List>
	</Dropdown>
{/if}
