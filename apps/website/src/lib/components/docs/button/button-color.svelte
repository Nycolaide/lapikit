<script lang="ts">
	import { Button } from 'lapikit/components';
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
	<Button class="primary">Primary</Button>
	<Button class="secondary" variant="outline">Secondary</Button>
	<Button class="tertiary" variant="text">Tertiary</Button>
	<Button color="on-primary" background="primary">Primary variables</Button>
	<Button color="cyan" variant="outline">Outline colors</Button>
</div>
