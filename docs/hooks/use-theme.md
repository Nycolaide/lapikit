---
title: useTheme
subtitle: Discover the useTheme action in Lapikit
introduction: Manages theme switching and keeps dark/light modes in sync across the app
head:
  title: useTheme action
  description: "Learn how to use the useTheme action in Lapikit for dynamic theming."
state:
  section: hooks
  category: actions
  published: true
github:
  url: /hooks/use-theme.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // actions
    import useThemeStoredBase from "$lib/components/docs/actions/use-theme.svelte?raw";
</script>

The `useTheme` function allows you to dynamically change your application's theme by modifying the CSS class applied to the root HTML element. This makes it easy to implement dark or light themes, thereby improving the user experience.

You can use this action by calling `useTheme` with the desired theme name. For example, `useTheme('dark')` will apply the dark theme by adding the corresponding class to the HTML element.

<Sandbox name="use-action-use-theme" code={useThemeStoredBase}/>

You can also customize the storage key in localStorage by passing a second argument to the `useTheme` function. By default, this key is set to `@lapikit/theme`.

You can customize the available themes and their associated styles via the configuration file `plugins/lapikit.(js|ts)`. Check the documentation on [themes](/docs/customize) to discover all the options available to tailor Lapikit to your application.

## Parameters

| parameter      | type     | default          | description         |
| -------------- | -------- | ---------------- | ------------------- |
| name $required | `string` |                  | set the theme name  |
| key            | `string` | `@lapikit/theme` | set the storage key |
