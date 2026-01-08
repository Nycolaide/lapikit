import javascript from '$lib/languages/javascript.svg';
import typescript from '$lib/languages/typescript.svg';
import svelte from '$lib/languages/svelte.svg';
import css from '$lib/languages/css.svg';
import html from '$lib/languages/html.svg';
import shell from '$lib/languages/shell.svg';

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

export const dictionary: { [key: string]: string[] } = {
	javascript: ['js', 'javascript'],
	typescript: ['ts', 'typescript'],
	svelte: ['svelte', 'svelte.ts', 'svelte.js'],
	css: ['css', 'scss', 'less'],
	html: ['html', 'htm'],
	json: ['json'],
	shell: ['bash', 'sh', 'shell']
};

export const dictionaryIcons: { [key: string]: string } = {
	js: javascript,
	ts: typescript,
	'svelte.ts': svelte,
	'svelte.js': svelte,
	svelte: svelte,
	shell: shell,
	bash: shell,
	sh: shell,
	css: css,
	scss: css,
	less: css,
	html: html,
	htm: html,
	json: shell
};
