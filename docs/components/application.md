---
head:
  title: Application
  description: "The App component is Lapikit's central provider. Manage themes, global styles and overlays for all your Svelte components"
title: Application
section: components
order: 0
keywords:
  - provider
  - app
  - structure
published: true
---

<script>
    import { Sandbox, CommandLine } from '$lib/components/index.js';
    // components
    import ApplicationBase from "$lib/components/docs/application/application-base.svelte?raw";
    import ApplicationForbidden from "$lib/components/docs/application/application-forbidden.svelte?raw";

    // command line
    const commandInstall = [
        {pkg: "npm", command: "npm i -D lapikit"},
        {pkg: "yarn", command: "yarn add -D lapikit"}
    ];
</script>

The App component is Lapikit's entry point. It must surround all the Lapikit components you use. It acts as a global provider, initializing and centralizing everything Lapikit needs to function properly.

Role of the App component

- Provides and configures global blinds (theme, density, etc.)
- Manages the overlays stack (modals, menus, toasts...)
- Applies global CSS classes to `<body>` (e.g. dark, density-compact)
- Ensures proper contextual operation of Lapikit components

> [!WARNING]
> The App component must always be unique within a given branch of your component tree.

<Sandbox name="application-base-sandbox" code={ApplicationBase}/>

It's perfectly possible to have several `<App>`, as long as they are placed in parallel trees and are not nested.
For example, if you have several independent layouts (e.g. admin / public), you can have an `<App>` in each one:

This allows each section to manage its own overlays and blinds without conflict.

> [!IMPORTANT]
> Never nest one Lapikit `<App>` inside another

This would break internal blinds, causing unexpected behavior and even bugs (overlays that don't close, themes that don't update, etc.).

<Sandbox name="application-forbidden-sandbox" code={ApplicationForbidden}/>

## API References

| props    | type    | description                           | default   | type_extend |
| -------- | ------- | ------------------------------------- | --------- | ----------- |
| children | Snippet | Child content to be displayed in App. | undefined |             |
