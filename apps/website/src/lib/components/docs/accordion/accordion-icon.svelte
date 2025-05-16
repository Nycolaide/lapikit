<script lang="ts">
	import { Accordion, AccordionItem, Icon } from 'lapikit/components';
	import { useAccordion } from 'lapikit/actions';

	let items = [
		{ title: 'Section 1', content: 'Content section 1' },
		{ title: 'Section 2', content: 'Content section 2' },
		{ title: 'Section 3', content: 'Content section 3' }
	];

	const actionAccordion = useAccordion();
</script>

<Accordion>
	{#each items as item, index (index)}
		<AccordionItem
			{index}
			text={item.title}
			open={actionAccordion.values.includes(index)}
			toggle={actionAccordion.toggle}
		>
			<p>{item.content}</p>

			{#snippet indicator(model)}
				{#if model.open}
					<Icon icon="mgc_close_fill" />
				{:else}
					<Icon icon="mgc_add_fill" />
				{/if}
			{/snippet}
		</AccordionItem>
	{/each}
</Accordion>
