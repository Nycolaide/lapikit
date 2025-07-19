---
head:
  title: appbar
  description: "Create a responsive application bar with Appbar. Density, sizes, position: everything is designed for Svelte and your modern UI."
title: appbar
subtitle: appbar component
introduction: fixed top bar with actions or navigation
cover: "docs/components/appbar.webp"
section: components
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import AppbarBase from "$lib/components/docs/appbar/appbar-base.svelte";
    import AppbarBaseCode from "$lib/components/docs/appbar/appbar-base.svelte?raw";
    import AppbarDensity from "$lib/components/docs/appbar/appbar-density.svelte";
    import AppbarDensityCode from "$lib/components/docs/appbar/appbar-density.svelte?raw";
</script>

The Appbar is an essential component for structuring an application's header. It provides a dedicated space for displaying elements such as titles, icons, buttons or menus. Thanks to its many customization options, the Appbar integrates perfectly into a variety of designs, from minimalist to complex.

<Sandbox name="appbar-sandbox" code={AppbarBaseCode} presentation>
	{#snippet component()}
		<AppbarBase/>
	{/snippet}
</Sandbox>

## Examples of app bar

### Base

The basic example illustrates an Appbar with its default settings. This simple starting point allows you to quickly understand how to use the component in an application.

<Sandbox name="appbar-base-sandbox" code={AppbarBaseCode}>
	{#snippet component()}
		<AppbarBase/>
	{/snippet}
</Sandbox>

### Density

The density property lets you control the Appbar's appearance by adjusting its height and spacing. The available options: `compact`, `comfortable` and `default`, meet different design and ergonomic needs.

<Sandbox name="appbar-density-sandbox" code={AppbarDensityCode}>
	{#snippet component()}
		<AppbarDensity/>
	{/snippet}
</Sandbox>

## API Reference

| props         | type        | description                                                | default   | type_extend                             |
| ------------- | ----------- | ---------------------------------------------------------- | --------- | --------------------------------------- |
| ref $bindable | HTMLElement | Direct access to DOM element                               | undefined |                                         |
| is            | enum        | Defines the HTML tag.                                      | div       | header \| nav \| div                    |
| classContent  | string      | Adds one or more custom CSS classes to the Appbar wrapper. | undefined |                                         |
| dark          | boolean     | Enable dark theme for component.                           | false     |                                         |
| light         | boolean     | Enable light theme for the component.                      | false     |                                         |
| color         | string      | Applies a custom color to text or icons.                   | undefined |                                         |
| background    | string      | Apply a custom background color.                           | undefined |                                         |
| density       | enum        | Controls vertical density                                  | `default` | `compact` \| `comfortable` \| `default` |
| rounded       | string      | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.).   | `md`      |                                         |

## Variables CSS

| variable                   | default             | description                               |
| -------------------------- | ------------------- | ----------------------------------------- |
| `–-appbar-color`           | `–-kit-on-surface`  | Text color                                |
| `–-appbar-background`      | `–-kit-surface`     | Background color                          |
| `–-appbar-radius`          | `0`                 | Appbar edge radius                        |
| `–-appbar-padding-wrapper` | `–-kit-spacing * 4` | Spacing between Appbar parent and content |

An effective Appbar goes well with [Dropdown](/docs/components/dropdown) for menus and [Avatars](/docs/components/avatar) for identification.
