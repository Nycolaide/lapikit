export function getCookie(name: string): string | null {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(name: string, value: string, days = 365) {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

export function deleteCookie(name: string) {
	document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
}
