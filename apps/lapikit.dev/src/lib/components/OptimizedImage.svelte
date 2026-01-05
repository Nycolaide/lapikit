<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		class?: string;
		priority?: boolean;
	}

	let { src, alt, class: className = '', priority = false }: Props = $props();

	function getImagePaths(imagePath: string) {
		const pathWithoutExt = imagePath.replace(/\.[^.]+$/, '');
		
		return {
			mobile: `${pathWithoutExt}-mobile.webp`,
			desktop: `${pathWithoutExt}-desktop.webp`,
			retina: `${pathWithoutExt}-2x.webp`,
			fallback: imagePath
		};
	}

	const paths = getImagePaths(src);
</script>

<picture>
	<!-- WebP -->
	<source
		type="image/webp"
		srcset="{paths.mobile} 320w, {paths.desktop} 700w, {paths.retina} 1400w"
		sizes="(max-width: 768px) 320px, 700px"
	/>
	
	<!-- Fallback JPG/PNG -->
	<img
		src={paths.fallback}
		alt={alt}
		class={className}
		loading={priority ? 'eager' : 'lazy'}
		fetchpriority={priority ? 'high' : 'auto'}
		decoding="async"
		width="700"
		height="500"
	/>
</picture>

<style>
	picture {
		display: block;
		width: 100%;
	}
	
	img {
		width: 100%;
		height: auto;
		display: block;
	}
</style>




