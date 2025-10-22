---
title: breakpoints
subtitle: "Responsive breakpoints in Lapikit: how to use and customize"
head:
  title: breakpoints
  description: "Manage the reactivity of your Lapikit components with customizable breakpoints. Easily adapt to all devices."
style:
  icon: mgc_layout_10_line
state:
  section: base
  published: true
  recommended: true
  order: 2
github:
  url: /breakpoints.md
keywords:
  - tresholds
  - breakpoints
  - size screen
  - customize breakpoints
  - customize treshold
  - tailwindCSS
  - unoCSS
---

<script>
    import { Sandbox, CommandLine } from '$lib/components/index.js';
    // codes
    import UpdateConfigBreakpoints from "$lib/components/docs/update-breakpoints.ts?raw";
    import UpdateConfigBreakpointsDevice from "$lib/components/docs/update-breakpoints-device.ts?raw";

    // components
    import ButtonDensity from "$lib/components/docs/button/button-density.svelte";
    import ButtonDensityCode from "$lib/components/docs/button/button-density.svelte?raw";
</script>

Define component display according to the display size of your application. Each Lapikit component offers APIs that are compatible with these breakpoints.

The following table lists the default breakpoint keys, their pixel values, and the device types they correspond to:

| key     | size   | device      |
| ------- | ------ | ----------- |
| default | 0      |             |
| xs      | 28rem  |             |
| sm      | 40rem  | max mobile  |
| md      | 48rem  | tablet      |
| lg      | 64rem  | min desktop |
| xl      | 80rem  |             |
| 2xl     | 96rem  |             |
| 3xl     | 112rem |             |

## Using breakpoints in classes

Lapikit uses the same mobile-first writing logic as TailwindCSS for managing classes with breakpoints. We ensure that all classes are functional, and then add breakpoints that modify the display according to screen size with `{breakpoint}:{class}`.

**Breakpoint example:**

- `.kit-btn-density-comfortable` is displayed for **all** screen sizes.
- `.kit-btn-density-comfortable .md:kit-btn-density-default` modifies the density display if the display varies between **default** and **md**.

## Using breakpoints in the APIs of Lapikit components

Using breakpoints in the APIs of Lapikit components
Each component offers certain so-called responsive APIs. They accept several parameters based on the keys available in your Lapikit **threshold configuration**.

Here's an example with the [Button](/docs/components/button) component and the **density** API.

<Sandbox name="button-density-sandbox" code={ButtonDensityCode}>
	{#snippet component()}
		<ButtonDensity/>
	{/snippet}
</Sandbox>

## Customize breakpoints

Lapikit offers advanced breakpoint customization. You can add and modify both devices and thresholds so that your app stays fully adaptive.

To do this, edit your `plugins/lapikit.(ts|js)` file and configure breakpoints inside the **createLapikit()** call. You can visit [customize](/docs/customize) pages for discover all options to lapikit customization.

<Sandbox name="update-config-breakpoints" code={UpdateConfigBreakpoints}/>

> [!INFO]
> It’s advisable to restart your environment after this kind of modification to ensure that all Lapikit styles are updated.

## Adapting breakpoints to the device

Lapikit also offers device breakpoints, so you can define a display for just one type of device, or several in succession. This allows you to display, for example, a BottomNavigation for mobiles, followed by an AppBar for tablets and computers.

Here is the list of available classes:

- kit-device--(d|h)-mobile
- kit-device--(d|h)-tablet
- kit-device--(d|h)-desktop

And your custom breakpoints devices use this format class : `kit-device--(d|h)-{device}`.

### Customize breakpoint devices keys

Lapikit is built to adapt, not dictate.
If the default mapping between devices and thresholds doesn’t match your design system, you can fully customize it via the _devices_ config.

Here’s how you might redefine which breakpoints count as **mobile**, **tablet**, **desktop** or **custom**:

<Sandbox name="update-config-breakpoints-device" code={UpdateConfigBreakpointsDevice}/>

This gives you full control over what **mobile** or **tablet** means in your app, keeping your responsive logic aligned with your design tokens or product specs.
.

To find out more, discover how Lapikit [styles](/docs/customize) adapt to your [customized breakpoints](/docs/breakpoints).
