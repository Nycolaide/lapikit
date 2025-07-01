<script lang="ts">
	import { App } from 'lapikit/components';
</script>

<App>
	<h1>Application Base</h1>
	<p>This is the base application component.</p>

	<!-- Exemple forbidden child: -->
	<App>
		<h1>Application Base Child</h1>
		<p>This is the base application component child.</p>
	</App>
</App>
