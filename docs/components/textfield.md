---
title: textfield
subtitle: textfield component
introduction: input fields for text and data entry
head:
  title: textfield
  description: "Capture user input with flexible, accessible text fields. Support various types, validation, and enhanced features."
style:
  cover: "docs/components/textfield.webp"
state:
  section: components
  published: true
  status: "new"
github:
  url: /components/textfield.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';  
    // components
    import TextfieldBase from "$lib/components/docs/textfield/textfield-base.svelte";
    import TextfieldBaseCode from "$lib/components/docs/textfield/textfield-base.svelte?raw";
    import TextfieldClearable from "$lib/components/docs/textfield/textfield-clearable.svelte";
    import TextfieldClearableCode from "$lib/components/docs/textfield/textfield-clearable.svelte?raw";
    import TextfieldCounter from "$lib/components/docs/textfield/textfield-counter.svelte";
    import TextfieldCounterCode from "$lib/components/docs/textfield/textfield-counter.svelte?raw";
    import TextfieldDensity from "$lib/components/docs/textfield/textfield-density.svelte";
    import TextfieldDensityCode from "$lib/components/docs/textfield/textfield-density.svelte?raw";
    import TextfieldError from "$lib/components/docs/textfield/textfield-error.svelte";
    import TextfieldErrorCode from "$lib/components/docs/textfield/textfield-error.svelte?raw";
    import TextfieldForm from "$lib/components/docs/textfield/textfield-form.svelte";
    import TextfieldFormCode from "$lib/components/docs/textfield/textfield-form.svelte?raw";
    import TextfieldMessage from "$lib/components/docs/textfield/textfield-message.svelte";
    import TextfieldMessageCode from "$lib/components/docs/textfield/textfield-message.svelte?raw";
    import TextfieldSize from "$lib/components/docs/textfield/textfield-size.svelte";
    import TextfieldSizeCode from "$lib/components/docs/textfield/textfield-size.svelte?raw";
    import TextfieldSnippet from "$lib/components/docs/textfield/textfield-snippet.svelte";
    import TextfieldSnippetCode from "$lib/components/docs/textfield/textfield-snippet.svelte?raw";
    import TextfieldType from "$lib/components/docs/textfield/textfield-type.svelte";
    import TextfieldTypeCode from "$lib/components/docs/textfield/textfield-type.svelte?raw";
    import TextfieldVariant from "$lib/components/docs/textfield/textfield-variant.svelte";
    import TextfieldVariantCode from "$lib/components/docs/textfield/textfield-variant.svelte?raw";
</script>

The Textfield component provides a versatile input solution for capturing user data. It supports various input types, validation states, and enhanced features like character counting and clearable functionality. Designed with accessibility and user experience in mind.

<Sandbox name="textfield-sandbox" code={TextfieldBaseCode} presentation>
    {#snippet component()}
        <TextfieldBase/>
    {/snippet}
</Sandbox>

## Examples of textfield

### Base

A simple text input field with default styling and behavior. This is the most basic form of the textfield component, suitable for general text input needs.

<Sandbox name="textfield-base-sandbox" code={TextfieldBaseCode}>
    {#snippet component()}
        <TextfieldBase/>
    {/snippet}
</Sandbox>

### Type

Demonstrates different input types (`text`, `email`, `password`, `number`, etc.) to handle specific data formats and enable appropriate virtual keyboards on mobile devices.

<Sandbox name="textfield-type-sandbox" code={TextfieldTypeCode}>
    {#snippet component()}
        <TextfieldType/>
    {/snippet}
</Sandbox>

### Variant

Shows visual variants of the textfield: **outlined**, **filled**, or **underlined** to match different design systems and UI contexts.

<Sandbox name="textfield-variant-sandbox" code={TextfieldVariantCode}>
    {#snippet component()}
        <TextfieldVariant/>
    {/snippet}
</Sandbox>

### Clearable

Adds a clear button that allows users to quickly empty the input field. Particularly useful for search fields and forms where users need to reset values frequently.

<Sandbox name="textfield-clearable-sandbox" code={TextfieldClearableCode}>
    {#snippet component()}
        <TextfieldClearable/>
    {/snippet}
</Sandbox>

### Counter

Displays a character counter to help users stay within specified limits. Shows current length and maximum allowed characters, with visual feedback when approaching or exceeding limits.

<Sandbox name="textfield-counter-sandbox" code={TextfieldCounterCode}>
    {#snippet component()}
        <TextfieldCounter/>
    {/snippet}
</Sandbox>

### Size

Controls the overall size of the textfield (`small`, `medium`, `large`) to fit different layout requirements and visual hierarchies.

<Sandbox name="textfield-size-sandbox" code={TextfieldSizeCode}>
    {#snippet component()}
        <TextfieldSize/>
    {/snippet}
</Sandbox>

### Density

Adjusts vertical spacing and padding (`compact`, `comfortable`, `default`) to optimize space usage in dense interfaces or provide more breathing room.

<Sandbox name="textfield-density-sandbox" code={TextfieldDensityCode}>
    {#snippet component()}
        <TextfieldDensity/>
    {/snippet}
</Sandbox>

### Message

Shows how to display helpful messages below the input field. Useful for providing instructions, hints, or additional context to users.

<Sandbox name="textfield-message-sandbox" code={TextfieldMessageCode}>
    {#snippet component()}
        <TextfieldMessage/>
    {/snippet}
</Sandbox>

### Error

Demonstrates error states and validation feedback. Shows how the textfield appears when validation fails and how to display error messages to guide users.

<Sandbox name="textfield-error-sandbox" code={TextfieldErrorCode}>
    {#snippet component()}
        <TextfieldError/>
    {/snippet}
</Sandbox>

### Snippet

Illustrates the use of snippets to add custom content like icons, buttons, or decorative elements before or after the input field.

<Sandbox name="textfield-snippet-sandbox" code={TextfieldSnippetCode}>
    {#snippet component()}
        <TextfieldSnippet/>
    {/snippet}
</Sandbox>

### Form

Shows the textfield in a complete form context with labels, validation, and proper form integration. Demonstrates real-world usage patterns.

<Sandbox name="textfield-form-sandbox" code={TextfieldFormCode}>
    {#snippet component()}
        <TextfieldForm/>
    {/snippet}
</Sandbox>

## API Reference

| props         | type        | description                                       | default   | type_extend                                       |
| ------------- | ----------- | ------------------------------------------------- | --------- | ------------------------------------------------- |
| ref $bindable | HTMLElement | Direct access to DOM element                      | undefined |                                                   |
| value         | string      | The input value                                   | ""        |                                                   |
| type          | enum        | Defines the input type                            | text      | text \| email \| password \| number \| tel \| url |
| variant       | enum        | Sets the visual style of the textfield            | outlined  | outlined \| filled \| underlined                  |
| size          | enum        | Controls the overall size of the component        | medium    | small \| medium \| large                          |
| density       | enum        | Controls vertical spacing and padding             | default   | compact \| comfortable \| default                 |
| label         | string      | Label text displayed above or inside the field    | undefined |                                                   |
| placeholder   | string      | Placeholder text shown when field is empty        | undefined |                                                   |
| disabled      | boolean     | Disables the input field                          | false     |                                                   |
| readonly      | boolean     | Makes the field read-only                         | false     |                                                   |
| required      | boolean     | Marks the field as required                       | false     |                                                   |
| error         | boolean     | Shows error state styling                         | false     |                                                   |
| clearable     | boolean     | Shows a clear button when field has content       | false     |                                                   |
| counter       | boolean     | Shows character counter                           | false     |                                                   |
| maxlength     | number      | Maximum number of characters allowed              | undefined |                                                   |
| message       | string      | Helper or error message displayed below the field | undefined |                                                   |
| dark          | boolean     | Enable dark theme for component                   | false     |                                                   |
| light         | boolean     | Enable light theme for component                  | false     |                                                   |
| color         | string      | Applies a custom color theme                      | undefined |                                                   |
| background    | string      | Apply a custom background color                   | undefined |                                                   |

## Variables CSS

| variable                 | default                    | description       |
| ------------------------ | -------------------------- | ----------------- |
| `--textfield-color`      | `--kit-label-primary`      | Text color        |
| `--textfield-background` | `--kit-background-primary` | Background color  |
| `--textfield-border`     | `--kit-stroke-secondary`   | Border color      |
| `--textfield-radius`     | `--system-shape-md`        | Border radius     |
| `--textfield-focus`      | `--kit-accent-primary`     | Focus state color |
| `--textfield-error`      | `--kit-status-error`       | Error state color |

Textfield works great with [Form](/docs/components/form) validation and can be enhanced with [Icons](/docs/components/icon) and [Buttons](/docs/components/button) using snippets.
