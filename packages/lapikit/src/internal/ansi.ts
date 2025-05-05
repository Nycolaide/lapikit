const color = {
	red: (text: string) => `\x1b[31m${text}\x1b[0m`,
	green: (text: string) => `\x1b[32m${text}\x1b[0m`,
	yellow: (text: string) => `\x1b[33m${text}\x1b[0m`,
	blue: (text: string) => `\x1b[34m${text}\x1b[0m`,
	purple: (text: string) => `\x1b[35m${text}\x1b[0m`,
	cyan: (text: string) => `\x1b[36m${text}\x1b[0m`
};

const variant = {
	bold: (text: string) => `\x1b[1m${text}\x1b[0m`,
	underline: (text: string) => `\x1b[4m${text}\x1b[0m`,
	inverse: (text: string) => `\x1b[7m${text}\x1b[0m`
};

const bold = {
	red: (text: string) => `\x1b[1m\x1b[31m${text}\x1b[0m`,
	green: (text: string) => `\x1b[1m\x1b[32m${text}\x1b[0m`,
	yellow: (text: string) => `\x1b[1m\x1b[33m${text}\x1b[0m`,
	blue: (text: string) => `\x1b[1m\x1b[34m${text}\x1b[0m`,
	purple: (text: string) => `\x1b[1m\x1b[35m${text}\x1b[0m`,
	cyan: (text: string) => `\x1b[1m\x1b[36m${text}\x1b[0m`
};

const inverse = {
	red: (text: string) => `\x1b[7m\x1b[31m${text}\x1b[0m`,
	green: (text: string) => `\x1b[7m\x1b[32m${text}\x1b[0m`,
	yellow: (text: string) => `\x1b[7m\x1b[33m${text}\x1b[0m`,
	blue: (text: string) => `\x1b[7m\x1b[34m${text}\x1b[0m`,
	purple: (text: string) => `\x1b[7m\x1b[35m${text}\x1b[0m`,
	cyan: (text: string) => `\x1b[7m\x1b[36m${text}\x1b[0m`
};

const underline = {
	red: (text: string) => `\x1b[4m\x1b[31m${text}\x1b[0m`,
	green: (text: string) => `\x1b[4m\x1b[32m${text}\x1b[0m`,
	yellow: (text: string) => `\x1b[4m\x1b[33m${text}\x1b[0m`,
	blue: (text: string) => `\x1b[4m\x1b[34m${text}\x1b[0m`,
	purple: (text: string) => `\x1b[4m\x1b[35m${text}\x1b[0m`,
	cyan: (text: string) => `\x1b[4m\x1b[36m${text}\x1b[0m`
};

export const ansi = {
	color,
	variant,
	bold,
	inverse,
	underline
};
export type Ansi = typeof ansi;
