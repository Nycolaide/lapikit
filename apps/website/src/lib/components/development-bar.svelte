<script lang="ts">
	import { PUBLIC_DEV_MODE } from '$env/static/public';
</script>

{#if PUBLIC_DEV_MODE == 'true'}
	<div
		class="fixed top-2 right-2 z-50 z-10000 rounded-lg bg-red-600 px-3 py-1 font-mono text-xs text-white shadow-lg"
	>
		DEV MODE
	</div>
{/if}
