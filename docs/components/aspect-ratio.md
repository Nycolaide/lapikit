---
head:
  title: aspect ratio
  description: "Display your images and content with a perfect ratio thanks to AspectRatio. Simplicity and responsiveness for your Svelte components"
title: aspect ratio
subtitle: aspect ratio component
introduction: maintains a consistent width/height ratio
cover: "docs/components/aspect-ratio.webp"
section: components
keywords:
  - aspect ratio
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import AspectRatioBase from "$lib/components/docs/aspect-ratio/aspect-ratio-base.svelte";
    import AspectRatioBaseCode from "$lib/components/docs/aspect-ratio/aspect-ratio-base.svelte?raw";
    import AspectRatioAspectRatio from "$lib/components/docs/aspect-ratio/aspect-ratio-aspectratio.svelte";
    import AspectRatioAspectRatioCode from "$lib/components/docs/aspect-ratio/aspect-ratio-aspectratio.svelte?raw";
    import AspectRatioInline from "$lib/components/docs/aspect-ratio/aspect-ratio-inline.svelte";
    import AspectRatioInlineCode from "$lib/components/docs/aspect-ratio/aspect-ratio-inline.svelte?raw";
</script>

The AspectRatio component maintains a constant aspect ratio for an element, whatever its content. It is particularly useful for videos, images or any other content requiring a proportional layout. Thanks to its flexible options, it can be easily integrated into different design contexts

<Sandbox name="aspect-ratio-sandbox" code={AspectRatioBaseCode} presentation>
	{#snippet component()}
		<AspectRatioBase/>
	{/snippet}
</Sandbox>

## Examples of aspect ratio

### Base

This example shows a simple use of the AspectRatio component with a defined ratio. This ensures that the element retains its proportions, whatever its size.

<Sandbox name="aspect-ratio-base-sandbox" code={AspectRatioBaseCode}>
	{#snippet component()}
		<AspectRatioBase/>
	{/snippet}
</Sandbox>

### AspectRatio

The aspect ratio is defined by the aspectRatio property. For example, a ratio of `16/9` is ideal for videos, while a ratio of `4/3` is better suited to other types of content. If no ratio is specified, a default behavior is applied.

<Sandbox name="aspect-ratio-inline-sandbox" code={AspectRatioAspectRatioCode}>
	{#snippet component()}
		<AspectRatioAspectRatio/>
	{/snippet}
</Sandbox>

### Inline

The inline property displays the component in the text flow, as an inline element. This can be useful for integrating proportional elements into paragraphs or blocks of text.

<Sandbox name="aspect-ratio-inline-sandbox" code={AspectRatioInlineCode}>
	{#snippet component()}
		<AspectRatioInline/>
	{/snippet}
</Sandbox>

## API Reference

| props         | type        | description                                                                         | default   | type_extend |
| ------------- | ----------- | ----------------------------------------------------------------------------------- | --------- | ----------- |
| ref $bindable | HTMLElement | Direct access to DOM element                                                        | undefined |             |
| aspectRatio   | string      | Defines the element's aspect ratio (e.g. “16:9”, “4:3”).                            | undefined |             |
| inline        | boolean     | Indicates whether the element should be displayed in inline mode (in the text flow) | false     |             |

Use Aspect Ratio on [Icon](/docs/components/icon) to visually structure your media components in a [Card](/docs/components/card).
