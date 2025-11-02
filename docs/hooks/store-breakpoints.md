---
title: $breakpoints
subtitle: breakpoints store in lapikit
head:
  title: breakpoints stored
  description: "Learn how to use the breakpoints store in Lapikit for responsive design."
state:
  section: hooks
  category: stores
  published: true
github:
  url: /hooks/store-breakpoints.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // actions
    import BreakpointStoredBase from "$lib/components/docs/stores/store-breakpoints.svelte?raw";
</script>

Lapikit exposes a Svelte store called breakpoints.
It always contains a merged version of the default values and your overrides defined in `plugins/lapikit.(js|ts)`.

This allows you to centralize your responsive design thresholds without having to manage the merge logic manually.

<Sandbox name="use-stored-breakpoints" code={BreakpointStoredBase}/>

You can customize all breakpoints directly via the `plugins/lapikit.(js|ts)` configuration file. Feel free to consult the documentation [breakpoints](/docs/breakpoints) provided, which will allow you to see all the options available for adapting Lapikit to your application.
