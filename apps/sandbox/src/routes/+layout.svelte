<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { Button } from 'lapikit/components';
	import '../plugins/lapikit.ts';

	let { children } = $props();

	let active = $state(false);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}

<Button onclick={() => (active = !active)}>Button</Button>

<kit:btn class="demo element DEMO" s-class="element">Demo</kit:btn>
<kit:btn s-class="element-1 gnome-2">Gnome</kit:btn>
<kit:btn
	s-class="class-class"
	s-class_elephant={false}
	s-class_elephants={false}
	s-class_elephantss={false}
	onclick={() => (active = !active)}
	background="lightblue"
>
	Elephant
	<kit:btn href="https://example.com">Demo child component</kit:btn>
</kit:btn>
<kit:btn
	s-class="class-class"
	s-class_gnomy="item1"
	s-class_is-active={active}
	href="https://google.com"
	target="_blank">Elephant</kit:btn
>
