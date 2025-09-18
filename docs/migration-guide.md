---
title: migration guide
subtitle: Learn how to migrate to legacy version to current lapikit
head:
  title: migration guide
  description: "Discover the Lapikit 0.2.3 to 0.2.4 migration guide. Learn how to easily update your configuration, breakpoints, themes, and CLI with this comprehensive tutorial."
style:
  icon: mgc_union_line
state:
  section: base
  published: true
  recommended: false
  order: 4
  status: new
github:
  url: /migration-guide.md
---

<script>
    import { Sandbox, CommandLine } from '$lib/components/index.js';
    // codes
    import ExampleConfigurationLapikit from "$lib/components/docs/example-configuration-lapikit.js?raw";
</script>

Lapikit **0.2.4** introduces major improvements to the configuration system, theming, and CLI.

This guide explains all breaking changes and new features so you can migrate smoothly.

## CLI changes

**Before (≤ 0.2.3):**

<CommandLine name="legacy-intall-lapikit" command="npx lapikit init"/>

**Now (≥ 0.2.4):**

<CommandLine name="new-intall-lapikit" command="npx lapikit"/>

The command no longer requires init.
Running it will prompt you with options to customize the installation and generate configuration files automatically.

By default, a config file will be created at: `src/plugins/lapikit.(js|ts)`

## New configuration format

Lapikit now uses the `createLapikit()` function for configuration.
This centralizes customization for:

- themes
- variables
- breakpoints
- store integration

 <Sandbox name="example-configuration-theme" code={ExampleConfigurationLapikit}/>

## Breakpoints & runes

mobileBreakpoint, tabletBreakpoint, laptopBreakpoint → replaced by a devices object.

Breakpoint values are now in px instead of rem strings.

You can now use Lapikit runes to access breakpoints directly in your code (JS/TS) without relying solely on CSS.

**Example: use breakpoint runes in components to dynamically show/hide elements.**

## Theming system

Themes have been redesigned:

Each theme is now independent, making it easier to create multiple styles.

You can override colors, variables, and design tokens per theme.

Font theming is now supported, allowing custom typography settings.

## Device classes

Utility classes for devices have changed.

**Before:**

```css
.hidden-mobile
.display-tablet
.display-laptop
```

**Now:**

```css
.kit-device--d-mobile
.kit-device--h-tablet
.kit-device--h-desktop
```

- d = display
- h = hide

## Component CSS scope

All component CSS is now scoped by default.
This means:

Component styles are isolated from global CSS.

No more accidental overrides from your project’s CSS files.

## Summary of migration steps

Replace npx lapikit init with npx lapikit.

Move your config to **src/plugins/lapikit.(js|ts)** and wrap it in **createLapikit()**.

Update breakpoints to the new structure (devices + thresholds).

Replace old utility classes (hidden-_, display-_) with the new `kit-device--*` format.

Migrate themes and fonts into the new independent theme structure.

Restart your dev environment after changes.

## Migration Cheat Sheet

Here’s a quick before/after comparison to help you migrate from Lapikit 0.2.3 to ≥ 0.2.4.

| feature                      | before-version-lapikit-023                                 | after-version-lapikit-024                                                  |
| ---------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------- |
| **CLI**                      | `npx lapikit init`                                         | `npx lapikit` (with prompts for customization)                             |
| **Config file**              | `lapikit.config.js` (root)                                 | \`src/plugins/lapikit.(js \| ts)\`                                         |
| **Config format**            | Plain object export                                        | Wrapped in `createLapikit({})`                                             |
| **Breakpoints - devices**    | `mobileBreakpoint`, `tabletBreakpoint`, `laptopBreakpoint` | `breakpoints.devices = { mobile, tablet, desktop }`                        |
| **Breakpoints - thresholds** | Values as strings (`"40rem"`)                              | Values as px (`640`)                                                       |
| **Using breakpoints**        | Mostly via CSS utility classes                             | Direct access via **Lapikit runes** in JS/TS code                          |
| **Device classes**           | `.hidden-mobile`, `.display-tablet`, `.display-laptop`     | `.kit-device--d-mobile`, `.kit-device--h-tablet`, `.kit-device--h-desktop` |
| **Themes**                   | One global theme object                                    | Multiple independent themes (`themes.light`, `themes.dark`, etc.)          |
| **Fonts**                    | Global font settings                                       | Independent **font themes** (per theme configuration)                      |
| **Component CSS**            | Global styles, risk of override                            | **Scoped CSS** per component, isolated from global styles                  |
