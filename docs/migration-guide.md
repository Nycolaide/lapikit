---
title: migration guide
subtitle: Migration guide for move from Legacy Lapikit to the Latest Version
head:
  title: Lapikit migration guide
  description: "Migrate from older Lapikit to recent versions. Find all the steps for updating. If necessary, contact the team Lapikit."
state:
  section: base
  published: true
  recommended: false
  order: 4
github:
  url: /migration-guide.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';
    // codes
    import ExampleConfigurationLapikit from "$lib/components/docs/example-configuration-lapikit.js?raw";
</script>

Learn how to migrate from older Lapikit versions to the latest release.
Lapikit **v0.2.4** introduces major changes to configuration, theming, and the CLI.

This guide explains what changed, why it matters, and how to update your setup step by step.

## CLI changes

| Before (≤ 0.2.3)   | After (≥ 0.2.4) |
| ------------------ | --------------- |
| `npx lapikit init` | `npx lapikit`   |

The CLI no longer needs init.

Running `npx lapikit` will guide you through setup and automatically create your configuration files.

By default, a config file is generated at: `src/plugins/lapikit.(js|ts)`.

This makes installation faster and ensures a consistent structure across projects.

## New configuration format

Lapikit now uses a single entry point: `createLapikit()`.

This simplifies customization and centralizes everything in one place: themes, variables, breakpoints, and store integration.

 <Sandbox name="example-configuration-theme" code={ExampleConfigurationLapikit}/>

## Breakpoints and Hooks

Breakpoints have been restructured for clarity and consistency.

| Before (≤ 0.2.3)                                           | After (≥ 0.2.4)                        |
| ---------------------------------------------------------- | -------------------------------------- |
| `mobileBreakpoint`, `tabletBreakpoint`, `laptopBreakpoint` | `devices: { mobile, tablet, desktop }` |

- Breakpoints are now in px instead of rem.
- Lapikit now exposes runes to access breakpoints directly in JS/TS.
- Use them to show or hide elements dynamically, without relying only on CSS

## Theming system

The theme system is now more modular:

- Each theme is independent and can override colors, tokens, and variables.
- You can define custom **font themes**.
- Light and dark modes can be toggled globally or per component.

This approach gives full control without increasing complexity.

## Device utility classes

Device visibility classes have been updated for better naming consistency.

| Before (≤ 0.2.3)                                       | After (≥ 0.2.4)                                                            |
| ------------------------------------------------------ | -------------------------------------------------------------------------- |
| `.hidden-mobile`, `.display-tablet`, `.display-laptop` | `.kit-device--d-mobile`, `.kit-device--h-tablet`, `.kit-device--h-desktop` |

- d = display
- h = hide

## Component CSS scope

All component styles are now **scoped by default**.
This prevents global overrides and keeps each component visually isolated from your app’s global CSS.

## Migration steps summary

1. Replace `npx lapikit init` with `npx lapikit`.
2. Move your config to `src/plugins/lapikit.(js|ts)`.
3. Wrap it in `createLapikit()`.
4. Update breakpoints to use **devices** and **thresholds**.
5. Replace hidden- and display- classes with `kit-device--*`.
6. Update your theme and font structure.
7. **Restart your dev server**.

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

## Need help?

You can find detailed release notes and discussions on [Lapikit GitHub Releases](https://lapikit/docs/changelog).

If something doesn’t work after migration, open an issue or join the discussion on [Discord](https://discord.gg/gn9ZGtDtK4).
The community is active and always open to feedback.
