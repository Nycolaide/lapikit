---
head:
  title: dropdown
  description: "Flexible drop-down menu with variants, positions and full event management. Designed for ergonomics and fluidity in Svelte"
title: dropdown
subtitle: dropdown component
introduction: Drop-down menu linked to a button or element
cover: "docs/components/dropdown.webp"
section: components
keywords:
  - menu
published: true
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // components
    import DropdownBase from "$lib/components/docs/dropdown/dropdown-base.svelte";
    import DropdownBaseCode from "$lib/components/docs/dropdown/dropdown-base.svelte?raw";
    import DropdownRef from "$lib/components/docs/dropdown/dropdown-ref.svelte";
    import DropdownRefCode from "$lib/components/docs/dropdown/dropdown-ref.svelte?raw";
    import DropdownPosition from "$lib/components/docs/dropdown/dropdown-position.svelte";
    import DropdownPositionCode from "$lib/components/docs/dropdown/dropdown-position.svelte?raw";
    import DropdownCloseOnClick from "$lib/components/docs/dropdown/dropdown-close-on-click.svelte";
    import DropdownCloseOnClickCode from "$lib/components/docs/dropdown/dropdown-close-on-click.svelte?raw";
    import DropdownOpenOnHover from "$lib/components/docs/dropdown/dropdown-open-on-hover.svelte";
    import DropdownOpenOnHoverCode from "$lib/components/docs/dropdown/dropdown-open-on-hover.svelte?raw";
</script>

The Dropdown component displays a menu or contextual content when opened, positioned around a trigger element. It can be opened by clicking or hovering, and closes automatically according to selected parameters (**closeOnClick**, **openOnHover**, etc.).

It's designed to offer great flexibility: configurable positioning, customizable appearance, and a customizable activator for total trigger control.

<Sandbox name="dropdown-sandbox" code={DropdownBaseCode} presentation>
	{#snippet component()}
		<DropdownBase/>
	{/snippet}
</Sandbox>

## Examples of dropdown

### Base

A simple example of a click-triggered dropdown, with default content displayed below the trigger.

<Sandbox name="dropdown-base-sandbox" code={DropdownBaseCode}>
	{#snippet component()}
		<DropdownBase/>
	{/snippet}
</Sandbox>

### Ref

Demonstrate how to use the ref prop to directly manipulate or target the dropdown DOM element.

<Sandbox name="dropdown-ref-sandbox" code={DropdownRefCode}>
	{#snippet component()}
		<DropdownRef/>
	{/snippet}
</Sandbox>

### Position

Allows you to dynamically position the menu in relation to its trigger (**top**, **center**, **bottom**). Useful for managing space constraints in the UI.

<Sandbox name="dropdown-position-sandbox" code={DropdownPositionCode}>
	{#snippet component()}
		<DropdownPosition/>
	{/snippet}
</Sandbox>

### Close on click

The menu closes automatically when an item inside is clicked. Handy for action lists or quick links.

<Sandbox name="dropdown-closeonclick-sandbox" code={DropdownCloseOnClickCode}>
	{#snippet component()}
		<DropdownCloseOnClick/>
	{/snippet}
</Sandbox>

### Open on hover

The dropdown opens automatically when the trigger is hovered over, without the need to click. Ideal for secondary menus or navigation bars.

<Sandbox name="dialog-openonhover-sandbox" code={DropdownOpenOnHoverCode}>
	{#snippet component()}
		<DropdownOpenOnHover/>
	{/snippet}
</Sandbox>

## API Reference

| props         | type        | description                                                                                                                                     | default   | type_extend                                                                                              |
| ------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| ref $bindable | HTMLElement | Direct access to DOM element                                                                                                                    | undefined |                                                                                                          |
| dark          | boolean     | Enable dark theme for component.                                                                                                                | false     |                                                                                                          |
| light         | boolean     | Enable light theme for the component.                                                                                                           | false     |                                                                                                          |
| color         | string      | Applies a custom color to text or icons.                                                                                                        | undefined |                                                                                                          |
| background    | string      | Apply a custom background color.                                                                                                                | undefined |                                                                                                          |
| persistent    | boolean     | Prevent closing by clicking outside or with Escape.                                                                                             | false     |                                                                                                          |
| position      | enum        | Vertical position of content on screen                                                                                                          | `center`  | `bottom` \| `center` \| `top`                                                                            |
| openOnHover   | boolean     | Automatically opens the menu when the trigger is hovered over                                                                                   | false     |                                                                                                          |
| closeOnClick  | boolean     | Closes the menu when an item is clicked                                                                                                         | false     |                                                                                                          |
| activator     | Snippet     | Allows you to dynamically customize the dropdown trigger. Receives component props, open or close state, and a DOM element or event as context. | undefined | `(ModelDropDownProps, state: open` \| `close, element: HTMLElement` \| `PointerEvent` \| `null) => void` |

**ModelDropdownProps**

The `ModelDropdownProps` interface groups the properties automatically passed to the activator. It provides a clean way of typifying a dropdown's custom trigger, giving access to the opening state and other useful options for dynamically adapting the trigger's appearance or behavior.

## Variables CSS

| variable                | default            | description          |
| ----------------------- | ------------------ | -------------------- |
| `–-dropdown-color`      | `–-kit-on-surface` | Text color           |
| `–-dropdown-background` | `–-kit-surface`    | Background color     |
| `–-dropdown-radius`     | `--kit-radius-md`  | Dropdown edge radius |

Combine Dropdown with an [Appbar](/docs/components/appbar) or [Popover](/docs/components/popover) for improved navigation ergonomics.
