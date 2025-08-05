---
title: button
subtitle: button component
introduction: customizable interactive button
head:
  title: button
  description: "Stylish, customizable Svelte buttons with Lapikit. Variants, icons, colors, states: everything's ready."
style:
  cover: "docs/components/button.webp"
  color: #ffff
state:
  section: components
  published: true
keywords:
  - btn
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import ButtonBase from "$lib/components/docs/button/button-base.svelte";
    import ButtonBaseCode from "$lib/components/docs/button/button-base.svelte?raw";
    import ButtonResponsive from "$lib/components/docs/button/button-media-queries.svelte";
    import ButtonResponsiveCode from "$lib/components/docs/button/button-media-queries.svelte?raw";
    import ButtonState from "$lib/components/docs/button/button-state.svelte";
    import ButtonStateCode from "$lib/components/docs/button/button-state.svelte?raw";
    import ButtonVariant from "$lib/components/docs/button/button-variant.svelte";
    import ButtonVariantCode from "$lib/components/docs/button/button-variant.svelte?raw";
    import ButtonColor from "$lib/components/docs/button/button-color.svelte";
    import ButtonColorCode from "$lib/components/docs/button/button-color.svelte?raw";
    import ButtonDensity from "$lib/components/docs/button/button-density.svelte";
    import ButtonDensityCode from "$lib/components/docs/button/button-density.svelte?raw";
    import ButtonEvent from "$lib/components/docs/button/button-event.svelte";
    import ButtonEventCode from "$lib/components/docs/button/button-event.svelte?raw";
    import ButtonType from "$lib/components/docs/button/button-type.svelte";
    import ButtonTypeCode from "$lib/components/docs/button/button-type.svelte?raw";
    import ButtonIcon from "$lib/components/docs/button/button-icon.svelte";
    import ButtonIconCode from "$lib/components/docs/button/button-icon.svelte?raw";
    import ButtonSnippet from "$lib/components/docs/button/button-snippet.svelte";
    import ButtonSnippetCode from "$lib/components/docs/button/button-snippet.svelte?raw";
    import ButtonRipple from "$lib/components/docs/button/button-ripple.svelte";
    import ButtonRippleCode from "$lib/components/docs/button/button-ripple.svelte?raw";
</script>

The Button component is a central component of Lapikit. It allows you to create buttons that are adaptable, accessible and easily customized, either via props or CSS variables.

It automatically manages variants, states (`active`, `loading`, etc.), accessibility, colors, sizes, and integrates with icons or additional content (`prepend`, `append`, `load`).

<Sandbox name="button-sandbox" code={ButtonBaseCode} presentation>
	{#snippet component()}
		<ButtonBase/>
	{/snippet}
</Sandbox>

## Examples of button

### Responsive

The component adapts to different screen sizes thanks to Lapikit's built-in media queries. It can be used with responsive sizes via the `size` prop, by passing a `Record<string, string>` object.

<Sandbox name="button-responsive-sandbox" code={ButtonResponsiveCode}>
	{#snippet component()}
		<ButtonResponsive/>
	{/snippet}
</Sandbox>

### State

The Button component can reflect several visual or functional states, useful for informing the user or managing interaction. These states can be combined in certain cases (e.g. loading + success), but some, such as disabled, take precedence over all.

Here are the main states available:

- **active**: indicates that a button is selected or in use.
- **loading**: displays a spinner and deactivates the button to avoid multiple actions.
- **disabled**: makes the button inactive, with no interaction possible.
- **error**, **info**, **warning**, **success**: contextual states to reflect a specific situation or visual feedback (error, warning, validation...).

Each state can be styled automatically via Lapikit themes or customized via CSS classes or variables.

<Sandbox name="button-variant-sandbox" code={ButtonStateCode}>
	{#snippet component()}
		<ButtonState/>
	{/snippet}
</Sandbox>

### Variant

Variants control the overall style of the button. They enable adaptation to different interface contexts, while maintaining visual consistency.

- **filled** (default): solid button, generally used for main actions.
- **outline**: button with outline, often used for secondary actions.
- **text**: discreet button with no background or border, perfect for actions in a text flow.

<Sandbox name="button-variant-sandbox" code={ButtonVariantCode}>
	{#snippet component()}
		<ButtonVariant/>
	{/snippet}
</Sandbox>

### Colors

For fine-tuned customization, you can switch colors manually:

- **color**: change the color of the text or icon.
- **background**: change the background color of the button.

If you don't pass anything, Lapikit's default theme manages colors according to states (success, error, etc.) or variants.

<Sandbox name="button-colors-sandbox" code={ButtonColorCode}>
	{#snippet component()}
		<ButtonColor/>
	{/snippet}
</Sandbox>

### Density

Density controls the button's internal padding, i.e. its compactness:

- **default**: standard size, suitable for most applications.
- **comfortable**: slightly reduced padding for denser interfaces.
- **compact**: minimal, ideal for toolbars or busy lists.

Useful for adapting your components to the density of your UI.

<Sandbox name="button-density-sandbox" code={ButtonDensityCode}>
	{#snippet component()}
		<ButtonDensity/>
	{/snippet}
</Sandbox>

### Events

The component propagates native HTML events, such as click, and can be manipulated via a `ref (with $bind:ref)`.

- You can listen to it normally: `on:click={handleClick}`
- And manipulate it if necessary via a DOM reference `(bind:ref={btn})`.
  If the button is rendered as `<a> (is="a")`, the behavior remains consistent with HTML tags.

<Sandbox name="button-event-sandbox" code={ButtonEventCode}>
	{#snippet component()}
		<ButtonEvent/>
	{/snippet}
</Sandbox>

### Type

To adapt to different uses, the button can be rendered as:

- a classic `<button> (is="button", default)`
- a `<a> link (is="a", necessity href)`

Prop type applies only if `is="button"`:

- **button** (default): neutral button
- **submit** : submits a form
- **reset** : resets a form

<Sandbox name="button-event-sandbox" code={ButtonTypeCode}>
	{#snippet component()}
		<ButtonType/>
	{/snippet}
</Sandbox>

### Icon

When icon is set to true, the button adopts a specific style to accommodate an icon only (centered, square, no side padding). Perfect for compact action buttons or toolbars.

<Sandbox name="button-icon-sandbox" code={ButtonIconCode}>
	{#snippet component()}
		<ButtonIcon/>
	{/snippet}
</Sandbox>

### Snippet

These props are used to add content around the button's main text:

- **prepend**: element before the text (often an icon)
- **append**: element after the text
- **load**: content displayed instead of text when loading is activated

Very useful for visually enriching a button without creating a custom structure by hand.

<Sandbox name="button-snippet-sandbox" code={ButtonSnippetCode}>
	{#snippet component()}
		<ButtonSnippet/>
	{/snippet}
</Sandbox>

### Ripple

By default, the button displays a **Material Design Style** ripple when clicked.
You can disable this effect with the noRipple prop.
This can be useful in sober interfaces or when you want to avoid animation for performance or design reasons.

<Sandbox name="button-ripple-sandbox" code={ButtonRippleCode}>
	{#snippet component()}
		<ButtonRipple/>
	{/snippet}
</Sandbox>

## API Reference

| props         | type                   | description                                              | default   | type_extend                                    |
| ------------- | ---------------------- | -------------------------------------------------------- | --------- | ---------------------------------------------- |
| ref $bindable | HTMLElement            | Direct access to DOM element                             | undefined |                                                |
| is            | enum                   | Makes the component `<a>` or `<button>`.                 | `button`  | `button` \| `a`                                |
| href          | string                 | Add path or url                                          | undefined |                                                |
| dark          | boolean                | Enable dark theme for component.                         | false     |                                                |
| light         | boolean                | Enable light theme for the component.                    | false     |                                                |
| color         | string                 | Applies a custom color to text or icons.                 | undefined |                                                |
| background    | string                 | Apply a custom background color.                         | undefined |                                                |
| density       | enum                   | Controls vertical density                                | `default` | `compact` \| `comfortable` \| `default`        |
| rounded       | string                 | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.). | `md`      |                                                |
| variant       | enum                   | Sets the visual style of the Button.                     | `filled`  | `outline` \| `text` \| `filled`                |
| active        | boolean                | Displays active status                                   | false     |                                                |
| loading       | boolean                | Displays a spinner and disables the Button.              | false     |                                                |
| disabled      | boolean                | Deactivates the Button, preventing any interaction.      | false     |                                                |
| warning       | boolean                | Apply a visual style of warning.                         | false     |                                                |
| info          | boolean                | Applies an informative style.                            | false     |                                                |
| success       | boolean                | Apply a success style (confirmation, validation, etc.).  | false     |                                                |
| error         | boolean                | Apply a visual style of error.                           | false     |                                                |
| size          | enum \| `{enum: enum}` | Set Button size: xs, sm, md, lg, xl or full.             | `md`      | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |
| type          | enum                   | Apply a visual style of error.                           | `button`  | `button` \| `submit` \| `reset`                |
| icon          | boolean                | Apply a specific style to icon Button                    | false     |                                                |
| noRipple      | boolean                | Deactivates ripple effect                                | false     |                                                |
| load          | Snippet                | Content displayed during downloading                     | undefined |                                                |
| append        | Snippet                | Content displayed after the main content                 | undefined |                                                |
| prepend       | Snippet                | Content displayed before main content                    | undefined |                                                |

## Variables CSS

| variable              | default              | description        |
| --------------------- | -------------------- | ------------------ |
| `–-button-color`      | `–-kit-on-container` | Text color         |
| `–-button-background` | `–-kit-container`    | Background color   |
| `–-button-radius`     | `--kit-radius-md`    | Button edge radius |

Buttons become more effective with [Tooltips](/docs/components/tooltip), a [Toolbar](/docs/components/toolbar) or [Popover](/docs/components/popover) interactions.
