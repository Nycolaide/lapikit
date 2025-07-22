---
head:
  title: customize
  description: "Customize your Svelte Lapikit components via the lapikit.config.js file: themes, styles, breakpoints. Fluid styling guaranteed."
icon: mgc_settings_6_line
title: Customize
subtitle: "Lapikit styling guide: structure, themes, and breakpoints"
description: Integrate your style and design system into Lapikit components
section: base
order: 3
keywords:
  - css
  - themes
  - design system
  - designsystem
  - tailwindCSS
  - UnoCSS
  - Sass
  - Scss
  - Less
  - PostCSS
  - themes
  - colors
  - configuration
  - settings
  - customize
published: true
---

<script>
    import { Sandbox, CommandLine } from '$lib/components/index.js';
    // components
    import ButtonBase from "$lib/components/docs/button/button-base.svelte";
    import ButtonBaseCode from "$lib/components/docs/button/button-base.svelte?raw";

    // command line
    const commandInstall = [
        {pkg: "npm", command: "npm i -D lapikit"},
        {pkg: "yarn", command: "yarn add -D lapikit"}
    ];
</script>

By default, Lapikit is inspired by [Material Design v3](https://m3.material.io/) style rules, so as to offer a coherent foundation that can be adapted to the widest possible audience. With Lapikit, you can quickly customize components using the lapikit.config.js file located at the root of your application.

## The structure of lapikit.config.js

Lapikit customization is divided into 4 main parts:

- **Options**: These are settings mainly for Vite.js and CSS rendering
- **Theme**: This is Lapikit's own design system, which you can adapt to inherit from your own design system
- **Breakpoints**, which supports adaptive design and device-dependent display classes.
- **Styles**, which encompass all display management for typography, spacing and rounding.

### Options

Options ensure that Lapikit style files are correctly formatted for your application.

- **normalize** (`boolean`) : `true`

Add style resets to format basic browser styles. These CSS resets are based on the necolas [normalize.css](https://necolas.github.io/normalize.css/) file.

- **minify** (`boolean`) : `false`

Minifies all component styles to reduce overall file size.

### Themes

- **colorScheme** (`light` | `dark` | `system`): `system`

Lapikit offers direct theme management based on the user configuration of the operating system. This feature is based on prefers-color-scheme in reference to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

The options available:

- _`light`_: force Lapikit theme to be displayed in light color
- _`dark`_: force Lapikit theme to be displayed in dark color
- _`system`_: ensures availability of dark and light themes for use according to user configuration.

This functionality is complemented by colorSchemeSystem, colorScheme andsetColorScheme utilities.

- **colors** (`[key: string]: string | {light: string, dark: string}`) : presets

Lapikit uses default colors, based on Material Design v3. All colors are converted to oklch and provide your application with CSS variables for using theme colors. If your colorScheme configuration in Lapikit is based on `system`, each variable adapts dynamically according to the colorScheme.

for each color key in Lapikit's configuration, you have 2 choices:

- _`string`_: the color defined will be set for both theme shades.
- _`{ light: string , dark: string }`_: the color will be specific to each color chart.

Colors must be defined in either `x11`, `hexadecimal`, `rgb`, `css variables` or `oklch` format.

> [!INFO]
> Other formats will be supported as Lapikit develops.

### Breakpoints

Lapikit is based on TailwindCSS breakpoints and not Material Design v3, as we feel that TailwindCSS breakpoints are better suited to the needs of developers in general. These parameters are fully customizable.

> [!WARNING]
> We rely on the TailwindCSS reference for breakpoints, but do not depend on it. If you modify the breakpoints in TailwindCSS, you'll have to modify them in Lapikit too.

In order to propose display classes, we have included breakpoint variables for 3 device types:

- **mobileBreakpoint** (`string`): `sm`
  Breakpoint for mobiles
- **tabletBreakpoint** (`string`): `md`
  Breakpoint for tablets
- **laptopBreakpoint** (`string`): `lg`
  Breakpoint for computers

Each variable is based on the key names defined in thresholds.

- **thresholds** (`[key: string]: string`): `presets`

Lapikit supports 8 breakpoints by default, which you can add or modify. Components use these breakpoint keys for the various adaptive classes specific to each component.

To find out more, visit the [breakpoints page](/docs/breakpoints).

### Styles

- **spacing** (`string`): `0.125rem`

Defines the default space for all margins, padding and sizes of Lapikit components via the `--kit-spacing` variable

**Corner**

- **active** (`boolean`): `true`

Enable or disable `--kit-radius-*` variables

- **radius** (`[key: string]: string | number`): `presets`

All rounding available for Lapikit components and globally via `--kit-radius-*` variables

- **font** (`[key: string]: string | Array<string>`): `presets`

Lapikit predefines default fonts for standard use via _sans_, _mono_ and _serif_ variables. They are available globally via CSS variables `--kit-font-family-*`.

**The next steps**

See also the [Breakpoints](/docs/breakpoints) and [Application](/docs/components/application) pages to take full advantage of the visual possibilities.
