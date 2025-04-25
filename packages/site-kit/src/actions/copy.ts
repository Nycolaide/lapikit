export const copyToClipboard = (value: string, dev?: boolean) => {
	if (navigator.clipboard && window.isSecureContext) {
		navigator.clipboard
			.writeText(value)
			.then(function () {
				if (dev) console.log('Copy: ' + value);
			})
			.catch(function (err) {
				if (dev) console.error('Error copying to clipboard: ', err);
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
			if (dev) console.log('Copy: ' + value);
		} catch (err) {
			if (dev) console.error('Error copying to clipboard: ', err);
		}

		document.body.removeChild(zoneTexte);
	}
};
