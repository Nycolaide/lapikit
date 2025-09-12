---
title: tooltip
subtitle: tooltip component
introduction: light tooltip on element hover
head:
  title: tooltip
  description: "Provide additional info without cluttering the UI. Display on hover with intelligent positioning."
style:
  cover: "docs/components/tooltip.webp"
state:
  section: components
  published: true
github:
  url: /components/tooltip.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import TooltipBase from "$lib/components/docs/tooltip/tooltip-base.svelte";
    import TooltipBaseCode from "$lib/components/docs/tooltip/tooltip-base.svelte?raw";
    import TooltipDensity from "$lib/components/docs/tooltip/tooltip-density.svelte";
    import TooltipDensityCode from "$lib/components/docs/tooltip/tooltip-density.svelte?raw";
    import TooltipPosition from "$lib/components/docs/tooltip/tooltip-position.svelte";
    import TooltipPositionCode from "$lib/components/docs/tooltip/tooltip-position.svelte?raw";
    import TooltipSnippet from "$lib/components/docs/tooltip/tooltip-snippet.svelte";
    import TooltipSnippetCode from "$lib/components/docs/tooltip/tooltip-snippet.svelte?raw";
    import TooltipVariant from "$lib/components/docs/tooltip/tooltip-variant.svelte";
    import TooltipVariantCode from "$lib/components/docs/tooltip/tooltip-variant.svelte?raw";
</script>

Display elegant tooltips with Tooltip. Fine-tuned customization, accessibility and SEO-friendliness for your Svelte components
The Tooltip component can be used to display a tooltip on hover, focus or via a controlled opening. It's designed to provide a simple, accessible way of delivering contextual information to the user, without cluttering up the interface.

Tooltip can be used with simple text using the label prop, or with richer HTML content using the tooltip slot.

It is particularly useful for enhancing the user experience by explaining icons, specifying actions or providing secondary details.

<Sandbox name="tooltip-sandbox" code={TooltipBaseCode} presentation>
	{#snippet component()}
		<TooltipBase/>
	{/snippet}
</Sandbox>

## Examples of card

### Base

Demonstrates the simplest use of the tooltip with prop label. The component is automatically positioned around its child element and displayed on hover or focus.

<Sandbox name="tooltip-base-sandbox" code={TooltipBaseCode}>
	{#snippet component()}
		<TooltipBase/>
	{/snippet}
</Sandbox>

### Density

Controls the internal spacing of tooltip content via prop density.
Useful for adapting rendering to a dense (compact), more airy (comfortable) or default interface.

<Sandbox name="tooltip-density-sandbox" code={TooltipDensityCode}>
	{#snippet component()}
		<TooltipDensity/>
	{/snippet}
</Sandbox>

### Position

Prop location is used to position the tooltip around its activator element. Available values are top, bottom, left and right. Positioning is automatic by default, but can be forced if required.

<Sandbox name="tooltip-position-sandbox" code={TooltipPositionCode}>
	{#snippet component()}
		<TooltipPosition/>
	{/snippet}
</Sandbox>

### Snippet

Instead of using the prop label, you can fully customize the tooltip content with the tooltip slot. This allows you to integrate rich HTML, such as lists, links or specific styles. This approach is ideal for more complex tooltips.

<Sandbox name="tooltip-snippet-sandbox" code={TooltipSnippetCode}>
	{#snippet component()}
		<TooltipSnippet/>
	{/snippet}
</Sandbox>

### Variant

The only variant currently available is arrow, which adds a directional arrow to the tooltip to better indicate its relationship to the trigger element.

<Sandbox name="tooltip-variant-sandbox" code={TooltipVariantCode}>
	{#snippet component()}
		<TooltipVariant/>
	{/snippet}
</Sandbox>

## API Reference

| props           | type    | description                                              | default   | type_extend                             |
| --------------- | ------- | -------------------------------------------------------- | --------- | --------------------------------------- |
| open $bindable  | boolean | Controls tooltip opening                                 | false     |                                         |
| is              | enum    | Makes the component `<a>` or `<button>` or `div`.        | `div`     | `button` \| `a` \| `div`                |
| label           | string  | Text content displayed in the tooltip                    | undefined |                                         |
| dark            | boolean | Enable dark theme for component.                         | false     |                                         |
| light           | boolean | Enable light theme for the component.                    | false     |                                         |
| color           | string  | Applies a custom color to text or icons.                 | undefined |                                         |
| background      | string  | Apply a custom background color.                         | undefined |                                         |
| density         | enum    | Controls vertical density                                | `default` | `compact` \| `comfortable` \| `default` |
| rounded         | string  | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.). | `md`      |                                         |
| variant         | enum    | Activates arrow display                                  | undefined | `arrow`                                 |
| delayDuration   | number  | Delay (in ms) before tooltip appears                     | 850       |                                         |
| disabled        | boolean | Disables tooltip display                                 | false     |                                         |
| location        | enum    | Position of the tooltip relative to its target element   | 850       | `top` \| `bottom` \| `left` \| `right`  |
| avoidCollisions | boolean | Position of the tooltip relative to its target element   | false     |                                         |
| tooltip         | Snippet | Allows customized content to be used in the tooltip      | false     |                                         |

## Variables CSS

| variable               | default                            | description         |
| ---------------------- | ---------------------------------- | ------------------- |
| `–-tooltip-color`      | `--kit-label-primary`              | Text color          |
| `–-tooltip-background` | `--kit-background-grouped-primary` | Background color    |
| `–-tooltip-radius`     | `--system-shape-md`                | Tooltip edge radius |

Tooltips complement your [Buttons](/docs/components/button) or [Icons](/docs/components/icon) by providing discreet but useful context for users.
