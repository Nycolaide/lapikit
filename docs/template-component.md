---
title: template-accordion
description: template.
date: "2025-06-29"
section: "template"
published: true
---

<script>
  import { Sandbox, CommandLine } from '$lib/components/index.js';
  import { ButtonSize } from "$lib/components/docs/index.js";
  import ButtonSizeCode from "$lib/components/docs/button/button-size.svelte?raw";

const commandInstall = [
    {pkg: "npm", command: "npm i -D lapikit"},
    {pkg: "yarn", command: "yarn add -D lapikit"}
  ];
</script>

## Template

Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ratione. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam delectus non alias, dolores explicabo dignissimos molestias libero quam asperiores cupiditate.

<CommandLine name="intall-lapikit" command={commandInstall}/>

Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, ratione. Repellendus exercitationem rem eaque ipsam maiores perferendis quisquam aperiam delectus non alias, dolores explicabo dignissimos molestias libero quam asperiores cupiditate.

<Sandbox name="button-size-sandbox" code={ButtonSizeCode} presentation>
	{#snippet component()}
		<ButtonSize/>
	{/snippet}
</Sandbox>
