---
title: textfield
head:
  title: textfield
  description: desc
style:
  color: #ffff
state:
  status: new
  section: components
  published: false
github:
  url: /components/textfield.md
---

<script>
    import { Sandbox } from '$lib/components/index.js';  
    // components
    import TextfieldBase from "$lib/components/docs/textfield/textfield-base.svelte";
    import TextfieldBaseCode from "$lib/components/docs/textfield/textfield-base.svelte?raw";
    import TextfieldClearable from "$lib/components/docs/textfield/textfield-clearable.svelte";
    import TextfieldClearableCode from "$lib/components/docs/textfield/textfield-clearable.svelte?raw";
    import TextfieldCounter from "$lib/components/docs/textfield/textfield-counter.svelte";
    import TextfieldCounterCode from "$lib/components/docs/textfield/textfield-counter.svelte?raw";
    import TextfieldDensity from "$lib/components/docs/textfield/textfield-density.svelte";
    import TextfieldDensityCode from "$lib/components/docs/textfield/textfield-density.svelte?raw";
    import TextfieldError from "$lib/components/docs/textfield/textfield-error.svelte";
    import TextfieldErrorCode from "$lib/components/docs/textfield/textfield-error.svelte?raw";
    import TextfieldForm from "$lib/components/docs/textfield/textfield-form.svelte";
    import TextfieldFormCode from "$lib/components/docs/textfield/textfield-form.svelte?raw";
    import TextfieldMessage from "$lib/components/docs/textfield/textfield-message.svelte";
    import TextfieldMessageCode from "$lib/components/docs/textfield/textfield-message.svelte?raw";
    import TextfieldSize from "$lib/components/docs/textfield/textfield-size.svelte";
    import TextfieldSizeCode from "$lib/components/docs/textfield/textfield-size.svelte?raw";
    import TextfieldSnippet from "$lib/components/docs/textfield/textfield-snippet.svelte";
    import TextfieldSnippetCode from "$lib/components/docs/textfield/textfield-snippet.svelte?raw";
    import TextfieldType from "$lib/components/docs/textfield/textfield-type.svelte";
    import TextfieldTypeCode from "$lib/components/docs/textfield/textfield-type.svelte?raw";
    import TextfieldVariant from "$lib/components/docs/textfield/textfield-variant.svelte";
    import TextfieldVariantCode from "$lib/components/docs/textfield/textfield-variant.svelte?raw";
</script>

<Sandbox name="texfield-sandbox" code={TextfieldBaseCode} presentation>
	{#snippet component()}
		<TextfieldBase/>
	{/snippet}
</Sandbox>

## Base

<Sandbox name="texfield-base-sandbox" code={TextfieldBaseCode}>
	{#snippet component()}
		<TextfieldBase/>
	{/snippet}
</Sandbox>

## Type

<Sandbox name="texfield-type-sandbox" code={TextfieldTypeCode}>
	{#snippet component()}
		<TextfieldType/>
	{/snippet}
</Sandbox>

## Variant

<Sandbox name="texfield-variant-sandbox" code={TextfieldVariantCode}>
	{#snippet component()}
		<TextfieldVariant/>
	{/snippet}
</Sandbox>

## Clearable

<Sandbox name="texfield-clearable-sandbox" code={TextfieldClearableCode}>
	{#snippet component()}
		<TextfieldClearable/>
	{/snippet}
</Sandbox>

## Counter

<Sandbox name="texfield-counter-sandbox" code={TextfieldCounterCode}>
	{#snippet component()}
		<TextfieldCounter/>
	{/snippet}
</Sandbox>

## Size

<Sandbox name="texfield-size-sandbox" code={TextfieldSizeCode}>
	{#snippet component()}
		<TextfieldSize/>
	{/snippet}
</Sandbox>

## Density

<Sandbox name="texfield-density-sandbox" code={TextfieldDensityCode}>
	{#snippet component()}
		<TextfieldDensity/>
	{/snippet}
</Sandbox>

## Message

<Sandbox name="texfield-message-sandbox" code={TextfieldMessageCode}>
	{#snippet component()}
		<TextfieldMessage/>
	{/snippet}
</Sandbox>

## Error

<Sandbox name="texfield-error-sandbox" code={TextfieldErrorCode}>
	{#snippet component()}
		<TextfieldError/>
	{/snippet}
</Sandbox>

## Snippet

<Sandbox name="texfield-snippet-sandbox" code={TextfieldSnippetCode}>
	{#snippet component()}
		<TextfieldSnippet/>
	{/snippet}
</Sandbox>

## Form

<Sandbox name="texfield-form-sandbox" code={TextfieldFormCode}>
	{#snippet component()}
		<TextfieldForm/>
	{/snippet}
</Sandbox>
