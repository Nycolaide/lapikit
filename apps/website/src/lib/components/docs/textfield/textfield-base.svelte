<script lang="ts">
	import { Icon, Textfield } from 'lapikit/components';

	let resultInput: string | undefined = $state(undefined);

	// var
	let email: string | undefined = $state(undefined);
	let password: string | undefined = $state(undefined);
	let age: string | undefined = $state(undefined);

	const submitForm = () => {
		const formData = {
			email: email,
			password: password,
			age: age ? parseInt(age) : undefined
		};

		console.log('Datas forms:', formData);

		if (!email || !password || !age) {
			alert('Please fill in all fields');
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			alert('Bad format email');
			return;
		}

		const ageNum = parseInt(age);
		if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
			alert('Enter year (1-120)');
			return;
		}

		alert(`Send form\nEmail: ${email}\nYear: ${age} ans`);

		// reset
		email = undefined;
		password = undefined;
		age = undefined;
	};
</script>

<Textfield
	bind:value={resultInput}
	placeholder="Placeholder"
	counter
	max={20}
	messagePrefix="hello"
	message="www.example.com/page"
	prefix="$"
	suffix="@gmail.com"
	clearable
	error
	errorMessage="Error message"
>
	{#snippet prepend()}
		<Icon icon="mgc_direction_arrow_line" />
	{/snippet}

	{#snippet prependInner()}
		<Icon icon="mgc_search_line" />
	{/snippet}

	{#snippet appendInner()}
		<Icon icon="mgc_check_line" />
	{/snippet}

	{#snippet append()}
		<Icon icon="mgc_direction_arrow_line" />
	{/snippet}
</Textfield>

<p>RESULT: {resultInput}</p>

<hr style="margin: 2rem 0;" />

<h3>Form</h3>

<form
	onsubmit={(e) => {
		e.preventDefault();
		submitForm();
	}}
	style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
>
	<div>
		<label for="email">Email :</label>
		<Textfield bind:value={email} type="email" placeholder="exemple@email.com" />
	</div>

	<div>
		<label for="password">Password :</label>
		<Textfield
			bind:value={password}
			type="password"
			placeholder="Your password"
			max={20}
			min={6}
			counter
		/>
	</div>

	<div>
		<label for="age">Age :</label>
		<Textfield
			bind:value={age}
			type="number"
			placeholder="Your age"
			max={99}
			min={5}
			counter
			hideSpinButtons
		/>
	</div>

	<button
		type="submit"
		style="padding: 0.5rem 1rem; background: #007acc; color: white; border: none; border-radius: 4px; cursor: pointer;"
	>
		Send
	</button>
</form>

<div style="margin-top: 1rem;">
	<h4>Value form :</h4>
	<p><strong>Email:</strong> {email || '-'}</p>
	<p><strong>Password:</strong> {password ? '•'.repeat(password.length) : '-'}</p>
	<p><strong>Age:</strong> {age || '-'}</p>
</div>
