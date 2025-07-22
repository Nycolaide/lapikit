---
head:
  title: alert
  description: "Display alert or status messages. Manage variants, densities and info types for effective user feedback."
title: alert
subtitle: alert component
introduction: information, success or error messages
cover: "docs/components/alert.webp"
section: components
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import AlertBase from "$lib/components/docs/alert/alert-base.svelte";
    import AlertBaseCode from "$lib/components/docs/alert/alert-base.svelte?raw";
    import AlertClosable from "$lib/components/docs/alert/alert-closable.svelte";
    import AlertClosableCode from "$lib/components/docs/alert/alert-closable.svelte?raw";
    import AlertDensity from "$lib/components/docs/alert/alert-density.svelte";
    import AlertDensityCode from "$lib/components/docs/alert/alert-density.svelte?raw";
    import AlertSnippet from "$lib/components/docs/alert/alert-snippet.svelte";
    import AlertSnippetCode from "$lib/components/docs/alert/alert-snippet.svelte?raw";
    import AlertState from "$lib/components/docs/alert/alert-state.svelte";
    import AlertStateCode from "$lib/components/docs/alert/alert-state.svelte?raw";
    import AlertVariant from "$lib/components/docs/alert/alert-variant.svelte";
    import AlertVariantCode from "$lib/components/docs/alert/alert-variant.svelte?raw";
</script>

The Alert component displays contextual messages in the user interface: notifications, warnings, confirmations or errors.
It can be styled in several variants, states and densities, and is easily integrated using Snippets to enrich its content.

<Sandbox name="alert-sandbox" code={AlertBaseCode} presentation>
	{#snippet component()}
		<AlertBase/>
	{/snippet}
</Sandbox>

## Examples of alert

### Base

This is the minimal version of an alert. It contains simple text and adopts the default styles (variant filled, density default, neutral state).

<Sandbox name="alert-base-sandbox" code={AlertBaseCode}>
	{#snippet component()}
		<AlertBase/>
	{/snippet}
</Sandbox>

### Variant

The alert can adopt different visual styles via the prop variant:

- **filled** (default): solid background.
- **outline**: visible border.
- **text** : transparent background.
- **dash** : dotted border.

These variants can be adapted to different visual contexts or levels of importance.

<Sandbox name="alert-variant-sandbox" code={AlertVariantCode}>
	{#snippet component()}
		<AlertVariant/>
	{/snippet}
</Sandbox>

### State

For greater expressiveness, an alert can be marked by a status: `info`, `success`, `warning`, `error`.
Each state applies a color and a contextual icon to convey the right signal to the user.

<Sandbox name="alert-state-sandbox" code={AlertStateCode}>
	{#snippet component()}
		<AlertState/>
	{/snippet}
</Sandbox>

### Density

Prop density lets you control the vertical size of the alert:

- **compact**: reduced margins and padding, useful for lists or tables.
- **comfortable**: a visual compromise.
- **default**: standard spacing.

Ideal for adapting alerts to different levels of hierarchy or UI density.

<Sandbox name="alert-density-sandbox" code={AlertDensityCode}>
	{#snippet component()}
		<AlertDensity/>
	{/snippet}
</Sandbox>

### Snippet

The prepend, append and close snippets are used to add custom content:

- Icon or avatar on the left (prepend),
- Button or action on the right (append),
- Custom close icon (close).

These snippets enable you to compose rich alerts without sacrificing structure.

<Sandbox name="alert-snippet-sandbox" code={AlertSnippetCode}>
	{#snippet component()}
		<AlertSnippet/>
	{/snippet}
</Sandbox>

### Closable

Add the closable prop to allow the user to close the alert manually.
A close button is automatically displayed, unless overridden by the close slot.

<Sandbox name="alert-closable-sandbox" code={AlertClosableCode}>
	{#snippet component()}
		<AlertClosable/>
	{/snippet}
</Sandbox>

## API Reference

| props          | type        | description                                                               | default   | type_extend                                                                     |
| -------------- | ----------- | ------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------- |
| ref $bindable  | HTMLElement | Direct access to DOM element                                              | undefined |                                                                                 |
| is             | string      | Defines the HTML tag.                                                     | div       |                                                                                 |
| href           | string      | If set, transforms alert into clickable link                              | undefined |                                                                                 |
| open $bindable | boolean     | Controls alert display.                                                   | true      |                                                                                 |
| dark           | boolean     | Enable dark theme for component.                                          | false     |                                                                                 |
| light          | boolean     | Enable light theme for the component.                                     | false     |                                                                                 |
| color          | string      | Applies a custom color to text or icons.                                  | undefined |                                                                                 |
| background     | string      | Apply a custom background color.                                          | undefined |                                                                                 |
| variant        | enum        | Sets the visual style of the alert.                                       | undefined | `outline` \| `text` \| `dash`                                                   |
| density        | enum        | Controls vertical density                                                 | `default` | `compact` \| `comfortable` \| `default`                                         |
| rounded        | string      | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.).                  | `md`      |                                                                                 |
| closable       | boolean     | If true, displays a close button to hide the alert.                       | false     |                                                                                 |
| warning        | boolean     | Apply a visual style of warning.                                          | false     |                                                                                 |
| info           | boolean     | Applies an informative style.                                             | false     |                                                                                 |
| success        | boolean     | Apply a success style (confirmation, validation, etc.).                   | false     |                                                                                 |
| error          | boolean     | Apply a visual style of error.                                            | false     |                                                                                 |
| prepend        | Snippet     | Apply a visual style of error.                                            | undefined | Snippet to insert content to the right of the alert (e.g. icon, button, action) |
| append         | Snippet     | Snippet to insert content to the left of the alert (e.g. icon or avatar). | undefined |                                                                                 |
| close          | Snippet     | Snippet to customize the close button (replace default icon).             | undefined |                                                                                 |

## Variables CSS

| variable             | default              | description       |
| -------------------- | -------------------- | ----------------- |
| `–-alert-color`      | `–-kit-on-container` | Text color        |
| `–-alert-background` | `–-kit-container`    | Background color  |
| `–-alert-radius`     | `–-kit-radius-md`    | Alert edge radius |

To enhance your Alerts, think of [Icon](/docs/components/icon) for legibility, or [Button](/docs/components/button) for integrated actions.
