---
head:
  title: separator
  description: 'Create elegant dividers with Lapikit. Customize density, size and style to structure your Svelte components.'
title: separator
subtitle: separator component
section: components
keywords:
  - divider
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import SeparatorBase from "$lib/components/docs/separator/separator-base.svelte";
    import SeparatorBaseCode from "$lib/components/docs/separator/separator-base.svelte?raw";
    import SeparatorOrientation from "$lib/components/docs/separator/separator-orientation.svelte";
    import SeparatorOrientationCode from "$lib/components/docs/separator/separator-orientation.svelte?raw";
    import SeparatorColor from "$lib/components/docs/separator/separator-color.svelte";
    import SeparatorColorCode from "$lib/components/docs/separator/separator-color.svelte?raw";
    import SeparatorInset from "$lib/components/docs/separator/separator-inset.svelte";
    import SeparatorInsetCode from "$lib/components/docs/separator/separator-inset.svelte?raw";
    import SeparatorOpacity from "$lib/components/docs/separator/separator-opacity.svelte";
    import SeparatorOpacityCode from "$lib/components/docs/separator/separator-opacity.svelte?raw";
    import SeparatorSize from "$lib/components/docs/separator/separator-size.svelte";
    import SeparatorSizeCode from "$lib/components/docs/separator/separator-size.svelte?raw";
</script>

Displays a simple dividing line, customizable in orientation, color, thickness and position.
Ideal for visually structuring sections of an interface.

> [!INFO]
> The divider is purely decorative. It has no specific role or accessibility, but can be styled according to the context of use.

<Sandbox name="separator-sandbox" code={SeparatorBaseCode} presentation>
	{#snippet component()}
		<SeparatorBase/>
	{/snippet}
</Sandbox>

## Examples of separator

### Base

Minimal use of component with default values. Displays a standard horizontal line.

<Sandbox name="separator-base-sandbox" code={SeparatorBaseCode}>
	{#snippet component()}
		<SeparatorBase/>
	{/snippet}
</Sandbox>

### Orientation

Allows you to display a vertical separator by setting the orientation. Useful in column layouts or sidebars.

<Sandbox name="separator-orientation-sandbox" code={SeparatorOrientationCode}>
	{#snippet component()}
		<SeparatorOrientation/>
	{/snippet}
</Sandbox>

### Color

Customize the color of the separator using the color prop. You can use a color name, a CSS variable or a hexadecimal code.

<Sandbox name="separator-color-sandbox" code={SeparatorColorCode}>
	{#snippet component()}
		<SeparatorColor/>
	{/snippet}
</Sandbox>

### Inset

Adds a horizontal indent (left/right) when the separator is horizontal. Ideal for preventing it from touching the edges of a container.

<Sandbox name="separator-inset-sandbox" code={SeparatorInsetCode}>
	{#snippet component()}
		<SeparatorInset/>
	{/snippet}
</Sandbox>

### Opacity

Shows how to play with transparency via CSS classes or in combination with prop color. Useful for softening visual separation.

<Sandbox name="separator-inset-sandbox" code={SeparatorOpacityCode}>
	{#snippet component()}
		<SeparatorOpacity/>
	{/snippet}
</Sandbox>

### Size

Controls the thickness of the separator via prop thickness. Perfect for accentuating or softening the demarcation depending on use.

<Sandbox name="separator-size-sandbox" code={SeparatorSize}>
	{#snippet component()}
		<SeparatorSize/>
	{/snippet}
</Sandbox>

## API Reference

| property      | type        | description                                                | default   | type_extend                |
| ------------- | ----------- | ---------------------------------------------------------- | --------- | -------------------------- |
| ref $bindable | HTMLElement | Direct access to DOM element                               | undefined |                            |
| is            | enum        | Makes the component `<hr>` or `<div>`.                     | `hr`      | `hr` \| `div`              |
| dark          | boolean     | Enable dark theme for component.                           | false     |                            |
| light         | boolean     | Enable light theme for the component.                      | false     |                            |
| color         | string      | Applies a custom color of separator.                       | undefined |                            |
| inset         | boolean     | Applies a horizontal indentation for horizontal separators | false     |                            |
| thickness     | string      | Checks separator thickness                                 | undefined |                            |
| orientation   | enum        | Defines separator orientation                              | undefined | `horizontal` \| `vertical` |

## Variables CSS

| variable              | default       | description          |
| --------------------- | ------------- | -------------------- |
| `–-separator-color`   | `–-kit-scrim` | Color of separator   |
| `–-separator-opacity` | `0.12`        | Opacity of separator |
