export const copyToClipboard = (value: string) => {
	if (navigator.clipboard && window.isSecureContext) {
		navigator.clipboard
			.writeText(value)
			.then(function () {
				console.log('Success copy: ' + value);
			})
			.catch(function (err) {
				console.error('Error copying to clipboard: ', err);
			});
	} else {
		// Fallback (legacy browser)
		const zoneTexte = document.createElement('textarea');
		zoneTexte.value = value;
		zoneTexte.style.position = 'fixed';
		zoneTexte.style.left = '-9999px';
		document.body.appendChild(zoneTexte);
		zoneTexte.focus();
		zoneTexte.select();

		try {
			document.execCommand('copy');
			console.log('Success copy: ' + value);
		} catch (err) {
			console.error('Error copying to clipboard: ', err);
		}

		document.body.removeChild(zoneTexte);
	}
};
