<script lang="ts">
	type Props = {
		src: string;
		alt: string;
	};

	let { src, alt }: Props = $props();
</script>

<span>mdsvex img</span>
<img {src} {alt} loading="lazy" />
