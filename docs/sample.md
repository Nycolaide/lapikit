---
title: title
description: description.
date: "2025-4-22"
categories:
  - sveltekit
  - svelte
published: true
---

<script>
  import { ComponentPreview, CommandLine, Counter } from "$lib/components/index.js";
  import CounterCode from '$lib/components/counter.svelte?raw';

  const commandInstall = [
    {pkg: "npm", command: "npm i -D lapikit"},
    {pkg: "yarn", command: "yarn add -D lapikit"}
  ];
</script>

# h1

<ComponentPreview name="counter" component={Counter} code={CounterCode}/>

## h2

<CommandLine name="intall-lapikit" command={commandInstall}/>

### h3

#### h4

##### h5

###### h6

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur blandit lacus id varius. **Nunc convallis** sit amet odio at vestibulum. Praesent eget efficitur eros. Suspendisse eget libero et **magna efficitur blandit**. Nulla accumsan nulla risus. Suspendisse ac turpis sed lorem lacinia euismod. Quisque commodo elementum dolor eget bibendum. Nunc eget ~~pulvinar ex~~. Proin pretium vitae eros ut sagittis. Proin non ultricies eros. Donec vulputate ut velit ut imperdiet. Duis eget feugiat ex. Mauris tempor ipsum turpis, id tincidunt magna eleifend ac. _Duis lobortis ultricies sem, id varius nibh ornare quis. Fusce venenatis mauris vel elit vulputate, nec ullamcorper nulla placerat. Duis eget eleifend nunc_.

Aenean gravida `cursus fringilla`. Nam quis aliquam neque, id lacinia est. Aenean in fermentum neque. Aenean sit amet lacinia ante. Etiam ultrices varius lorem, nec interdum neque aliquet et. Vivamus libero sapien, semper a fringilla<sub>sub</sub> eget, finibus quis quam. <ins>Pellentesque habitant</ins> morbi tristique senectus et netus et malesuada fames ac turpis egestas<sup>sup</sup>.

```javascript
console.log("Hello World!");
```

> Text that is a quote

This site was built using [svelte](https://svelte.dev).

![Screenshot of a comment on a GitHub issue showing, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://myoctocat.com/assets/images/base-octocat.svg)

- George Washington

* John Adams

- Thomas Jefferson

1. James Madison
2. James Monroe
3. John Quincy Adams

Lorem ipsum

1. First list item
   - First nested list item
     - Second nested list item

- [x] #739
- [ ] https://github.com/octo-org/octo-repo/issues/740
- [ ] Add delight to the experience when all tasks are complete :tada:

@octocat :+1: This PR looks great - it's ready to merge! :shipit:

> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!TIP]
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
> Advises about risks or negative outcomes of certain actions.

<!-- This content will not appear in the rendered Markdown -->

```ts
function greet(name: string) {
  console.log(`Cli ${name}! 👋`);
}
```
