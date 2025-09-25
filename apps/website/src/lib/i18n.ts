import { derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import translations from './locales/translations';

export const locale: Writable<'en' | 'fr' | 'es'> = writable('en');
export const locales = Object.keys(translations);

type TranslationValue = string | { [key: string]: TranslationValue };

interface Translations {
	[locale: string]: TranslationValue;
}

function getNestedTranslation(obj: TranslationValue, keys: string[]): TranslationValue | undefined {
	return keys.reduce<TranslationValue | undefined>((acc, key) => {
		if (acc && typeof acc === 'object' && key in acc) {
			return (acc as { [key: string]: TranslationValue })[key];
		}
		return undefined;
	}, obj);
}

function translate(locale: string, key: string, vars: Record<string, string> = {}): string {
	if (!key) throw new Error('no key provided to $t()');
	if (!locale) throw new Error(`no translation for key "${key}"`);

	const referencial: Translations = translations;
	const translate = referencial[locale];
	if (!translate) return `${locale}.${key}`;

	const keys = key.split('.');
	let text = getNestedTranslation(translate, keys);
	if (!text || typeof text !== 'string') return `${locale}.${key}`;

	Object.keys(vars).map((k) => {
		const regex = new RegExp(`{{${k}}}`, 'g');
		if (typeof text === 'string') {
			text = text.replace(regex, String(vars[k]));
		}
	});

	return text;
}

interface TranslationFunction {
	(key: string, vars?: Record<string, string>): string;
}

export const t = derived<typeof locale, TranslationFunction>(
	locale,
	($locale) =>
		(key: string, vars: Record<string, string> = {}) =>
			translate($locale, key, vars)
);
