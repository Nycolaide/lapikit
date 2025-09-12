<script lang="ts">
	import Head from '$lib/components/head.svelte';
	import { Appbar, Button } from 'lapikit/components';
	import { navigationMain } from '$lib/config';
	import { page } from '$app/state';
	import { capitalize } from 'site-kit/actions';
	import { t } from '$lib/i18n';
	import { ThemeToggle, Footer } from '$lib/components/index.js';
</script>

<Head
	title="Terms of Service"
	description="Discover Lapikit, a component library optimized for Svelte. Quick to integrate, simple to style, and designed for front-end developers."
/>

<Appbar
	classContent="flex items-center justify-between lg:grid! lg:grid-cols-3!"
	density={{ base: 'default', md: 'comfortable' }}
	background="transparent"
>
	<p class="text-2xl font-bold">
		<a href="/">Lapikit</a>
	</p>
	<div class="kit-device--h-mobile mr-0 ml-auto flex gap-2 lg:mr-auto">
		{#each navigationMain as { key, path, external } (key)}
			<Button
				href={path}
				target={external && '_blank'}
				active={page.url.pathname === path}
				rounded="full"
			>
				{capitalize($t(`navigation.${key}`))}
			</Button>
		{/each}
	</div>
	<div class="flex justify-end gap-3">
		<ThemeToggle app />

		<Button href="/docs/getting-started" density="comfortable" id="btn-getstarted-lapikit">
			{capitalize($t('homepage.top_cta'))}
		</Button>
	</div>
</Appbar>

<div class="markdown mx-auto w-full min-w-0 px-4 py-12 md:max-w-[760px]">
	<h1 class="title">Legal notices</h1>
	<p class="subtitle">Lapikit</p>
	<p class="description">Updated to 09/11/2025</p>

	<h2>Website publisher</h2>
	<p>
		The <strong>lapikit.dev</strong> website is published by:<br />
		<strong>Nycolaide</strong><br />
		Avenue de Paris, 91300 Massy, France<br />
		Email: <a href="mailto:contact@lapikit.dev">contact@lapikit.dev</a>
	</p>

	<h2>Hosting</h2>
	<p>
		The website is hosted on a server at:<br />
		<strong>OVHcloud</strong><br />
		2 rue Kellermann<br />
		59100 Roubaix, France<br />
		Website: <a href="https://www.ovhcloud.com" target="_blank">https://www.ovhcloud.com</a>
	</p>

	<h2>Intellectual property</h2>
	<p>
		The Lapikit project is distributed under an <a
			href="https://github.com/Nycolaide/lapikit/blob/main/LICENSE"
			target="_blank">MIT license</a
		>, which means that its source code can be freely used, modified, and redistributed under the
		terms of this license. <br />
		However:<br />
	</p>

	<ul>
		<li>
			The name “<strong>Lapikit</strong>,” the <strong>logo</strong>, the
			<strong>visual identity</strong>, and the <strong>lapikit.dev</strong> website remain the
			exclusive property of their author, <strong>Nycolaide</strong>.
		</li>
		<li>
			Any reproduction, use, or distribution of these elements without express authorization is
			prohibited.
		</li>
	</ul>

	<h2>Personal data & GDPR</h2>
	<p>
		The lapikit.dev website may collect certain personal data (for example, via a contact form).
		This data is used solely for communication between the publisher and the user, and is not
		transferred to third parties under any circumstances. <br />
		In accordance with the General Data Protection Regulation (GDPR), you have the right to access, rectify,
		delete, and object to the use of your personal data.<br /><br />
		To exercise these rights, you can write to:
		<a href="mailto:contact@lapikit.dev">contact@lapikit.dev</a>
	</p>

	<h3>Cookies & audience measurement</h3>
	<p>
		The site uses cookies and trackers for audience measurement and to improve the user experience.<br
		/>
		In particular:<br />
	</p>

	<ul>
		<li>The site uses <strong>Google Tag Manager</strong> to manage certain tracking services.</li>
		<li>
			The site uses <strong>Google Analytics</strong>, a service provided by Google Inc., to analyze
			site traffic and usage.
		</li>
	</ul>

	<p>
		These cookies are only placed after your explicit consent, collected via the information banner
		displayed on your first visit. <br />
		You can at any time: <br />
	</p>

	<ul>
		<li>Accept or refuse the use of these cookies.</li>
		<li>
			Change your preferences via the consent manager on the site or via your browser settings.
		</li>
	</ul>
	<p>
		Certain data (including your IP address and browsing information) may be transferred and stored
		by Google on servers located outside the European Union.
	</p>
</div>

<Footer />

<style>
	h1.title {
		color: color-mix(in oklab, var(--kit-on-base) 40%, transparent);
		font-weight: var(--font-weight-semibold);
		font-size: var(--text-xl);
		line-height: var(--tw-leading, var(--text-5xl--line-height)) !important;
	}

	p.subtitle {
		font-weight: var(--font-weight-semibold);
		font-size: var(--text-5xl);
		line-height: var(--tw-leading, var(--text-5xl--line-height)) !important;
	}

	p.description {
		margin-top: calc(var(--system-spacing) * 6) !important;
		font-size: 21px;
		line-height: calc(var(--system-spacing) * 14) !important;
		font-weight: var(--font-weight-semibold);
		text-wrap: balance;
		color: color-mix(in oklab, var(--kit-on-base) 70%, transparent);
	}

	@media screen and (max-width: 48rem) {
		.markdown {
			:global(h2) {
				margin-top: calc(var(--system-spacing) * 16);
				font-size: 27px;
				font-weight: var(--font-weight-semibold);
			}

			:global(h3) {
				margin-top: calc(var(--system-spacing) * 16);
				font-size: var(--text-xl);
				font-weight: var(--font-weight-semibold);
			}

			:global(p) {
				margin-top: calc(var(--system-spacing) * 7);
				line-height: calc(var(--system-spacing) * 12);
			}

			:global(img) {
				margin-top: calc(var(--system-spacing) * 12);
				margin-bottom: calc(var(--system-spacing) * -6);
				margin-right: auto;
				margin-left: auto;
			}

			:global(ul) {
				list-style-type: disc;
				margin-left: calc(var(--system-spacing) * 12);
				margin-block: calc(var(--system-spacing) * 8);
			}

			:global(ul > li) {
				line-height: calc(var(--system-spacing) * 14);
				margin-top: calc(var(--system-spacing) * 3);
			}

			:global(a) {
				text-underline-offset: 4px;
				text-decoration-line: underline;
				font-weight: 500;
			}
		}
	}

	@media screen and (min-width: 48rem) {
		.markdown {
			:global(h2) {
				margin-top: calc(var(--system-spacing) * 24);
				font-size: 27px;
				font-weight: var(--font-weight-semibold);
			}

			:global(h3) {
				margin-top: calc(var(--system-spacing) * 24);
				font-size: var(--text-xl);
				font-weight: var(--font-weight-semibold);
			}

			:global(p) {
				margin-top: calc(var(--system-spacing) * 12);
				line-height: calc(var(--system-spacing) * 14);
			}

			:global(img) {
				margin-top: calc(var(--system-spacing) * 12);
				margin-bottom: calc(var(--system-spacing) * -12);
			}

			:global(ul) {
				list-style-type: disc;
				margin-left: calc(var(--system-spacing) * 12);
				margin-block: calc(var(--system-spacing) * 8);
			}

			:global(ul > li) {
				line-height: calc(var(--system-spacing) * 14);
				margin-top: calc(var(--system-spacing) * 5);
			}

			:global(a) {
				text-underline-offset: 4px;
				text-decoration-line: underline;
				font-weight: 500;
			}
		}
	}
</style>
