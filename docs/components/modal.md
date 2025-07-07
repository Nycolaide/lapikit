---
head:
  title: modal
  description: "Advanced Modal component for Svelte: overlays, event-driven control, custom positions and adaptable styles"
title: modal
subtitle: modal component
section: components
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import ModalBase from "$lib/components/docs/modal/modal-base.svelte";
    import ModalBaseCode from "$lib/components/docs/modal/modal-base.svelte?raw";
    import ModalContain from "$lib/components/docs/modal/modal-contain.svelte";
    import ModalContainCode from "$lib/components/docs/modal/modal-contain.svelte?raw";
    import ModalSize from "$lib/components/docs/modal/modal-size.svelte";
    import ModalSizeCode from "$lib/components/docs/modal/modal-size.svelte?raw";
    import ModalDensity from "$lib/components/docs/modal/modal-density.svelte";
    import ModalDensityCode from "$lib/components/docs/modal/modal-density.svelte?raw";
    import ModalPosition from "$lib/components/docs/modal/modal-position.svelte";
    import ModalPositionCode from "$lib/components/docs/modal/modal-position.svelte?raw";
    import ModalPersistent from "$lib/components/docs/modal/modal-persistent.svelte";
    import ModalPersistentCode from "$lib/components/docs/modal/modal-persistent.svelte?raw";
    import ModalKeyboard from "$lib/components/docs/modal/modal-keyboard.svelte";
    import ModalKeyboardCode from "$lib/components/docs/modal/modal-keyboard.svelte?raw";
    import ModalStack from "$lib/components/docs/modal/modal-stack.svelte";
    import ModalStackCode from "$lib/components/docs/modal/modal-stack.svelte?raw";
</script>

The Modal component displays an overlay panel above the main content. It is designed for dialogs, contextual messages, forms or alerts requiring direct interaction.

The modal can be centered, fixed at the top or bottom of the screen, and closes in different ways depending on the options activated (outside click, Escape key, etc.).

<Sandbox name="modal-sandbox" code={ModalBaseCode} presentation>
	{#snippet component()}
		<ModalBase/>
	{/snippet}
</Sandbox>

## Examples of modal

### Base

A simple example of modal control with an open variable. It is displayed at the center of the screen with a default size.

<Sandbox name="modal-base-sandbox" code={ModalBaseCode}>
	{#snippet component()}
		<ModalBase/>
	{/snippet}
</Sandbox>

### Contain

This example shows the contain option, which allows long content to be contained in a scrollable zone, ideal for modals with lots of text or forms.

<Sandbox name="modal-contain-sandbox" code={ModalContainCode}>
	{#snippet component()}
		<ModalContain/>
	{/snippet}
</Sandbox>

### Size

Prop size lets you control the overall size of the modal: from `xs` to `full`, depending on how much space you want to give it.

<Sandbox name="modal-size-sandbox" code={ModalSizeCode}>
	{#snippet component()}
		<ModalSize/>
	{/snippet}
</Sandbox>

### Density

The density option adjusts internal spacing. compact reduces margins and paddings, while comfortable adds air, for a more spacious look.

<Sandbox name="modal-density-sandbox" code={ModalDensityCode}>
	{#snippet component()}
		<ModalDensity/>
	{/snippet}
</Sandbox>

### Position

You can position the modal at the top, center (default) or bottom of the screen. This example shows all three options.

<Sandbox name="modal-position-sandbox" code={ModalPositionCode}>
	{#snippet component()}
		<ModalPosition/>
	{/snippet}
</Sandbox>

### Persistent

When persistent is enabled, the modal is not closed by clicking outside or pressing Escape. Perfect for cases where confirmation is mandatory.

<Sandbox name="modal-persistent-sandbox" code={ModalPersistentCode}>
	{#snippet component()}
		<ModalPersistent/>
	{/snippet}
</Sandbox>

### Keyboard

By enabling **closeWithEsc**, the modal can be closed with the Escape key. This example illustrates this keyboard interaction.

<Sandbox name="modal-keyboard-sandbox" code={ModalKeyboardCode}>
	{#snippet component()}
		<ModalKeyboard/>
	{/snippet}
</Sandbox>

### Stacking

Several modals can be displayed at the same time, stacked. This example shows how to correctly manage z-indexes and focus between multiple windows.

<Sandbox name="modal-stacking-sandbox" code={ModalStackCode}>
	{#snippet component()}
		<ModalStack/>
	{/snippet}
</Sandbox>

## API Reference

| props          | type                   | description                                                       | default   | type_extend                                    |
| -------------- | ---------------------- | ----------------------------------------------------------------- | --------- | ---------------------------------------------- | --- |
| ref $bindable  | HTMLElement            | Direct access to DOM element                                      | undefined |                                                |
| open $bindable | boolean                | Controls component opening/closing                                | false     |                                                |
| dark           | boolean                | Enable dark theme for component.                                  | false     |                                                |
| light          | boolean                | Enable light theme for the component.                             | false     |                                                |
| color          | string                 | Applies a custom color to text or icons.                          | undefined |                                                |
| background     | string                 | Apply a custom background color.                                  | undefined |                                                |
| density        | enum                   | Controls vertical density                                         | `default` | `compact` \| `comfortable` \| `default`        |
| rounded        | string                 | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.).          | `md`      |                                                |     |
| size           | enum \| `{enum: enum}` | Determines the size of the Modal                                  | `md`      | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `full` |
| persistent     | boolean                | Prevent closing by clicking outside or with Escape.               | false     |                                                |
| position       | enum                   | Vertical position of content on screen                            | `center`  | `bottom` \| `center` \| `top`                  |
| contain        | boolean                | If enabled, limits content to a container with internal scrolling | false     |                                                |
| closeWithEsc   | boolean                | Close the Modal with the Escape key                               | false     |                                                |

## Variables CSS

| variable              | default            | description         |
| --------------------- | ------------------ | ------------------- |
| `–-modal-color`       | `–-kit-on-surface` | Text color          |
| `–-modal-background`  | `–-kit-surface`    | Background color    |
| `–-modal-radius`      | `--kit-radius-md`  | Modal edge radius   |
| `–-modal-translate-x` | `-50%`             | Horizontal position |
| `–-modal-translate-y` | `-50%`             | Vertical position   |
