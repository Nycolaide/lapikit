<script lang="ts">
	import { Alert } from 'lapikit/components';
</script>

<div class="grid grid-cols-1 gap-4">
	<Alert density="compact">
		<p>This is a compact alert, with reduced margins and padding</p>
	</Alert>

	<Alert>
		<p>This is a basic options alert</p>
	</Alert>

	<Alert density="comfortable">
		<p>This is a comfortable alert, margins and padding are increased</p>
	</Alert>
</div>
