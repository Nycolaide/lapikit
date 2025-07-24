<script lang="ts">
	import { Alert } from 'lapikit/components';
</script>

<div class="grid grid-cols-1 gap-4">
	<Alert success>
		<p>A success-style alert</p>
	</Alert>

	<Alert success variant="outline">
		<p>A success-style alert</p>
	</Alert>

	<Alert warning>
		<p>A warning-style alert</p>
	</Alert>

	<Alert warning variant="outline">
		<p>A warning-style alert</p>
	</Alert>

	<Alert error>
		<p>An error-style alert</p>
	</Alert>

	<Alert error variant="outline">
		<p>An error-style alert</p>
	</Alert>

	<Alert info>
		<p>An info-style alert</p>
	</Alert>

	<Alert info variant="outline">
		<p>An info-style alert</p>
	</Alert>
</div>
