---
title: Customize
subtitle: "Lapikit styling guide: structure, themes, and breakpoints"
description: Integrate your style and design system into Lapikit components
head:
  title: customize
  description: "Customize your Svelte Lapikit components via the lapikit.config.js file: themes, styles, breakpoints. Fluid styling guaranteed."
style:
  icon: mgc_settings_6_line
state:
  section: base
  published: true
  recommended: true
  order: 3
  status: "updated"
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
    import { Sandbox, CommandLine } from '$lib/components/index.js';
    // components
    import ButtonBase from "$lib/components/docs/button/button-base.svelte";
    import ButtonBaseCode from "$lib/components/docs/button/button-base.svelte?raw";
</script>

By default, Lapikit is inspired by [Material Design v3](https://m3.material.io/) style rules, so as to offer a coherent foundation that can be adapted to the widest possible audience. With Lapikit, you can quickly customize components using the lapikit.config.js file located at the root of your application.

## The structure of lapikit.config.js

Lapikit customization is divided into 4 main parts:

- **Breakpoints**: Device-specific breakpoints and thresholds for responsive design
- **Theme**: Theme management including color schemes and theme definitions
- **Typography**: Font family definitions and typography settings
- **Styles**: Global styling variables and design tokens

### Breakpoints

Breakpoints configuration manages responsive design behavior across different devices.

- **devices** (`{[key: string]: number | string}`)

Define device-specific breakpoints for responsive behavior:

```javascript
breakpoints: {
  devices: {
    mobile: "sm",
    tablet: "md",
    laptop: "lg"
  }
}
```

- **thresholds** (`{[key: string]: number | string}`)

Set the actual breakpoint values that correspond to your device keys:

```javascript
breakpoints: {
  thresholds: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px"
  }
}
```

### Theme

Theme configuration handles color schemes and theme definitions.

- **defaultTheme** (`string`)

Set the default theme to be used by your application.

- **colorScheme** (`boolean`)

Enable or disable automatic color scheme detection based on user preferences.

- **themes** (`FragThemes`)

Define your custom themes with colors and variables:

```javascript
theme: {
  themes: {
    light: {
      dark: false,
      colors: {
        primary: "#6750a4",
        secondary: "#625b71"
      },
      variables: {
        "custom-spacing": "8px"
      }
    },
    dark: {
      dark: true,
      colors: {
        primary: "#d0bcff",
        secondary: "#ccc2dc"
      }
    }
  }
}
```

Each theme can contain:

- **dark** (`boolean`): Whether this is a dark theme
- **colors** (`{[key: string]: {[key: string]: string} | string}`): Color definitions
- **variables** (`{[key: string]: string | number}`): Custom CSS variables

### Typography

Typography configuration manages font families and text styling.

- **defaultTypography** (`string`)

Set the default typography family to be used.

- **fonts** (`FragTypography`)

Define custom font families:

```javascript
typography: {
  fonts: {
    sans: {
      family: ["Inter", "system-ui", "sans-serif"]
    },
    mono: {
      family: "JetBrains Mono"
    }
  }
}
```

### Styles

Global styling configuration for design tokens and variables.

- **styles** (`FragStyles`)

Define global styling variables that can be used throughout your application:

```javascript
styles: {
  spacing: "0.125rem",
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem"
  },
  shadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
}
```

Values can be strings, numbers, or nested objects for complex configurations.

## Example Configuration

Here's a complete example of a lapikit.config.js file:

```javascript
export default {
  breakpoints: {
    devices: {
      mobile: "sm",
      tablet: "md",
      laptop: "lg",
    },
    thresholds: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  theme: {
    defaultTheme: "light",
    colorScheme: true,
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#6750a4",
          secondary: "#625b71",
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: "#d0bcff",
          secondary: "#ccc2dc",
        },
      },
    },
  },
  typography: {
    defaultTypography: "sans",
    fonts: {
      sans: {
        family: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  styles: {
    spacing: "0.125rem",
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
    },
  },
};
```

## Vite.js Plugin

Lapikit provides a Vite plugin to automatically process your configuration and generate the necessary CSS files during the build process.

| parameter        | type     | default       | description            |
| ---------------- | -------- | ------------- | ---------------------- |
| config $required | `string` | `src/plugins` | set configuration path |

**The next steps**

See also the [Breakpoints](/docs/breakpoints) and [Application](/docs/components/application) pages to take full advantage of the visual possibilities.
