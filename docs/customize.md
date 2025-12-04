---
title: Customize
subtitle: "Lapikit styling guide: structure, themes, and breakpoints"
description: Integrate your style and design system into Lapikit components
head:
  title: customize
  description: "Customize your Svelte Lapikit components via configuration file: themes, styles, breakpoints. Fluid styling guaranteed."
state:
  section: base
  category: core
  published: true
  recommended: true
  order: 3
  status: update
github:
  url: /customize.md
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
---

<script>
    import { Sandbox } from '$lib/components/index.js';

    // examples    
    
    import DefaultValueBreakpoints from "$examples/customize/default-value-breakpoints.txt?raw";
    import DefaultValueTresholds from "$examples/customize/default-value-thresholds.txt?raw";
    import DefaultValueThemes from "$examples/customize/default-value-themes.txt?raw";
    import DefaultValueTypography from "$examples/customize/default-value-typography.txt?raw";
    import DefaultValueShape from "$examples/customize/default-value-shape.txt?raw";
    import DefaultValueDialog from "$examples/customize/default-value-dialog.txt?raw";
    import DefaultValueModal from "$examples/customize/default-value-modal.txt?raw";
    import DefaultValueAnimation from "$examples/customize/default-value-animation.txt?raw";
    import DefaultValueStyles from "$examples/customize/default-value-styles.txt?raw";
    import CompleteConfiguration from "$examples/customize/default-configuration.txt?raw";
    import VitePluginImport from "$examples/customize/vite-plugin-import.js?raw";
    import VitePluginUsage from "$examples/customize/vite-plugin-usage.js?raw";
</script>

By default, Lapikit provides a comprehensive design system inspired by modern UI principles, offering a coherent foundation that can be adapted to the widest possible audience. With Lapikit, you can quickly customize components using a configuration file that you specify in the Vite plugin.

## Configuration Setup

Lapikit uses a Vite plugin to process your configuration. You need to:

1. Create a configuration file (TypeScript or JavaScript) [manually or with the CLI](/docs/getting-started)
2. Import and configure the Lapikit Vite plugin
3. Specify the path to your configuration file

**Example `vite.config.ts`:**

<Sandbox name="vite-configuration" code={VitePluginUsage}></Sandbox>

**Default configuration path:** `src/plugins/lapikit.ts`

## Configuration Structure

Lapikit customization is divided into 4 main parts:

- **Breakpoints**: Device-specific breakpoints and thresholds for responsive design
- **Theme**: Theme management including color schemes and theme definitions
- **Typography**: Font family definitions and typography settings
- **Styles**: Global styling variables and design tokens (spacing, shape, dialog, modal, animation)

### Breakpoints

Breakpoints configuration manages responsive design behavior across different devices.

#### devices

**Type:** `{[key: string]: number | string}`

Define device-specific breakpoints for responsive behavior. Values should reference threshold keys.

**Default values:**

<Sandbox name="default-breakpoints" code={DefaultValueBreakpoints}></Sandbox>

#### thresholds

**Type:** `{[key: string]: number | string}`

Set the actual breakpoint values that correspond to your device keys. These define the pixel widths at which your layout adapts.

**Default values:**

<Sandbox name="default-thresholds" code={DefaultValueTresholds}></Sandbox>

### Theme

Theme configuration handles color schemes and theme definitions.

#### defaultTheme

**Type:** `string`  
**Default:** `"light"`

Set the default theme to be used by your application.

#### colorScheme

**Type:** `boolean`  
**Default:** `true`

Enable or disable automatic color scheme detection based on user preferences.

#### themes

**Type:** `FragThemes`

Define your custom themes with colors and variables. Lapikit provides a comprehensive color system organized by semantic categories.

**Color Categories:**

- **label**: Text colors with hierarchy levels (primary, secondary, tertiary, quaternary)
- **accent**: Action and status colors (primary, success, warning, destructive, info)
- **separator**: Border and divider colors (default, opaque)
- **state**: Interactive state colors (placeholder, disabled, link, highlight, shadow)
- **background**: Surface colors with grouping support (primary, secondary, tertiary, grouped)

**Default themes:**

<Sandbox name="default-themes" code={DefaultValueThemes}></Sandbox>

Each theme can contain:

- **dark** (`boolean`): Whether this is a dark theme
- **colors** (`{[key: string]: {[key: string]: string} | string}`): Color definitions organized by semantic categories
- **variables** (`{[key: string]: string | number}`): Custom CSS variables for theme-specific customization

### Typography

Typography configuration manages font families and text styling.

#### defaultTypography

**Type:** `string`  
**Default:** `"default"`

Set the default typography family to be used.

#### fonts

**Type:** `FragTypography`

Define custom font families with support for sans-serif, monospace, and serif font stacks.

**Default configuration:**

<Sandbox name="default-typography" code={DefaultValueTypography}></Sandbox>

### Styles

Global styling configuration for design tokens and variables.

**Type:** `FragStyles`

Define global styling variables that can be used throughout your application. The styles object supports multiple categories of design tokens.

#### spacing

**Type:** `string`  
**Default:** `"0.125rem"` (2px)

Base spacing unit used throughout the component system.

#### shape

**Type:** `{[key: string]: string | number}`

Border radius values for different component sizes.

**Default values:**

<Sandbox name="default-shape" code={DefaultValueShape}></Sandbox>

#### dialog

**Type:** `{[key: string]: string | number}`

Maximum width values for dialog components.

**Default values:**

<Sandbox name="default-dialog" code={DefaultValueDialog}></Sandbox>

#### modal

**Type:** `{[key: string]: string | number}`

Maximum width values for modal components.

**Default values:**

<Sandbox name="default-modal" code={DefaultValueModal}></Sandbox>

#### animation

**Type:** `{[key: string]: string | number}`

Animation timing and duration values.

**Default values:**

<Sandbox name="default-animation" code={DefaultValueAnimation}></Sandbox>

**Complete styles example:**

<Sandbox name="default-styles" code={DefaultValueStyles}></Sandbox>

## Example Configuration

Here's a complete example of a configuration file (`src/plugins/lapikit.ts`) with all default values:

<Sandbox name="complete-configuration" code={CompleteConfiguration}></Sandbox>

## Vite Plugin Configuration

Lapikit provides a Vite plugin to automatically process your configuration and generate the necessary CSS files during the build process.

**Import:**

<Sandbox name="vite-plugin-import" code={VitePluginImport}></Sandbox>

**Usage:**

<Sandbox name="vite-plugin-usage" code={VitePluginUsage}></Sandbox>

**Plugin Options:**

| Parameter | Type     | Default                  | Description                                                        |
| --------- | -------- | ------------------------ | ------------------------------------------------------------------ |
| config    | `string` | `src/plugins/lapikit.ts` | Path to your Lapikit configuration file (relative to project root) |

**The next steps**

See also the [Breakpoints](/docs/breakpoints) and [Application](/docs/components/application) pages to take full advantage of the visual possibilities.
