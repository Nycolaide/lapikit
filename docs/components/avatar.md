---
title: avatar
subtitle: avatar component
introduction: displays a profile image or initials
head:
  title: avatar
  description: "Display profile images, icons or initials in a variety of formats. Perfect for lists, headers or cards."
style:
  cover: "docs/components/avatar.webp"
state:
  section: components
  published: true
github:
  url: /components/avatar.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import AvatarBase from "$lib/components/docs/avatar/avatar-base.svelte";
    import AvatarBaseCode from "$lib/components/docs/avatar/avatar-base.svelte?raw";
    import AvatarDensity from "$lib/components/docs/avatar/avatar-density.svelte";
    import AvatarDensityCode from "$lib/components/docs/avatar/avatar-density.svelte?raw";
    import AvatarSize from "$lib/components/docs/avatar/avatar-size.svelte";
    import AvatarSizeCode from "$lib/components/docs/avatar/avatar-size.svelte?raw";
    import AvatarVariant from "$lib/components/docs/avatar/avatar-variant.svelte";
    import AvatarVariantCode from "$lib/components/docs/avatar/avatar-variant.svelte?raw";
</script>

The Avatar component is used to display images, icons or initials representing a person or object. It is often used in user interfaces to identify users, profiles or entities. Thanks to its many customization options, the Avatar component adapts easily to different styles and contexts.`

<Sandbox name="avatar-sandbox" code={AvatarBaseCode} presentation>
	{#snippet component()}
		<AvatarBase/>
	{/snippet}
</Sandbox>

## Examples of avatar

### Base

This example shows the simple use of the Avatar component with its default settings. Ideal for quick, intuitive integration.

<Sandbox name="avatar-base-sandbox" code={AvatarBaseCode}>
	{#snippet component()}
		<AvatarBase/>
	{/snippet}
</Sandbox>

### Size

The size property defines the size of the Avatar. The available options: `xs`, `sm`, `md`, `lg`, `xl` and `full`, adapt to different design needs.

<Sandbox name="avatar-size-sandbox" code={AvatarSizeCode}>
	{#snippet component()}
		<AvatarSize/>
	{/snippet}
</Sandbox>

### Density

The density property adjusts the density of the Avatar: `compact`, `comfortable` or `default`. This allows you to control the spacing and overall appearance of the component.

<Sandbox name="avatar-density-sandbox" code={AvatarDensityCode}>
	{#snippet component()}
		<AvatarDensity/>
	{/snippet}
</Sandbox>

### Variant

The variant property lets you customize the Avatar's style. The available options: `outline`, `text` and `dash`, offer visual variations adapted to different contexts.

<Sandbox name="avatar-variant-sandbox" code={AvatarVariantCode}>
	{#snippet component()}
		<AvatarVariant/>
	{/snippet}
</Sandbox>

## API Reference

| props         | type        | description                                                  | default   | type_extend                                    |
| ------------- | ----------- | ------------------------------------------------------------ | --------- | ---------------------------------------------- |
| ref $bindable | HTMLElement | Direct access to DOM element                                 | undefined |                                                |
| dark          | boolean     | Enable dark theme for component.                             | false     |                                                |
| light         | boolean     | Enable light theme for the component.                        | false     |                                                |
| color         | string      | Applies a custom color to text or icons.                     | undefined |                                                |
| background    | string      | Apply a custom background color.                             | undefined |                                                |
| density       | enum        | Controls vertical density                                    | `default` | `compact` \| `comfortable` \| `default`        |
| rounded       | string      | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.).     | `md`      |                                                |
| variant       | enum        | Sets the visual style of the avatar.                         | undefined | `outline` \| `text` \| `dash`                  |
| src           | string      | Specifies the URL of the image to be displayed in the Avatar | undefined |                                                |
| size          | enum        | Set Avatar size: xs, sm, md, lg, xl or full.                 | `md`      | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |

## Variables CSS

| variable              | default                      | description        |
| --------------------- | ---------------------------- | ------------------ |
| `–-avatar-color`      | `--kit-label-primary`        | Text color         |
| `–-avatar-background` | `--kit-background-secondary` | Background color   |
| `--avatar-shape`      | `--system-shape-full`        | Avatar edge radius |

Associate Avatars with user [Cards](/docs/components/card) or [Chips](/docs/components/chip) to display roles or status.
