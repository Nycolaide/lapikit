---
title: chip
subtitle: chip component
introduction: small visual or interactive elements (tags, statuses, actions)
head:
  title: chip
  description: "Small, practical UI elements for filters, tags or status. Supports colors, states, events and variants."
style:
  cover: "docs/components/chip.webp"
state:
  section: components
  published: true
github:
  url: /components/chip.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import ChipBase from "$lib/components/docs/chip/chip-base.svelte";
    import ChipBaseCode from "$lib/components/docs/chip/chip-base.svelte?raw";
    import ChipClosable from "$lib/components/docs/chip/chip-closable.svelte";
    import ChipClosableCode from "$lib/components/docs/chip/chip-closable.svelte?raw";
    import ChipColor from "$lib/components/docs/chip/chip-color.svelte";
    import ChipColorCode from "$lib/components/docs/chip/chip-color.svelte?raw";
    import ChipComposable from "$lib/components/docs/chip/chip-composable.svelte";
    import ChipComposableCode from "$lib/components/docs/chip/chip-composable.svelte?raw";
    import ChipDensity from "$lib/components/docs/chip/chip-density.svelte";
    import ChipDensityCode from "$lib/components/docs/chip/chip-density.svelte?raw";
    import ChipDisabled from "$lib/components/docs/chip/chip-disabled.svelte";
    import ChipDisabledCode from "$lib/components/docs/chip/chip-disabled.svelte?raw";
    import ChipEvent from "$lib/components/docs/chip/chip-event.svelte";
    import ChipEventCode from "$lib/components/docs/chip/chip-event.svelte?raw";
    import ChipLoading from "$lib/components/docs/chip/chip-loading.svelte";
    import ChipLoadingCode from "$lib/components/docs/chip/chip-loading.svelte?raw";
    import ChipSize from "$lib/components/docs/chip/chip-size.svelte";
    import ChipSizeCode from "$lib/components/docs/chip/chip-size.svelte?raw";
    import ChipSnippet from "$lib/components/docs/chip/chip-snippet.svelte";
    import ChipSnippetCode from "$lib/components/docs/chip/chip-snippet.svelte?raw";
    import ChipState from "$lib/components/docs/chip/chip-state.svelte";
    import ChipStateCode from "$lib/components/docs/chip/chip-state.svelte?raw";
    import ChipVariant from "$lib/components/docs/chip/chip-variant.svelte";
    import ChipVariantCode from "$lib/components/docs/chip/chip-variant.svelte?raw";
</script>

The Chip component displays small interactive labels, perfect for representing status, categories, filters or actions. Compact, stylable and highly flexible, it can be clicked, disabled, loaded, closed or enriched via slots.
It supports different variants, states, densities and sizes, to suit all UI contexts. It can be used alone, in groups, or as the basis for a tag or filter system.

<Sandbox name="chip-sandbox" code={ChipBaseCode} presentation>
	{#snippet component()}
		<ChipBase/>
	{/snippet}
</Sandbox>

## Examples of chip

### Base

A simple, non-interactive chip, perfect for static display.

<Sandbox name="chip-base-sandbox" code={ChipBaseCode}>
	{#snippet component()}
		<ChipBase/>
	{/snippet}
</Sandbox>

### Closable

Adds a close icon to dynamically remove the chip. Useful for filters or modifiable tags.

<Sandbox name="chip-closable-sandbox" code={ChipClosableCode}>
	{#snippet component()}
		<ChipClosable/>
	{/snippet}
</Sandbox>

### Color

Customize the color of the chip's text and/or background. Ideal for visually highlighting certain elements.

<Sandbox name="chip-color-sandbox" code={ChipColorCode}>
	{#snippet component()}
		<ChipColor/>
	{/snippet}
</Sandbox>

### Composable

Shows how to use slots (`prepend`, `append`, `close`) to inject customized content such as icons or rich text.

<Sandbox name="chip-composable-sandbox" code={ChipComposableCode}>
	{#snippet component()}
		<ChipComposable/>
	{/snippet}
</Sandbox>

### Density

Controls vertical density: `compact`, `comfortable` or `default`. Handy for adapting to the overall density of the interface.

<Sandbox name="card-density-sandbox" code={ChipDensityCode}>
	{#snippet component()}
		<ChipDensity/>
	{/snippet}
</Sandbox>

### Disabled

Displays a deactivated, non-interactive, visually faded chip.

<Sandbox name="chip-disabled-sandbox" code={ChipDisabledCode}>
	{#snippet component()}
		<ChipDisabled/>
	{/snippet}
</Sandbox>

### Event

Demonstrates event management `(e.g. click)` to trigger an action from a chip.

<Sandbox name="chip-event-sandbox" code={ChipEventCode}>
	{#snippet component()}
		<ChipEvent/>
	{/snippet}
</Sandbox>

### Loading

Displays a loading status, blocking interactions during processing. Customize content with snippet load.

<Sandbox name="chip-loading-sandbox" code={ChipLoadingCode}>
	{#snippet component()}
		<ChipLoading/>
	{/snippet}
</Sandbox>

### Size

Shows different chip sizes, fixed or responsive via an object.

<Sandbox name="chip-size-sandbox" code={ChipSizeCode}>
	{#snippet component()}
		<ChipSize/>
	{/snippet}
</Sandbox>

### Snippet

Details advanced snippets (`prepend`, `append`, `close`, `load`) for creating complex chips.

<Sandbox name="chip-snippet-sandbox" code={ChipSnippetCode}>
	{#snippet component()}
		<ChipSnippet/>
	{/snippet}
</Sandbox>

### State

Applies a predefined status style: **info**, **warning**, **error**, or **success**.

<Sandbox name="chip-state-sandbox" code={ChipStateCode}>
	{#snippet component()}
		<ChipState/>
	{/snippet}
</Sandbox>

### Variant

Changes the overall style of the chip with filled or outline variants.

<Sandbox name="card-variant-sandbox" code={ChipVariantCode}>
	{#snippet component()}
		<ChipVariant/>
	{/snippet}
</Sandbox>

## API Reference

| props         | type                   | description                                              | default   | type_extend                                    |
| ------------- | ---------------------- | -------------------------------------------------------- | --------- | ---------------------------------------------- |
| ref $bindable | HTMLElement            | Direct access to DOM element                             | undefined |                                                |
| is            | enum                   | Makes the component `<a>`, `<button>`, `span` or `div`.  | `div`     | `button` \| `a` \| `div` \| `span`             |
| href          | string                 | Add path or url                                          | undefined |                                                |
| dark          | boolean                | Enable dark theme for component.                         | false     |                                                |
| light         | boolean                | Enable light theme for the component.                    | false     |                                                |
| color         | string                 | Applies a custom color to text or icons.                 | undefined |                                                |
| background    | string                 | Apply a custom background color.                         | undefined |                                                |
| density       | enum                   | Controls vertical density                                | `default` | `compact` \| `comfortable` \| `default`        |
| rounded       | string                 | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.). | `md`      |                                                |
| variant       | enum                   | Sets the visual style of the Chip.                       | `filled`  | `outline` \| `filled`                          |
| active        | boolean                | Displays active status                                   | false     |                                                |
| disabled      | boolean                | Deactivates the Chip, preventing any interaction.        | false     |                                                |
| loading       | boolean                | Displays a spinner and disables the Chip.                | false     |                                                |
| warning       | boolean                | Apply a visual style of warning.                         | false     |                                                |
| info          | boolean                | Applies an informative style.                            | false     |                                                |
| success       | boolean                | Apply a success style (confirmation, validation, etc.).  | false     |                                                |
| error         | boolean                | Apply a visual style of error.                           | false     |                                                |
| size          | enum \| `{enum: enum}` | Set Chip size: xs, sm, md, lg, xl or full.               | `md`      | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |
| type          | enum                   | Apply a visual style of error.                           | `button`  | `button`                                       |
| label         | string                 | Chip text (if not defined by Snippet children)           | undefined |                                                |
| closable      | boolean                | Displays a close icon                                    | undefined |                                                |
| noRipple      | boolean                | Deactivates ripple effect                                | false     |                                                |
| close         | Snippet                | Snippet to customize the closing icon                    | undefined |                                                |
| load          | Snippet                | Content displayed during downloading                     | undefined |                                                |
| append        | Snippet                | Content displayed after the main content                 | undefined |                                                |
| prepend       | Snippet                | Content displayed before main content                    | undefined |                                                |
| readonly      | boolean                | No action or event effet on chip component               | false     |                                                |

## Variables CSS

| variable            | default                            | description      |
| ------------------- | ---------------------------------- | ---------------- |
| `–-chip-color`      | `--kit-label-primary`              | Text color       |
| `–-chip-background` | `--kit-background-grouped-primary` | Background color |
| `--chip-shape`      | `--system-shape-full`              | Chip edge radius |

Chips are often used in a [Toolbar](/docs/components/toolbar) or as a complement in a [Card](/docs/components/card) to structure information and [List](/docs/components/list).
