function toComponentName(shortName: string): string {
	return 'Kit' + shortName.charAt(0).toUpperCase() + shortName.slice(1);
}

export { toComponentName };
