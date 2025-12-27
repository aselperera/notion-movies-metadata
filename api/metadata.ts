import type { VercelRequest, VercelResponse } from '@vercel/node';

import { getMovieByTitle } from '../src/clients/omdb.client';
import { updatePage } from '../src/clients/notion.client';
import { notionToOmdbLookup } from '../src/mappers/notionToOmdb';
import { omdbToNotionUpdatePayload } from '../src/mappers/omdbToNotion';

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const page = req.body.data;
	const { title: pageTitle, year, pageId } = notionToOmdbLookup(page);
	console.log(`Retrieving metadata for: ${pageTitle} (${year})`);

	const movie = await getMovieByTitle(pageTitle, year);
	if (!movie) {
		console.error('No movie found in OMDB database!');
	}
	console.log('Metadata obtained from OMDB');

	await updatePage(pageId, omdbToNotionUpdatePayload(movie));
	console.log(`Updated page: ${pageTitle} (${year})`);

	return res.status(200).json({ status: 'success' });
}
