import type { Component } from 'svelte';

export interface BlogPost {
	slug: string;
	title: string;
	description?: string;
	date?: string;
	author?: string;
	tags?: string[];
	image?: string;
	published?: boolean;
}

export interface BlogPostModule {
	default: Component;
	metadata: Omit<BlogPost, 'slug'>;
}
