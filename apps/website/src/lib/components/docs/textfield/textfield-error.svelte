<script lang="ts">
	import { Textfield } from 'lapikit/components';

	let email: string | undefined = $state(undefined);
	let isError: boolean = $state(false);
	let errorMessage: string = $state('');

	// Email validation regex
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

	// Email validation function
	const validateEmail = (value: string | undefined): { isValid: boolean; message: string } => {
		if (!value || value.trim() === '') {
			return {
				isValid: false,
				message: 'Email address is required'
			};
		}

		const trimmedValue = value.trim();

		// Check if contains @ symbol
		if (!trimmedValue.includes('@')) {
			return {
				isValid: false,
				message: 'Email must contain @ symbol'
			};
		}

		// Check if has text before @
		const parts = trimmedValue.split('@');
		if (parts[0].length === 0) {
			return {
				isValid: false,
				message: 'Email must have a username before @ symbol'
			};
		}

		// Check if has domain after @
		if (parts[1].length === 0) {
			return {
				isValid: false,
				message: 'Email must have a domain after @ symbol'
			};
		}

		// Check if domain has a dot
		if (!parts[1].includes('.')) {
			return {
				isValid: false,
				message: 'Email domain must contain a dot (e.g., .com, .org)'
			};
		}

		// Check if domain has extension after dot
		const domainParts = parts[1].split('.');
		if (domainParts[domainParts.length - 1].length < 2) {
			return {
				isValid: false,
				message: 'Email domain extension must be at least 2 characters'
			};
		}

		// Final regex validation
		if (!emailRegex.test(trimmedValue)) {
			return {
				isValid: false,
				message: 'Please enter a valid email address (e.g., user@example.com)'
			};
		}

		return {
			isValid: true,
			message: ''
		};
	};

	// Reactive validation - runs whenever email value changes
	$effect(() => {
		if (email !== undefined) {
			const validation = validateEmail(email);
			isError = !validation.isValid;
			errorMessage = validation.message;
		} else {
			isError = false;
			errorMessage = '';
		}
	});
</script>

<Textfield
	bind:value={email}
	type="email"
	placeholder="Enter your email address"
	error={isError}
	{errorMessage}
	message="Please enter a valid email address"
	variant="outline"
	density="comfortable"
	clearable
/>
