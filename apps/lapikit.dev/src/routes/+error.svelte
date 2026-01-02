<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page?.status}</title>
</svelte:head>

<div>
    <p>{page?.error?.message}</p>
</div>