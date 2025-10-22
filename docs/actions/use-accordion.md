---
title: useAccordion
subtitle: One action to manage accordion state
head:
  title: useAccordion action
  description: "Learn how to use the useAccordion action in Lapikit for managing accordion state."
state:
  section: actions
  published: true
github:
  url: /actions/use-accordion.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // actions
    import useAccordionBase from "$lib/components/docs/actions/use-accordion.svelte?raw";
</script>

The `useAccordion` action provides an easy way to manage the state of an accordion component in your Svelte application. It allows you to control which sections of the accordion are expanded or collapsed, enhancing the user experience by organizing content in a compact and accessible manner.

<Sandbox name="use-accordion" code={useAccordionBase}/>

You can use this action by attaching it to your accordion component and passing the necessary parameters. The action will handle the toggling of sections based on user interaction.

## Parameters

| parameter | type      | default | description                                    |
| --------- | --------- | ------- | ---------------------------------------------- |
| multiple  | `boolean` | `false` | Allow multiple sections to be open             |
| readOnly  | `boolean` | `false` | Make the accordion non-interactive (read-only) |

## Return

| parameter | type                             | description                         |
| --------- | -------------------------------- | ----------------------------------- |
| values    | `(string \| number)[]`           | Array of opened section identifiers |
| toggle    | `(id: string \| number) => void` | Function to open/close a section    |
