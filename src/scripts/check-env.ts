import { env } from '../config/env';

console.log('Environment OK');
console.log({
	OMDB_API_KEY: env.OMDB_API_KEY,
});
