<script lang="ts">
	import { Button, Icon } from 'lapikit/components';
</script>

<Button disabled>disabled</Button>
<Button href="#click" disabled>anchor</Button>
<Button type="submit" disabled variant="outline">submit disabled</Button>
<Button type="reset" disabled variant="text">reset disabled</Button>
<Button disabled>
	<Icon icon="mgc_direction_arrow_line" />
	disabled with icon
</Button>
<Button disabled icon>
	<Icon icon="mgc_forbid_circle_line" />
</Button>
