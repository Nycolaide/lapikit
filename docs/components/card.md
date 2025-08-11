---
title: card
subtitle: card component
introduction: container with background, border and structured content
head:
  title: card
  description: "Organize and display content in visually coherent blocks. The Lapikit card component is easy to style."
style:
  cover: "docs/components/card.webp"
github:
  url: /components/card.md
state:
  section: components
  published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import CardBase from "$lib/components/docs/card/card-base.svelte";
    import CardBaseCode from "$lib/components/docs/card/card-base.svelte?raw";
    import CardDensity from "$lib/components/docs/card/card-density.svelte";
    import CardDensityCode from "$lib/components/docs/card/card-density.svelte?raw";
    import CardEvent from "$lib/components/docs/card/card-event.svelte";
    import CardEventCode from "$lib/components/docs/card/card-event.svelte?raw";
    import CardDisabled from "$lib/components/docs/card/card-disabled.svelte";
    import CardDisabledCode from "$lib/components/docs/card/card-disabled.svelte?raw";
    import CardVariant from "$lib/components/docs/card/card-variant.svelte";
    import CardVariantCode from "$lib/components/docs/card/card-variant.svelte?raw";
</script>

The Card component is a versatile container used to group together information or actions in a user interface. It can be used to display content, images, buttons or links, while offering advanced customization to suit various styles and contexts.

<Sandbox name="card-sandbox" code={CardBaseCode} presentation>
	{#snippet component()}
		<CardBase/>
	{/snippet}
</Sandbox>

## Examples of card

### Base

This example shows the simple use of the Card component with its default settings. Ideal for fast, intuitive integration.

<Sandbox name="card-base-sandbox" code={CardBaseCode}>
	{#snippet component()}
		<CardBase/>
	{/snippet}
</Sandbox>

### Density

The density property lets you adjust the spacing and height of the Card. The available options: `compact`, `comfortable` and `default`, adapt to different design needs.

<Sandbox name="card-density-sandbox" code={CardDensityCode}>
	{#snippet component()}
		<CardDensity/>
	{/snippet}
</Sandbox>

### Variant

The variant property lets you customize the Card's style. The available options: outline, text and filled, offer visual variations adapted to different contexts.

<Sandbox name="card-variant-sandbox" code={CardVariantCode}>
	{#snippet component()}
		<CardVariant/>
	{/snippet}
</Sandbox>

### Event

Cards can be interactive, responding to events such as clicks or hovers. This example shows how to manage events for dynamic interactions.

<Sandbox name="card-event-sandbox" code={CardEventCode}>
	{#snippet component()}
		<CardEvent/>
	{/snippet}
</Sandbox>

### Disabled

The disabled property allows you to disable a Card, preventing any interaction. This can be useful for indicating that an action or option is not available.

<Sandbox name="card-disabled-sandbox" code={CardDisabledCode}>
	{#snippet component()}
		<CardDisabled/>
	{/snippet}
</Sandbox>

## API Reference

| props         | type        | description                                              | default   | type_extend                             |
| ------------- | ----------- | -------------------------------------------------------- | --------- | --------------------------------------- |
| ref $bindable | HTMLElement | Direct access to DOM element                             | undefined |                                         |
| is            | enum        | Makes the component `<a>` or `<button>` or `div`.        | `div`     | `button` \| `a` \| `div`                |
| href          | string      | Add path or url                                          | undefined |                                         |
| dark          | boolean     | Enable dark theme for component.                         | false     |                                         |
| light         | boolean     | Enable light theme for the component.                    | false     |                                         |
| color         | string      | Applies a custom color to text or icons.                 | undefined |                                         |
| background    | string      | Apply a custom background color.                         | undefined |                                         |
| density       | enum        | Controls vertical density                                | `default` | `compact` \| `comfortable` \| `default` |
| rounded       | string      | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.). | `md`      |                                         |
| variant       | enum        | Sets the visual style of the Card.                       | `filled`  | `outline` \| `text` \| `filled`         |
| active        | boolean     | Displays active status                                   | false     |                                         |
| disabled      | boolean     | Deactivates the Card, preventing any interaction.        | false     |                                         |

## Variables CSS

| variable            | default            | description      |
| ------------------- | ------------------ | ---------------- |
| `–-card-color`      | `–-kit-on-surface` | Text color       |
| `–-card-background` | `–-kit-surface`    | Background color |
| `–-card-radius`     | `--kit-radius-md`  | Card edge radius |

For better structure, combine your [Cards](/docs/components/card) with [Avatars](/docs/components/avatar) and clear [Buttons](/docs/components/button).
