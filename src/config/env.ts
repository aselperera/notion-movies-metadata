import 'dotenv/config';

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value;
}

export const env = Object.freeze({
	// OMDB
	OMDB_API_KEY: requireEnv('OMDB_API_KEY'),
	OMDB_BASE_URL: requireEnv('OMDB_BASE_URL'),
});
