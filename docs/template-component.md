---
title: template-accordion
description: template.
date: "2025-06-29"
section: "template"
published: true
---

<script>
  import { Sandbox } from '$lib/components/index.js';
  import { ButtonSize } from "$lib/components/docs/index.js";
  import ButtonSizeCode from "$lib/components/docs/button/button-size.svelte?raw";
</script>

## Template

Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ratione. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam delectus non alias, dolores explicabo dignissimos molestias libero quam asperiores cupiditate.

<Sandbox name="button-size-sandbox" code={ButtonSizeCode} presentation>
	{#snippet component()}
		<ButtonSize/>
	{/snippet}
</Sandbox>
