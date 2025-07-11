---
head:
  title: toolbar
  description: "Flexible, responsive toolbars. Manage density, size and variants for toolbars consistent with your Svelte apps."
title: toolbar
subtitle: toolbar component
cover: "docs/components/toolbar.webp"
section: components
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import ToolbarBase from "$lib/components/docs/toolbar/toolbar-base.svelte";
    import ToolbarBaseCode from "$lib/components/docs/toolbar/toolbar-base.svelte?raw";
    import ToolbardDensity from "$lib/components/docs/toolbar/toolbar-density.svelte";
    import ToolbardDensityCode from "$lib/components/docs/toolbar/toolbar-density.svelte?raw";
    import ToolbardOrientation from "$lib/components/docs/toolbar/toolbar-orientation.svelte";
    import ToolbardOrientationCode from "$lib/components/docs/toolbar/toolbar-orientation.svelte?raw";
    import ToolbardVariant from "$lib/components/docs/toolbar/toolbar-variant.svelte";
    import ToolbardVariantCode from "$lib/components/docs/toolbar/toolbar-variant.svelte?raw";
</script>

The Toolbar component creates a flexible, customizable toolbar, ideal for organizing actions, titles, filters or other navigation content. It is designed to adapt to different contexts thanks to its layout, style and density options.

<Sandbox name="toolbar-sandbox" code={ToolbarBaseCode} presentation>
	{#snippet component()}
		<ToolbarBase/>
	{/snippet}
</Sandbox>

## Examples of toolbar

### Base

A simple example of Toolbar usage with a few elements placed inside. This is the default configuration, with no particular density or custom orientation.

<Sandbox name="toolbar-base-sandbox" code={ToolbarBaseCode}>
	{#snippet component()}
		<ToolbarBase/>
	{/snippet}
</Sandbox>

### Density

Shows how to adjust density (`compact`, `comfortable`, `default`) to manage vertical spacing within the bar. Useful for optimizing the interface according to available space.

<Sandbox name="toolbar-density-sandbox" code={ToolbardDensityCode}>
	{#snippet component()}
		<ToolbardDensity/>
	{/snippet}
</Sandbox>

### Orientation

The toolbar can be displayed horizontally (default) or vertically. This example illustrates the use of the orientation="vertical" option to stack elements from top to bottom.

<Sandbox name="toolbar-orientation-sandbox" code={ToolbardOrientationCode}>
	{#snippet component()}
		<ToolbardOrientation/>
	{/snippet}
</Sandbox>

### Variant

Demonstrates the use of visual variants: **outline**, **text** or **dash** to adapt the style of the bar to different UI contexts.

<Sandbox name="toolbar-variant-sandbox" code={ToolbardVariantCode}>
	{#snippet component()}
		<ToolbardVariant/>
	{/snippet}
</Sandbox>

## API Reference

| props         | type        | description                                                             | default      | type_extend                             |
| ------------- | ----------- | ----------------------------------------------------------------------- | ------------ | --------------------------------------- |
| ref $bindable | HTMLElement | Direct access to DOM element                                            | undefined    |                                         |
| is            | enum        | Defines the HTML tag.                                                   | div          | header \| nav \| div                    |
| classContent  | string      | Adds one or more custom CSS classes to the Appbar wrapper.              | undefined    |                                         |
| dark          | boolean     | Enable dark theme for component.                                        | false        |                                         |
| light         | boolean     | Enable light theme for the component.                                   | false        |                                         |
| color         | string      | Applies a custom color to text or icons.                                | undefined    |                                         |
| background    | string      | Apply a custom background color.                                        | undefined    |                                         |
| density       | enum        | Controls vertical density                                               | `default`    | `compact` \| `comfortable` \| `default` |
| variant       | enum        | Sets the visual style of the Toolbar.                                   | undefined    | `outline` \| `text` \| `dash`           |
| rounded       | string      | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.).                | `md`         |                                         |
| orientation   | enum        | Controls the arrangement of elements in the bar (row or column)         | `horizontal` | `horizontal` \| `vertical`              |
| location      | enum        | Allows the toolbar to be attached to the top or bottom of the container | undefined    | `top` \| `bottom`                       |

## Variables CSS

| variable               | default              | description         |
| ---------------------- | -------------------- | ------------------- |
| `–-toolbar-color`      | `–-kit-on-container` | Text color          |
| `–-toolbar-background` | `–-kit-container`    | Background color    |
| `–-toolbar-radius`     | `0`                  | Toolbar edge radius |
