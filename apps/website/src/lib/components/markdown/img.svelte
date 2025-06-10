<script lang="ts">
	type Props = {
		src: string;
		alt: string;
	};

	let { src, alt }: Props = $props();
</script>

<img {src} {alt} loading="lazy" class="mt-6 rounded-2xl" />
