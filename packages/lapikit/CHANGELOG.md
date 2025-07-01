---
head:
  title: changelog
  description: 'Find all the changes in the lapikit release notes'
icon: mgc_version_line
title: Changelog
description: Find all the changes in the lapikit release notes
section: base
order: -1
keywords:
  - version
  - npm
published: true
---

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
