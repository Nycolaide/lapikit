---
head:
  title: title <head>
  description: description <head>
icon: class_icon_mgc
title: title
subtitle: subtitle
description: description
section: section
order: -1
categories:
  - categorie_name
keywords:
  - keyword-1
  - keyword-2
published: true
state: 'updated'
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

## Title H2

<Sandbox name="button-base-sandbox-advanced" code={ButtonBaseCode} presentation>
	{#snippet component()}
		<ButtonBase/>
	{/snippet}
</Sandbox>

Lorem ipsum dolor sit amet ~~consectetur~~ adipisicing elit. Porro, ratione. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam delectus _non alias_, dolores explicabo dignissimos molestias libero quam asperiores cupiditate.
Lorem ipsum dolor sit amet consectetur adipisicing elit. **Porro, ratione**. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam `delectus` non alias, `dolores explicabo dignissimos` molestias libero quam [asperiores cupiditate](https://google.com).

<CommandLine name="intall-lapikit" command={commandInstall}/>

### Title H3

Lorem ipsum dolor sit amet consectetur adipisicing elit.

- Lorem ipsum dolor sit amet consectetur adipisicing elit.
- Lorem ipsum dolor sit [asperiores cupiditate](https://google.com).
- Lorem ipsum dolor sit adipisicing elit.
- Lorem ipsum dolor sit amet consectetur adipisicing elit.

![](/images/material-cover.png?v=1)

## Example

<Sandbox name="button-base-sandbox" code={ButtonBaseCode}>
	{#snippet component()}
		<ButtonBase/>
	{/snippet}
</Sandbox>

## Props

| name          | desc    | default                   | action | type    | type_extend           |
| ------------- | ------- | ------------------------- | ------ | ------- | --------------------- |
| app           | string  | demo                      | hello  | enum    |                       |
| app           | boolean | demo                      | hello  | enum    |                       |
| app $bindable | boolean | demo [link](/docs/avatar) | hello  | Snippet | 'filled' \| 'outline' |
| app           | boolean | demo                      | hello  | enum    |                       |
| app           | boolean | demo                      | hello  | enum    |                       |
| app           | boolean | demo                      | hello  | enum    |                       |
