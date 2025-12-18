import { env } from '../config/env';

console.log('Environment OK');
console.log({
	NOTION_API_KEY: env.NOTION_API_KEY,
	NOTION_DATABASE_ID: env.NOTION_DATABASE_ID,
	NOTION_DATASOURCE_ID: env.NOTION_DATASOURCE_ID,
	OMDB_API_KEY: env.OMDB_API_KEY,
	OMDB_BASE_URL: env.OMDB_BASE_URL,
});
