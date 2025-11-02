---
title: $devices
subtitle: devices store in lapikit
head:
  title: devices stored
  description: "Learn how to use the devices store in Lapikit for responsive design."
state:
  section: hooks
  category: stores
  published: true
github:
  url: /hooks/store-devices.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // actions
    import DeviceStoredBase from "$lib/components/docs/stores/store-devices.svelte?raw";
</script>

Lapikit provides a Svelte store called devices.
It always contains a merged version of the default values and your overrides defined in `plugins/lapikit.(js|ts)`.

These properties allow you to target different types of devices (mobile, tablet, desktop) and adapt your interface accordingly. This makes it easier to create responsive designs and improves the user experience on various devices.

<Sandbox name="use-stored-devices" code={DeviceStoredBase}/>

You can customize all device types directly through the configuration file `plugins/lapikit.(js|ts)`. Feel free to check the provided [devices](/docs/customize) documentation, which will show you all the available options to adapt Lapikit to your application.
