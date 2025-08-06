---
title: dialog
subtitle: dialog component
introduction: centered modal window, for interactions or important messages
head:
  title: dialog
  description: "Create modal dialogs with a fluid UX. Integrated focus, size, density and behavior management."
style:
  cover: "docs/components/dialog.webp"
state:
  section: components
  published: true
github:
  url: /components/dialog.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import DialogBase from "$lib/components/docs/dialog/dialog-base.svelte";
    import DialogBaseCode from "$lib/components/docs/dialog/dialog-base.svelte?raw";
    import DialogSize from "$lib/components/docs/dialog/dialog-size.svelte";
    import DialogSizeCode from "$lib/components/docs/dialog/dialog-size.svelte?raw";
    import DialogDensity from "$lib/components/docs/dialog/dialog-density.svelte";
    import DialogDensityCode from "$lib/components/docs/dialog/dialog-density.svelte?raw";
    import DialogPosition from "$lib/components/docs/dialog/dialog-position.svelte";
    import DialogPositionCode from "$lib/components/docs/dialog/dialog-position.svelte?raw";
    import DialogPersistent from "$lib/components/docs/dialog/dialog-persistent.svelte";
    import DialogPersistentCode from "$lib/components/docs/dialog/dialog-persistent.svelte?raw";
</script>

The Dialog component is a modal window based on the native HTML element `<dialog>`. Thanks to this foundation, it benefits from accessible and semantic features by default, such as focus management, closing with the Escape key or clicking outside the box (unless persistent is enabled).

It can be used to display temporary content above the main interface: messages, forms, confirmations, etc. It is controlled via the prop bindable open, can be customized in position, size, density and style, and adapts easily to all usage contexts.

<Sandbox name="dialog-sandbox" code={DialogBaseCode} presentation>
	{#snippet component()}
		<DialogBase/>
	{/snippet}
</Sandbox>

## Examples of dialog

### Base

Displays a simple dialog with central content. This is the basic use case for displaying a message or a quick interaction.

<Sandbox name="dialog-base-sandbox" code={DialogBaseCode}>
	{#snippet component()}
		<DialogBase/>
	{/snippet}
</Sandbox>

### Size

Show how to adjust the size of the Dialog with prop size. You can choose between `xs`, `sm`, `md`, `lg` and `xl` to adapt the available space to the content.

<Sandbox name="dialog-size-sandbox" code={DialogSizeCode}>
	{#snippet component()}
		<DialogSize/>
	{/snippet}
</Sandbox>

### Density

Allows you to modify the internal density (padding) of the content, with the values `compact`, `comfortable` or `default`. Perfect for adjusting the overall feel of the component

<Sandbox name="dialog-density-sandbox" code={DialogDensityCode}>
	{#snippet component()}
		<DialogDensity/>
	{/snippet}
</Sandbox>

### Position

Change the Dialog's vertical alignment on the screen (**top**, **center**, **bottom**) to suit your design or the context in which it appears.

<Sandbox name="dialog-position-sandbox" code={DialogPositionCode}>
	{#snippet component()}
		<DialogPosition/>
	{/snippet}
</Sandbox>

### Persistent

Makes the Dialog persistent: it no longer closes automatically on clicking outside or on **Escape**. Very useful to avoid accidental closing during critical actions or long forms.

<Sandbox name="dialog-persistent-sandbox" code={DialogPersistentCode}>
	{#snippet component()}
		<DialogPersistent/>
	{/snippet}
</Sandbox>

## API Reference

| props          | type                   | description                                              | default   | type_extend                                    |
| -------------- | ---------------------- | -------------------------------------------------------- | --------- | ---------------------------------------------- |
| ref $bindable  | HTMLElement            | Direct access to DOM element                             | undefined |                                                |
| is             | enum                   | Makes the component `<a>` or `<button>` or `div`.        | `div`     | `button` \| `a` \| `div`                       |
| open $bindable | boolean                | Controls component opening/closing                       | false     |                                                |
| dark           | boolean                | Enable dark theme for component.                         | false     |                                                |
| light          | boolean                | Enable light theme for the component.                    | false     |                                                |
| color          | string                 | Applies a custom color to text or icons.                 | undefined |                                                |
| background     | string                 | Apply a custom background color.                         | undefined |                                                |
| density        | enum                   | Controls vertical density                                | `default` | `compact` \| `comfortable` \| `default`        |
| rounded        | string                 | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.). | `md`      |                                                |
| variant        | enum                   | Sets the visual style of the Card.                       | `filled`  | `outline` \| `text` \| `filled`                |
| classContent   | string \| string[]     | Add custom classes to the wrapper                        | undefined |                                                |
| size           | enum \| `{enum: enum}` | Set Chip size: xs, sm, md, lg, xl or full.               | `md`      | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |
| persistent     | boolean                | Prevent closing by clicking outside or with Escape.      | false     |                                                |
| position       | enum                   | Vertical position of content on screen                   | `center`  | `bottom` \| `center` \| `top`                  |

## Variables CSS

| variable              | default              | description        |
| --------------------- | -------------------- | ------------------ |
| `–-dialog-color`      | `–-kit-on-container` | Text color         |
| `–-dialog-background` | `–-kit-container`    | Background color   |
| `–-dialog-radius`     | `--kit-radius-md`    | Dialog edge radius |

Remember to follow up with [Modal](/docs/components/modal) or [Popover](/docs/components/popover) to create complete user paths.
