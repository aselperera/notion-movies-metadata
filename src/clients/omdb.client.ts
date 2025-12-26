import { env } from '../config/env';
import { Metadata, OmdbError } from '../types/omdb';

export const getMovieByTitle = async (
	title: string,
	year?: number
): Promise<Metadata> => {
	const url = new URL(env.OMDB_BASE_URL);

	url.searchParams.set('apikey', env.OMDB_API_KEY);
	url.searchParams.set('t', title);
	if (year) url.searchParams.set('y', year.toString());

	const res = await fetch(url.toString());

	if (!res.ok) {
		throw new Error(`HTTP ${res.status}`);
	}

	const data: Metadata | OmdbError = await res.json();

	if (data.Response === 'False') {
		throw new Error(data.Error);
	}

	return data;
};
