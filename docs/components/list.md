---
head:
  title: list
  description: "List component for displaying interactive elements with color, size, navigation and event management in Svelte"
title: list
subtitle: list component
section: components
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import ListBase from "$lib/components/docs/list/list-base.svelte";
    import ListBaseCode from "$lib/components/docs/list/list-base.svelte?raw";
    import ListActive from "$lib/components/docs/list/list-active.svelte";
    import ListActiveCode from "$lib/components/docs/list/list-active.svelte?raw";
    import ListDensity from "$lib/components/docs/list/list-density.svelte";
    import ListDensityCode from "$lib/components/docs/list/list-density.svelte?raw";
    import ListDisabled from "$lib/components/docs/list/list-disabled.svelte";
    import ListDisabledCode from "$lib/components/docs/list/list-disabled.svelte?raw";
    import ListNav from "$lib/components/docs/list/list-nav.svelte";
    import ListNavCode from "$lib/components/docs/list/list-nav.svelte?raw";
    import ListSize from "$lib/components/docs/list/list-size.svelte";
    import ListSizeCode from "$lib/components/docs/list/list-size.svelte?raw";
    import ListVariant from "$lib/components/docs/list/list-variant.svelte";
    import ListVariantCode from "$lib/components/docs/list/list-variant.svelte?raw";
    import ListSnippet from "$lib/components/docs/list/list-snippet.svelte";
    import ListSnippetCode from "$lib/components/docs/list/list-snippet.svelte?raw";
</script>

The List component displays a set of vertically organized elements. It's a flexible container that can be used for menus, navigation lists or action blocks within an interface. It can be customized according to different themes, visual variants, sizes and densities.

Each ListItem child can contain additional elements (prepend, append) and be individually styled.

<Sandbox name="list-sandbox" code={ListBaseCode} presentation>
	{#snippet component()}
		<ListBase/>
	{/snippet}
</Sandbox>

## Examples of list

### Base

The basic example shows a simple list with no particular configuration. It uses the default size and style for a neutral presentation.

<Sandbox name="list-base-sandbox" code={ListBaseCode}>
	{#snippet component()}
		<ListBase/>
	{/snippet}
</Sandbox>

### Active

Demonstrates how to put one or more elements in an active state to reflect a current selection or navigation.

<Sandbox name="list-active-sandbox" code={ListActiveCode}>
	{#snippet component()}
		<ListActive/>
	{/snippet}
</Sandbox>

### Density

Shows the different densities available (**compact**, **comfortable**, **default**), which influence the vertical spacing between items.

<Sandbox name="list-density-sandbox" code={ListDensityCode}>
	{#snippet component()}
		<ListDensity/>
	{/snippet}
</Sandbox>

### Disabled

Displays disabled elements, indicating that they are not interactive. Useful for indicating that an option is temporarily unavailable.

<Sandbox name="list-disabled-sandbox" code={ListDisabledCode}>
	{#snippet component()}
		<ListDisabled/>
	{/snippet}
</Sandbox>

### Nav

Enables specific rendering for lists used as navigation (**nav**). This automatically adjusts the style to be more consistent in a menu bar or side panel.

<Sandbox name="list-size-sandbox" code={ListNavCode}>
	{#snippet component()}
		<ListNav/>
	{/snippet}
</Sandbox>

### Size

Shows the different sizes applicable to the list (**xs** to **full**). This allows the component to be adapted to various UI contexts (sidebar, modal, etc.).

<Sandbox name="list-nav-sandbox" code={ListSizeCode}>
	{#snippet component()}
		<ListSize/>
	{/snippet}
</Sandbox>

### Variant

Shows visual variants (**filled**, **text**, **outline**) to adapt the overall appearance of the list to graphic needs.

<Sandbox name="list-variant-sandbox" code={ListVariantCode}>
	{#snippet component()}
		<ListVariant/>
	{/snippet}
</Sandbox>

### Snippet

Enables you to compose each _ListItem_ with additional elements such as icons, badges or any other content via the prepend and append slots.

<Sandbox name="list-snippet-sandbox" code={ListSnippetCode}>
	{#snippet component()}
		<ListSnippet/>
	{/snippet}
</Sandbox>

## API Reference

**List**

| props         | type                   | description                                    | default   | type_extend                                    |
| ------------- | ---------------------- | ---------------------------------------------- | --------- | ---------------------------------------------- |
| ref $bindable | HTMLElement            | Direct access to DOM element                   | undefined |                                                |
| is            | enum                   | Makes the component `<nav>` or `<div >`.       | `div`     | `nav` \| `div`                                 |
| nav           | boolean                | Enable specific rendering for navigation lists | false     |                                                |
| dark          | boolean                | Enable dark theme for component.               | false     |                                                |
| light         | boolean                | Enable light theme for the component.          | false     |                                                |
| color         | string                 | Applies a custom color to text or icons.       | undefined |                                                |
| background    | string                 | Apply a custom background color.               | undefined |                                                |
| density       | enum                   | Controls vertical density for elements         | `default` | `compact` \| `comfortable` \| `default`        |
| rounded       | string                 | Container edge radius                          | `md`      |                                                |
| variant       | enum                   | Sets the visual style of the List.             | `filled`  | `outline` \| `text` \| `filled`                |
| size          | enum \| `{enum: enum}` | Defines the global size of the list            | `md`      | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |

**ListItem**

| props         | type        | description                                              | default   | type_extend              |
| ------------- | ----------- | -------------------------------------------------------- | --------- | ------------------------ |
| ref $bindable | HTMLElement | Direct access to DOM element                             | undefined |                          |
| is            | enum        | Makes the component `<a>` or `<button>` or `div`.        | `div`     | `button` \| `a` \| `div` |
| href          | string      | Add path or url                                          | undefined |                          |
| dark          | boolean     | Enable dark theme for component.                         | false     |                          |
| light         | boolean     | Enable light theme for the component.                    | false     |                          |
| color         | string      | Applies a custom color to text or icons.                 | undefined |                          |
| background    | string      | Apply a custom background color.                         | undefined |                          |
| rounded       | string      | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.). | `md`      |                          |
| active        | boolean     | Displays active status                                   | false     |                          |
| disabled      | boolean     | Deactivates the ListItem, preventing any interaction.    | false     |                          |
| noRipple      | boolean     | Deactivates ripple effect                                | false     |                          |
| append        | Snippet     | Content displayed after the main content                 | undefined |                          |
| prepend       | Snippet     | Content displayed before main content                    | undefined |                          |

## Variables CSS

| variable            | default              | description      |
| ------------------- | -------------------- | ---------------- |
| `–-list-color`      | `–-kit-on-container` | Text color       |
| `–-list-background` | `–-kit-container`    | Background color |
| `–-list-radius`     | `--kit-radius-md`    | List edge radius |
