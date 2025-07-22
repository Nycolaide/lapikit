---
head:
  title: getting started
  description: "Get started with Lapikit: installation, CI/CD or manual configuration. Everything you need to get your Svelte projects up and running fast."
icon: mgc_compass_line
title: getting Started
subtitle: Getting Started with Lapikit library for Svelte Projects
description: start simply with Lapikit, the component library designed for Svelte 5.
section: base
order: 1
keywords:
  - install
  - tailwind
  - uno css
  - cli
  - typescript
published: true
---

<script>
    import { Sandbox, CommandLine } from '$lib/components/index.js';
    // codes
    import ConfigureViteConfigJS from "$lib/components/docs/configure-vite.config.js?raw";
    import AddDefaultConfigLapikit from "$lib/components/docs/add-default-config-lapikit.ts?raw";
    import AddStyle from "$lib/components/docs/import-style.txt?raw";
    import AddLayerTailwindCSSStyle from "$lib/components/docs/tailwindcss-layer-style.txt?raw";


    // components
    import ButtonBase from "$lib/components/docs/button/button-base.svelte";
    import ButtonBaseCode from "$lib/components/docs/button/button-base.svelte?raw";

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

Every component is designed to work immediately, without complex configuration. Powered by Runes, Lapikit leverages the latest evolutions in Svelte to deliver optimal performance, a fluid development experience and total control over styles.

Ideal for starting up a project or integrating reliable components into an existing base.

## Installing Lapikit

### With CLI

Install Lapikit on your project quickly with your package manager.

<CommandLine name="intall-lapikit" command={commandInstall}/>

### Manually

1. Install the Lapikit package via your favorite package manager
   <CommandLine name="intall-lapikit-manually" command={commandInstallWithoutCLI}/>
2. In the `vite.config.js` file, Import Lapikit as a Vite plugin
   <Sandbox name="configure-vite-config-js" code={ConfigureViteConfigJS}/>
3. Create the file `lapikit.config.js` and add the default code
   <Sandbox name="add-default-config-lapikit" code={AddDefaultConfigLapikit}/>
4. Import the Lapikit style
   In your (index/+page/+layout).svelte or main.(css/scss/less) add the style import
   <Sandbox name="add-style-in-svelte" code={AddStyle}/>

After installation and initialization on your app, you can import Lapikit components into your Svelte files.

## Example of use

Take the button component, with Lapikit it's very easy to use. All you have to do is ...

<Sandbox name="button-base-sandbox" code={ButtonBaseCode}>
	{#snippet component()}
		<ButtonBase/>
	{/snippet}
</Sandbox>

## A library that adapts to your projects

Lapikit components offer a complete style that can be customized in a variety of ways. Each class depends on an attribute to avoid possible conflicts with other packages within your app. Each component that renders an HTML element exposes props and classes that you can use to apply styles to the element specifically or globally.

### Using standard styles

Components have specific CSS classes and variables. These classes and variables are based on the following nomenclature:

- For classes, they all start with `.kit-*`
- For variables, they all start with `--kit-*`

Customization is our priority.

Components support at least the id, class and style attributes, and it is possible to have advanced attributes such as classContent to ensure the application of custom class on child elements internal to the component.

### Lapikit styles with TailwindCSS or UnoCSS

Lapikit plays nice with utility-first CSS frameworks.

Using TailwindCSS or UnoCSS? You can pass your classes directly to any Lapikit component. No hacks. No overrides. Just class composition the way it should be.

`padding-4 text-sm hover:bg-muted/70` Go for it. It's all yours.

> [!INFO]
> If you're using TailwindCSS v4, we strongly recommend importing Lapikit’s base styles inside `@layer components`. This ensures proper layering and avoids specificity wars.

<Sandbox name="tailwindcss-layer-config-lapikit" code={AddLayerTailwindCSSStyle}/>

Minimal friction. Maximum control.

## TypeScript support in Lapikit

Lapikit is written entirely in TypeScript, no opt-in, no half-measures. Just types, everywhere.
If you're using a TypeScript setup, you'll get:

- Autocomplete that actually knows what you're doing
- Props, slots, and events fully typed out
- Safer refactors, fewer silent breaks
- Better DX out of the box with editors like VS Code

No need to guess if a prop exists. No need to dig through the docs. Just hover, and go.

**Next steps**

Once installed, explore [settings management](/docs/customize) and [breakpoint configuration](/docs/breakpoints) in your projects.

You can consult all the components available on the [Components](/docs/components) page to go further in building your interface.
