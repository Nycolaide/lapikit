<script lang="ts">
	import { useAccordion } from 'lapikit/actions';

	const actionAccordion = useAccordion({ multiple: true, readOnly: false });

	// Open or close a section by its index or id :
	actionAccordion.toggle('section1');

	// Access only to read the opened sections :
	console.log(actionAccordion.values);
</script>
