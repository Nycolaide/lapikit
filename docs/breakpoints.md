---
head:
  title: breakpoints
  description: "Configure your responsive breakpoints with Lapikit. Use in CSS components and styles for a fluid UI"
icon: mgc_layout_10_line
title: breakpoints
section: base
order: 2
keywords:
  - tresholds
  - breakpoints
  - size screen
  - customize breakpoints
  - customize treshold
  - tailwindCSS
  - unoCSS
published: true
---

<script>
    import { Sandbox, CommandLine } from '$lib/components/index.js';
    // codes
    import UpdateConfigBreakpoints from "$lib/components/docs/update-breakpoints.ts?raw";
    import UpdateConfigBreakpointsDevice from "$lib/components/docs/update-breakpoints-device.ts?raw";

    // components
    import ButtonDensity from "$lib/components/docs/button/button-density.svelte";
    import ButtonDensityCode from "$lib/components/docs/button/button-density.svelte?raw";

    // command line
    const commandInstall = [
        {pkg: "npm", command: ["npm i -D lapikit", "npx lapikit init"]},
        {pkg: "yarn", command: ["yarn add -D lapikit", "npx lapikit init"]},
    ];
    const commandInstallWithoutCLI = [
        {pkg: "npm", command: "npm i -D lapikit"},
        {pkg: "yarn", command: "yarn add -D lapikit"},
    ];
</script>

Define component display according to the display size of your application. Each Lapikit component offers APIs that are compatible with these breakpoints.

| key     | size   | device     |
| ------- | ------ | ---------- |
| default | 0      |            |
| xs      | 28rem  |            |
| sm      | 40rem  | max mobile |
| md      | 48rem  | tablet     |
| lg      | 64rem  | min laptop |
| xl      | 80rem  |            |
| 2xl     | 96rem  |            |
| 3xl     | 112rem |            |

## Using breakpoints in classes

Lapikit uses the same mobile-first writing logic as TailwindCSS for managing classes with breakpoints. We ensure that all classes are functional, and then add breakpoints that modify the display according to screen size with `{breakpoint}:{class}`.

**Breakpoint example:**

- `.kit-btn-density-comfortable` is displayed for **all** screen sizes.
- `.kit-btn-density-comfortable .md:kit-btn-density-default` modifies the density display if the display varies between **default** and **md**.

## Using breakpoints in the APIs of Lapikit components

Using breakpoints in the APIs of Lapikit components
Each component offers certain so-called responsive APIs. They accept several parameters based on the keys available in your Lapikit **threshold configuration**.

Here's an example with the [Button](/docs/componnents/button) component and the **density** API.

<Sandbox name="button-density-sandbox" code={ButtonDensityCode}>
	{#snippet component()}
		<ButtonDensity/>
	{/snippet}
</Sandbox>

## Customize breakpoints

Lapikit offers advanced breakpoint customization. You can add and modify keys so you can use them in your application.

To do this, edit your `lapikit.config.js` file and modify or add the breakpoint key, then the thresholds key.

<Sandbox name="update-config-breakpoints" code={UpdateConfigBreakpoints}/>

> [!NOTE]
> It's advisable to restart your environment after this kind of modification to ensure that all Lapikit styles are updated.

## Adapting breakpoints to the device

Lapikit also offers device breakpoints, so you can define a display for just one type of device, or several in succession. This allows you to display, for example, a BottomNavigation for mobiles, followed by an AppBar for tablets and computers.

Here is the list of available classes:

- (hidden|display)-mobile
- (hidden|display)-tablet
- (hidden|display)-laptop

### Customize breakpoint devices keys

In the Lapikit configuration file (`lapikit.config.js`), edit or add the following keys in breakpoints

<Sandbox name="update-config-breakpoints-device" code={UpdateConfigBreakpointsDevice}/>

You need to base them on the keys you have in thresholds
