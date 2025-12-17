import 'dotenv/config';

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value;
}

export const env = Object.freeze({
	// Notion
	NOTION_API_KEY: requireEnv('NOTION_API_KEY'),
	NOTION_DATABASE_ID: requireEnv('NOTION_DATABASE_ID'),
	NOTION_DATASOURCE_ID: requireEnv('NOTION_DATASOURCE_ID'),

	// OMDB
	OMDB_API_KEY: requireEnv('OMDB_API_KEY'),
	OMDB_BASE_URL: requireEnv('OMDB_BASE_URL'),
});
