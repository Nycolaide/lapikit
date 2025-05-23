import { derived, writable } from 'svelte/store';
import translations from './locales/translations';

export const locale = writable('en');
export const locales = Object.keys(translations);

interface TranslationVariables {
	[key: string]: string | number;
}

interface Translations {
	[locale: string]: {
		[key: string]: string;
	};
}

function translate(locale: string, key: string, vars: TranslationVariables): string {
	// Let's throw some errors if we're trying to use keys/locales that don't exist.
	// We could improve this by using Typescript and/or fallback values.
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	// Grab the translation from the translations object.
	const translate: Translations = translations;

	if (!translate[locale] || !translate[locale][key]) return `${locale}.${key}`;
	let text = translate[locale][key];

	if (!text) throw new Error(`no translation found for ${locale}.${key}`);

	// Replace any passed in variables in the translation string.
	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		text = text.replace(regex, String(vars[k]));
	});

	return text;
}

interface TranslationFunction {
	(key: string, vars?: TranslationVariables): string;
}

export const t = derived<typeof locale, TranslationFunction>(
	locale,
	($locale) =>
		(key: string, vars = {}) =>
			translate($locale, key, vars)
);
