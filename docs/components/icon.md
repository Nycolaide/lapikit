---
title: icon
subtitle: icon component
introduction: displays a configurable SVG icon
head:
  title: icon
  description: "Insert icons easily with Lapikit. Manage sizes, colors, states and seamless integration into your components."
style:
  cover: "docs/components/icon.webp"
state:
  section: components
  published: true
github:
  url: /components/icon.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import IconBase from "$lib/components/docs/icon/icon-base.svelte";
    import IconBaseCode from "$lib/components/docs/icon/icon-base.svelte?raw";
    import IconColor from "$lib/components/docs/icon/icon-color.svelte";
    import IconColorCode from "$lib/components/docs/icon/icon-color.svelte?raw";
    import IconState from "$lib/components/docs/icon/icon-state.svelte";
    import IconStateCode from "$lib/components/docs/icon/icon-state.svelte?raw";
    import IconType from "$lib/components/docs/icon/icon-type.svelte";
    import IconTypeCode from "$lib/components/docs/icon/icon-type.svelte?raw";
    import IconSize from "$lib/components/docs/icon/icon-size.svelte";
    import IconSizeCode from "$lib/components/docs/icon/icon-size.svelte?raw";
    import IconDisabled from "$lib/components/docs/icon/icon-disabled.svelte";
    import IconDisabledCode from "$lib/components/docs/icon/icon-disabled.svelte?raw";
</script>

The Icon component is used to display icons in the interface, with fine customization: color, size, visual status (info, success, etc.), and rounded styles. It can be easily integrated into all other Lapikit components, or used on its own as a decorative or interactive element.

<Sandbox name="icon-sandbox" code={IconBaseCode} presentation>
	{#snippet component()}
		<IconBase/>
	{/snippet}
</Sandbox>

## Examples of icon

### Base

Minimal example of an Icon with default configuration. Perfect for displaying a simple icon with a neutral style.

<Sandbox name="icon-base-sandbox" code={IconBaseCode}>
	{#snippet component()}
		<IconBase/>
	{/snippet}
</Sandbox>

### Color

Allows you to change the icon's color via prop color. Useful for adapting an icon to its context (e.g. theme, visual feedback...).

<Sandbox name="icon-base-sandbox" code={IconColorCode}>
	{#snippet component()}
		<IconColor/>
	{/snippet}
</Sandbox>

### State

Displays different visual variants depending on the status (**error**, **info**, **warning**, **success**). These props automatically add a style corresponding to the desired visual state.

<Sandbox name="icon-state-sandbox" code={IconStateCode}>
	{#snippet component()}
		<IconState/>
	{/snippet}
</Sandbox>

### Type

Shows the two possible types of HTML elements (`<i>` or `<div>`) according to prop is, useful for adapting to certain frameworks or accessibility constraints.

<Sandbox name="icon-type-sandbox" code={IconTypeCode}>
	{#snippet component()}
		<IconType/>
	{/snippet}
</Sandbox>

### Size

Demonstration of prop size to adjust icon size. It can be a simple string (e.g. `md`) or a CSS object for a completely customized size.

<Sandbox name="icon-size-sandbox" code={IconSizeCode}>
	{#snippet component()}
		<IconSize/>
	{/snippet}
</Sandbox>

### Disabled

Example of an icon rendered inactive, visually dimmed and non-interactive. Ideal for indicating that an action is not available.

<Sandbox name="icon-disabled-sandbox" code={IconDisabledCode}>
	{#snippet component()}
		<IconDisabled/>
	{/snippet}
</Sandbox>

## API Reference

| props         | type                   | description                                             | default   | type_extend                                    |
| ------------- | ---------------------- | ------------------------------------------------------- | --------- | ---------------------------------------------- |
| ref $bindable | HTMLElement            | Direct access to DOM element                            | undefined |                                                |
| is            | enum                   | HTML tag used to render icon (i, div, etc.)             | `i`       | `i` \| `div`                                   |
| dark          | boolean                | Enable dark theme for component.                        | false     |                                                |
| light         | boolean                | Enable light theme for the component.                   | false     |                                                |
| color         | string                 | Applies a custom color to text or icons.                | undefined |                                                |
| background    | string                 | Apply a custom background color.                        | undefined |                                                |
| disabled      | boolean                | Makes the icon inactive and visually dimmed             | false     |                                                |
| warning       | boolean                | Apply a visual style of warning.                        | false     |                                                |
| info          | boolean                | Applies an informative style.                           | false     |                                                |
| success       | boolean                | Apply a success style (confirmation, validation, etc.). | false     |                                                |
| error         | boolean                | Apply a visual style of error.                          | false     |
| size          | enum \| `{enum: enum}` | Set Icon size: xs, sm, md, lg, xl or full.              | `md`      | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |

## Variables CSS

| variable       | default            | description |
| -------------- | ------------------ | ----------- |
| `–-icon-color` | `–-kit-on-surface` | Icon color  |

Add Icons to your [Buttons](/docs/components/button), [Cards](/docs/components/card) or [Chips](/docs/components/chip) to visually guide your users.
