export function notionToExternalApostrophe(input: string): string {
	return input.replace(/’/g, "'");
}

export function externalToNotionApostrophe(input: string): string {
	return input.replace(/'/g, '’');
}
