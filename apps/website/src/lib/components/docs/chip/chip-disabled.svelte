<script lang="ts">
	import { Chip } from 'lapikit/components';
</script>

<Chip disabled>disabled</Chip>
<Chip href="#click" disabled>anchor</Chip>
<Chip onclick={() => alert('hello')} disabled>anchor</Chip>
