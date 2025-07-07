---
head:
  title: popover
  description: "Add interactive popovers to your Svelte apps. Dropdown and Tooltip merge with rich content and fine-grained event management"
title: popover
subtitle: popover component
section: components
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import PopoverBase from "$lib/components/docs/popover/popover-base.svelte";
    import PopoverBaseCode from "$lib/components/docs/popover/popover-base.svelte?raw";
    import PopoverPosition from "$lib/components/docs/popover/popover-position.svelte";
    import PopoverPositionCode from "$lib/components/docs/popover/popover-position.svelte?raw";
</script>

The Popover component displays contextual content above an activator. It is useful for providing additional information, options or secondary actions without overloading the main interface.

Popovers open dynamically from an activator and can be positioned in several directions: _top_, bottom, left or right. It is bindable and customizable in terms of theme, density, color, etc.

> [!WARNING]
> Popover doesn't automatically close: you can control open via events or interactions in the content or activator.

<Sandbox name="popover-sandbox" code={PopoverBaseCode} presentation>
	{#snippet component()}
		<PopoverBase/>
	{/snippet}
</Sandbox>

## Examples of popover

### Base

Basic example of a popover with an activator button. This scenario shows the minimal operation of the component with bind:open to manage its display.

<Sandbox name="popover-base-sandbox" code={PopoverBaseCode}>
	{#snippet component()}
		<PopoverBase/>
	{/snippet}
</Sandbox>

### Position

This scenario shows the different positions available (**top**, **bottom**, **left**, **right**) to adapt Popover placement to the context of use and available space.

<Sandbox name="popover-position-sandbox" code={PopoverPositionCode}>
	{#snippet component()}
		<PopoverPosition/>
	{/snippet}
</Sandbox>

## API Reference

| props          | type    | description                                                                               | default   | type_extend                             |
| -------------- | ------- | ----------------------------------------------------------------------------------------- | --------- | --------------------------------------- |
| open $bindable | boolean | Controls Popover opening.                                                                 | false     |                                         |
| dark           | boolean | Enable dark theme for component.                                                          | false     |                                         |
| light          | boolean | Enable light theme for the component.                                                     | false     |                                         |
| color          | string  | Applies a custom color to text or icons.                                                  | undefined |                                         |
| background     | string  | Apply a custom background color.                                                          | undefined |                                         |
| density        | enum    | Controls internal content spacing                                                         | `default` | `compact` \| `comfortable` \| `default` |
| rounded        | string  | Controls item rounding (`none`, `sm`, `md`, `lg`, etc.).                                  | `md`      |                                         |
| position       | enum    | Defines the position of the popover relative to its trigger.                              | false     | `bottom` \| `top` \| `left` \| `right`  |
| activator      | Snippet | Function or component used as trigger (interactive element that opens/closes the Popover) | undefined | [ModelPopover]                          |

**ModelPopoverProps**

The ModelPopoverProps interface provides the properties passed to the activator slot. It allows you to access the Popover's current state (open), manipulate it dynamically (state) and retrieve the trigger element or linked event (element).

You can use it to create fully customized activators that finely control Popover opening/closing.

## Variables CSS

| variable               | default            | description         |
| ---------------------- | ------------------ | ------------------- |
| `–-popover-color`      | `–-kit-on-surface` | Text color          |
| `–-popover-background` | `–-kit-surface`    | Background color    |
| `–-popover-radius`     | `--kit-radius-md`  | Popover edge radius |
