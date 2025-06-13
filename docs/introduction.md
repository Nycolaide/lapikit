---
icon: "mgc_sticker_line"
title: introduction
description: description.
date: "2025-5-07"
section: "base"
categories:
  - sveltekit
  - svelte
published: true
---

<script>
  import { Sandbox } from '$lib/components/index.js';
  import { ButtonBase, ButtonSize } from "$lib/components/docs/index.js";
  import ButtonBaseCode from "$lib/components/docs/button/button-base.svelte?raw";
  import ButtonSizeCode from "$lib/components/docs/button/button-size.svelte?raw";
</script>

Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ratione. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam delectus non alias, dolores explicabo dignissimos molestias libero quam asperiores cupiditate.

![](/images/material-cover.png)

## Title H2 component

Lorem ipsum dolor sit amet ~~consectetur~~ adipisicing elit. Porro, ratione. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam delectus _non alias_, dolores explicabo dignissimos molestias libero quam asperiores cupiditate.
Lorem ipsum dolor sit amet consectetur adipisicing elit. **Porro, ratione**. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam `delectus` non alias, `dolores explicabo dignissimos` molestias libero quam [asperiores cupiditate](https://google.com).

### Title H3 component

Lorem ipsum dolor sit amet consectetur adipisicing elit.

- Lorem ipsum dolor sit amet consectetur adipisicing elit.
- Lorem ipsum dolor sit [asperiores cupiditate](https://google.com).
- Lorem ipsum dolor sit adipisicing elit.
- Lorem ipsum dolor sit amet consectetur adipisicing elit.

## API

Delectus _non alias_, dolores explicabo dignissimos molestias libero quam asperiores cupiditate, dignissimos molestias libero quam asperiores cupiditate.

| name          | desc                                                                                       | default                                 | action | type    | type_extend           |
| ------------- | ------------------------------------------------------------------------------------------ | --------------------------------------- | ------ | ------- | --------------------- |
| app           | string                                                                                     | demo element [link](https://google.com) | hello  | enum    |                       |
| app           | boolean                                                                                    | demo                                    | hello  | enum    |                       |
| app $bindable | boolean uttonBase, ButtonMediaQueries, ButtonSize, ButtonState, ButtonVariant, ButtonColor | demo [link](/docs/avatar)               | hello  | Snippet | 'filled' \| 'outline' |
| app           | boolean                                                                                    | demo                                    | hello  | enum    |                       |
| app           | boolean                                                                                    | demo                                    | hello  | enum    |                       |
| app           | boolean                                                                                    | demo                                    | hello  | enum    |                       |

Lorem ipsum dolor sit amet ~~consectetur~~ adipisicing elit. Porro, ratione. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam delectus _non alias_, dolores explicabo dignissimos molestias libero quam asperiores cupiditate.
Lorem ipsum dolor sit amet consectetur adipisicing elit. **Porro, ratione**. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam `delectus` non alias, `dolores explicabo dignissimos` molestias libero quam [asperiores cupiditate](https://google.com).

### Evenements

Lorem ipsum dolor sit amet ~~consectetur~~ adipisicing elit. Porro, ratione. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam delectus _non alias_, dolores explicabo dignissimos molestias libero quam asperiores cupiditate.

<Sandbox name="button-base-sandbox" code={ButtonBaseCode}>
	{#snippet component()}
		<ButtonBase/>
	{/snippet}
</Sandbox>

Lorem ipsum dolor sit amet ~~consectetur~~ adipisicing elit. Porro, ratione. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam delectus _non alias_, dolores explicabo dignissimos molestias libero quam asperiores cupiditate.

<Sandbox name="button-size-sandbox" code={ButtonSizeCode}>
	{#snippet component()}
		<ButtonSize/>
	{/snippet}
</Sandbox>

### Other display

<Sandbox name="button-size-sandbox" code={ButtonSizeCode} presentation>
	{#snippet component()}
		<ButtonSize/>
	{/snippet}
</Sandbox>
