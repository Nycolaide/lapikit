---
head:
  title: accordion
  description: "Discover Lapikit's Accordion component for Svelte. Sizing, accessibility, optimized SEO and integrated event management"
title: accordion
subtitle: accordion component
cover: "docs/components/accordion.webp"
section: components
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import AccordionBase from "$lib/components/docs/accordion/accordion-base.svelte";
    import AccordionBaseCode from "$lib/components/docs/accordion/accordion-base.svelte?raw";
    import AccordionIcon from "$lib/components/docs/accordion/accordion-icon.svelte";
    import AccordionIconCode from "$lib/components/docs/accordion/accordion-icon.svelte?raw";
    import AccordionMultiple from "$lib/components/docs/accordion/accordion-multiple.svelte";
    import AccordionMultipleCode from "$lib/components/docs/accordion/accordion-multiple.svelte?raw";
    import AccordionReadOnly from "$lib/components/docs/accordion/accordion-read-only.svelte";
    import AccordionReadOnlyCode from "$lib/components/docs/accordion/accordion-read-only.svelte?raw";
    import AccordionSnippet from "$lib/components/docs/accordion/accordion-snippet.svelte";
    import AccordionSnippetCode from "$lib/components/docs/accordion/accordion-snippet.svelte?raw";
    import AccordionSpacer from "$lib/components/docs/accordion/accordion-spacer.svelte";
    import AccordionSpacerCode from "$lib/components/docs/accordion/accordion-spacer.svelte?raw";
</script>

An Accordion lets you group content into collapsible sections. It improves legibility and saves space in an interface, while offering precise control over the display of information.

<Sandbox name="accordion-sandbox" code={AccordionBaseCode} presentation>
	{#snippet component()}
		<AccordionBase/>
	{/snippet}
</Sandbox>

## Examples of accordion

### Base

The minimal example of an Accordion: a parent container with one or more children. Each item can be opened or closed independently (or not, depending on the configuration).

<Sandbox name="accordion-base-sandbox" code={AccordionBaseCode}>
	{#snippet component()}
		<AccordionBase/>
	{/snippet}
</Sandbox>

### Icon

By default, an indicator icon (often an arrow or chevron) is displayed to indicate open/closed status. This icon can be customized via a snippet or hidden using the hideIcon prop.

<Sandbox name="accordion-icon-sandbox" code={AccordionIconCode}>
	{#snippet component()}
		<AccordionIcon/>
	{/snippet}
</Sandbox>

### Multiple

The Accordion can open several items at the same time.
In this mode, each item has its own independent state, ideal for presenting several blocks of information simultaneously.

<Sandbox name="accordion-multiple-sandbox" code={AccordionMultipleCode}>
	{#snippet component()}
		<AccordionMultiple/>
	{/snippet}
</Sandbox>

### Read Only

Some items can be made read-only with the readOnly prop. This disables interactions (click, open/close) while keeping the item visible in the chord structure.

<Sandbox name="accordion-readonly-sandbox" code={AccordionReadOnlyCode}>
	{#snippet component()}
		<AccordionReadOnly/>
	{/snippet}
</Sandbox>

### Snippet

You can enrich or customize the rendering with predefined snippets, allowing you to add icons, dynamic content, action buttons in the header, etc.
Lapikit offers activator and indicator inputs.

<Sandbox name="accordion-snippet-sandbox" code={AccordionSnippetCode}>
	{#snippet component()}
		<AccordionSnippet/>
	{/snippet}
</Sandbox>

### Spacer

Prop spacer adds vertical spacing between chord items.
Useful for adding a little air to dense or visually busy interfaces.

<Sandbox name="accordion-spacer-sandbox" code={AccordionSpacerCode}>
	{#snippet component()}
		<AccordionSpacer/>
	{/snippet}
</Sandbox>

## API Reference

**Root**

| props         | type        | description                                                                  | default   | type_extend |
| ------------- | ----------- | ---------------------------------------------------------------------------- | --------- | ----------- |
| ref $bindable | HTMLElement | Direct access to DOM element                                                 | undefined |             |
| is            | string      | Defines the HTML tag used for the main wrapper (e.g. `section`, `ul`, etc.). | div       |             |
| dark          | boolean     | Enable dark theme for component.                                             | false     |             |
| light         | boolean     | Enable light theme for the component.                                        | false     |             |
| color         | string      | Applies a custom color to text or icons.                                     | undefined |             |
| background    | string      | Apply a custom background color.                                             | undefined |             |
| spacer        | boolean     | Adds spacing between child elements.                                         | false     |             |
| hideIcon      | boolean     | Hides the indicator icon (arrow, chevron, etc.) for each item.               | false     |             |

**Item**

| property       | type             | description                                                                                  | default   | type_extend                       |
| -------------- | ---------------- | -------------------------------------------------------------------------------------------- | --------- | --------------------------------- |
| index required | number \| string | Unique item identifier. Used to manage opening/closing.                                      | undefined |                                   |
| ref $bindable  | HTMLElement      | Direct access to DOM element                                                                 | undefined |                                   |
| is             | string           | Defines the item's HTML tag.                                                                 | div       |                                   |
| open $bindable | boolean          | Controls item opening status (bindable for external use).                                    | false     |                                   |
| dark           | boolean          | Enable dark theme for the item.                                                              | false     |                                   |
| light          | boolean          | Enable light theme for the item.                                                             | false     |                                   |
| text           | string           | Item title or static text                                                                    |           |                                   |
| color          | string           | Applies a custom color to text or icons.                                                     | undefined |                                   |
| background     | string           | Apply a custom background color.                                                             | undefined |                                   |
| rounded        | string           | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.).                                     | `md`      |                                   |
| readOnly       | boolean          | Prevents any user interaction with the item (click, toggle, etc.).                           | false     |                                   |
| disabled       | boolean          | Disables item interaction and applies an associated visual style.                            | false     |                                   |
| toggle         | void             | Callback function called when the item is toggled. Allows manual control of opening/closing. | undefined | (index: number \| string) => void |
| indicator      | Snippet          | Snippet for customizing the visual indicator (arrow, chevron, etc.).                         | undefined | open[]                            |
| activator      | Snippet          | Snippet used to customize the trigger (clickable header).                                    | undefined |                                   |

## Variables CSS

**Root**

| variable                 | default              | description                  |
| ------------------------ | -------------------- | ---------------------------- |
| `–-accordion-color`      | `–-kit-on-container` | Text color global            |
| `–-accordion-background` | `–-kit-container`    | Background color global      |
| `–-accordion-radius`     | `–-kit-radius-md`    | Accordion edge radius global |

**Item**

| variable  | default                  | description                |
| --------- | ------------------------ | -------------------------- |
| `–-on`    | `–-accordion-color`      | Text color item            |
| `–-base`  | `–-accordion-background` | Background color item      |
| `–-shape` | `–-accordion-radius`     | Accordion edge radius item |
