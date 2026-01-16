---
title: Changelog
subtitle: 'Lapikit changelog: latest added, fixes and improvements'
description: Find all the changes in the Lapikit release notes
head:
  title: changelog
  description: 'Follow the latest Lapikit developments, updates and fixes. Transparency and continuous improvement for your components.'
state:
  section: base
  published: true
  order: -1
keywords:
  - version
  - npm
---

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.6] - 2026-01-16

### Updated

- Replace addons `code` new component Repl with prefix `kit:repl` ( preview )
- Update preprocess Lapikit with update @lapikit/repl package

## [0.3.5] - 2026-01-07

### Added

- Evolution to new Lapikit Preprocess with dynamic import for all components
- Support fort external components with plugins system
- Add new entry bundler for lapikit preprocess
- Integrate new component Code with prefix `lpk:code` ( preview )
- Add new path for repl features
- Create new package @lapikit/repl for lapikit repl components

## [0.3.4] - 2026-01-05

### Fixed

- Fix critical bug on new preprocess Lapikit (lili)

## [0.3.3] - 2026-01-02

### Added

- Add new path for labs features
- Lili has new preprocessor Lapikit for sveltekit
- Integrate new component Btn with prefix `lpk:btn` ( preview )
- Add new entry bundler for lapikit preprocess

### Fixed

- Fixed all conflict to vite-plugin-svelte 5.x to 6.x

## [0.3.2] - 2025-12-20

The Lapikit team wishes you a happy holiday season 🎉, It's last release for 2025. Thank's for you interest to lapikit project !

2026 will be full of new features and components for Lapikit. See you next year !

### Added

- Add new path for labs features
- Lili comming soon...

### Updated

- Update dependencies

## [0.3.1] - 2025-12-11

### Updated

- Update Lapikit structure with sveltekit library mode
- Apply normalize sveltekit config [#14240 sveltejs](https://github.com/sveltejs/kit/discussions/14240)
- Update dependencies

## [0.3.0] - 2025-12-04

Update Lapikit and Lapikit Docs with new design system and new components !

## [0.2.8] - 2025-12-04

### Fixed

- Fix bad color shadow for overlay **Modal** and **Dialog** component
- Fix **ripple** effect not heriting shape border radius on component all components used ripple effect
- Fix bad import types for _styles_ and _themes_ on Lapikit configuration

## [0.2.7] - 2025-10-18

### Fixed

- Fix bad variables for component **Separator** color
- Fix **critical crash** if _esm-env_ not working on SSR environment, remove import BROWSER from 'esm-env' ( Scroll function and App component ).

## [0.2.6] - 2025-10-01

### Added

- Update props orientation for component **Separator** for use media queries

### Fixed

- Fix component Icon colors not working with custom color
- Fix component Card bad color variables background and border

## [0.2.5] - 2025-09-21

### Added

- New store **viewport** for use breakpoint on viewport width and height

### Changed

- Update component **App** with event listerner for update viewport store
- Update component **Toolbar** to remove border-radius auto calculation

## [0.2.4] - 2025-09-18

Reduce 16% size to Lapikit package with new core (265kb to 222kb)

### Added

- New core **Lili** for Lapikit to use scoped CSS on all components
- Reduce CSS sizes with new media queries controls
- Add standardColors core
- New CI with installation more explicite and configuration
- New system theme for more customization on Lapikit

### Changed

- Update all variables roots CSS with new standard
- Update theme controller with plugin lapikit.ts or js
- Optimisation to Vite plugin

### Fixed

- Reduce bad latency for build project with lapikit
- Reduce latency and time for dev environements

## [0.2.3] - 2025-08-31

### Added

- Store **breakpoint** for use _mediaQueries_ on your application
- Store **devices** for use breakpoint on viewport

### Changed

- Update function for change _theme_ and _colorScheme_

## [0.2.2] - 2025-08-20

### Added

- New CI for install **Lapikit** with package _prompts_
- Add experimental for new core **Lapikit**
- Add **Chip** component style with new props _readonly_ ([#34](https://github.com/Nycolaide/lapikit/issues/34))

### Fix

- Fix **Modal** component if open , create bad display on container on modal
- Fix **Alert** display content not working because line-height 0 for alls grids elements
- Fix **Dialog** position responsive not working ([[#36](https://github.com/Nycolaide/lapikit/issues/36)])
- Fix **Modal** position responsive not working ([[#36](https://github.com/Nycolaide/lapikit/issues/36)])

## [0.2.1] - 2025-07-31

### Added

- Create **Texfield** component

### Fix

- Fix **Alert** component bad position content and style not working with bad className.
- Fix **Chip** component bad content alignement with prepend and append snippet.
- Fix **Chip** component on outline style background transparent...
- Fix **Button** component on outline style background transparent...

## [0.2.0] - 2025-07-26

- The Lapikit documentation is officially online at [lapikit.dev](https://lapikit.dev).

## [0.1.15] - 2025-07-22

### Changed

- Add more contraste on overlay global
- Remove default role on **Appbar** component
- Update CI install Lapikit with good futur url for lapikit website

### Fix

- Fix rest.property on **Modal** component

## [0.1.14] - 2025-06-27

### Fix

- Fix _Ripple effect_ out of the box for shape properties
- Fix bad display for **Button**, **Card**, **ListItem** and **Chip** for anchor type
- Fix bad `color-scheme` used if use specific theme

## [0.1.13] - 2025-06-24

### Changed

- Disabled all transition colors , background color for all component Lapikit, wait new design system

## [0.1.12] - 2025-06-12

### Fix

- Fix content grid for **Alert** component

## [0.1.11] - 2025-06-06

### Changed

- Update structure CSS for component **Chip**
- Add new properties CSS for component **Btn**
- Add new structure for HTML render on **Chip**
- Integrate good color system for all component
- Add color base on html CSS
- API background, color support `transparent`, `initial`, `inerith`
- Add append and prepend snippet on **ListItem**

### Fix

- Repare CSS for outline props on **Btn**
- Fix alignement for **Chip**, **Btn** component content

## [0.1.10] - 2025-06-04

### Changed

- Update variables size on component **Icon**
- Update name component **Btn** to **Button**
- Optimize CSS **Button**
- Redifine logic variables for component **Button**
- Add new effect `Ripple`

## [0.1.9] - 2025-06-01

### Changed

- Update breakpoint devices for mobile and laptop
- Update component **App** with init directly a colorScheme system
- Update store for `colorScheme` and add `colorSchemeSystem` for refer color used on device.
- Add new event listener for update `colorSchemeSystem` directly

### Fix

- Delete message on **App** component
- Fix hidden and display mobile not working correctly

## [0.1.8] - 2025-05-23

### Added

- Create **Spacer** component
- Create **Appbar** component

### Changed

- New logic for utils class devices
- Change props `image` to `src` on **Avatar** component

### Fix

- Delete duplicate card css on **Toolbar**
- Size compact **Toolbar** and **Btn** not working
- Fix size **List** on orientation `horizontal`
- Fix size ref for **Btn**
- Scroll not working on **Modal** container
- DisabledScroll not working if **Modal** is open

## [0.1.7] - 2025-05-18

### Added

- Create **Toolbar** component
- Create **Card** component
- Create **Chip** component

## [0.1.6] - 2025-05-16

### Added

- Create **Avatar** component
- Create **AspectRatio** component
- Create **Alert** component
- Create **Accordion** component

## [0.1.5] - 2025-05-14

### Added

- Create **Modal** component
- Create **Separator** component

### Changed

- Add `$bindable` ref on **Dialog** component
- Add `overlay` on **App** component global
- Create global store

### Fix

- Fix **Dialog** size not working

## [0.1.4] - 2025-05-12

### Added

- Create **Dialog** component

## [0.1.3] - 2025-05-10

### Added

- Create **Dropdown** component
- Create **Tooltip** component
- Create **Popover** component

## [0.1.2] - 2025-05-08

### Added

- Create **Icon** component

### Changed

- Change size format for **Btn**
- Add new props for load and loading state for **Btn** component

## [0.1.1] - 2025-05-07

### Added

- Create **App** component for generate and control `colorScheme` in all component lapikit
- Create **Btn** component

### Changed

- Update presets with alternavite color on base
- Add new class for theme and disable class for element generic

## [0.1.0] - 2025-05-06

### Added

- Create bin lapikit for install and configuration lapikit
- Add Roadmap for lapikit

## [0.0.4] - 2025-05-05

### Added

- Connect external api for load custom config
- Add hot reload with edit lapikit.config.js
- Optimize css
- Add interface type

### Changed

- New structural lapikit
- Refacto

## [0.0.3] - 2025-05-01

### Added

- Add devices class
- Add media queries devices

### Fixed

- Bug to generate devices class

## [0.0.2] - 2025-04-27

### Added

- Integrate theming colors and class
- Support oklch colors and structural css

## [0.0.1] - 2025-04-25

### Added

- Create plugin vite.js for lapikit
- Add parser config for lapikit
- Generate and write css with local config

## [0.0.0] - 2025-04-20

### Added

- Create [Lapikit](https://github.com/Nycolaide/lapikit)
