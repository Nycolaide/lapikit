<script lang="ts">
	import { Textfield, Button } from 'lapikit/components';

	// state
	let firstName = $state('');
	let lastName = $state('');
	let age = $state<number | undefined>(undefined);

	let errors = $state({
		firstName: false,
		lastName: false,
		age: false
	});

	const handleSubmit = (event: Event) => {
		event.preventDefault();

		errors = {
			firstName: false,
			lastName: false,
			age: false
		};

		// validator
		let hasErrors = false;

		if (!firstName || firstName.trim().length === 0) {
			errors.firstName = true;
			hasErrors = true;
		}

		if (!lastName || lastName.trim().length === 0) {
			errors.lastName = true;
			hasErrors = true;
		}

		if (!age || age <= 0) {
			errors.age = true;
			hasErrors = true;
		}

		if (!hasErrors) {
			alert(
				`Form submitted successfully!\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nAge: ${age}`
			);
		}
	};

	// form reset
	const handleReset = () => {
		firstName = '';
		lastName = '';
		age = undefined;
		errors = {
			firstName: false,
			lastName: false,
			age: false
		};
	};
</script>

<div class="grid w-[90%]">
	<h3>User Information Form</h3>

	<form onsubmit={handleSubmit}>
		<Textfield
			bind:value={firstName}
			placeholder="Enter your first name"
			variant="outline"
			density="comfortable"
			error={errors.firstName}
			errorMessage="First name is required"
			message="Please enter your first name"
			clearable
			max={50}
		>
			{#snippet prependInner()}
				<span class="field-label">First Name</span>
			{/snippet}
		</Textfield>

		<Textfield
			bind:value={lastName}
			placeholder="Enter your last name"
			variant="outline"
			density="comfortable"
			error={errors.lastName}
			errorMessage="Last name is required"
			message="Please enter your last name"
			clearable
			max={50}
		>
			{#snippet prependInner()}
				<span class="field-label">Last Name</span>
			{/snippet}
		</Textfield>

		<Textfield
			bind:value={age}
			type="number"
			placeholder="Enter your age"
			variant="outline"
			density="comfortable"
			error={errors.age}
			errorMessage="Age must be a positive number"
			message="Please enter your age"
			clearable
			min={1}
			max={150}
		>
			{#snippet prependInner()}
				<span class="field-label">Age</span>
			{/snippet}
		</Textfield>

		<div>
			<Button type="submit" onclick={handleSubmit} color="on-primary" background="primary"
				>Submit Form</Button
			>
			<Button variant="outline" onclick={handleReset}>Reset Form</Button>
		</div>
	</form>
</div>
