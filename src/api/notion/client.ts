import { Client, PageObjectResponse } from '@notionhq/client';
import moment from 'moment';
import dotenv from 'dotenv';

import { NOTABLE_DIRECTORS } from '../../config/constants';
import { Movie, MoviePageObjectResponse } from './types';

dotenv.config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DB_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY) {
	throw new Error('NOTION_API_KEY is not defined in the environment variables');
}

if (!NOTION_DB_ID) {
	throw new Error(
		'NOTION_DATABASE_ID is not defined in the environment variables'
	);
}

const notion = new Client({ auth: NOTION_API_KEY });

export const getPageByTitle = async (title: string): Promise<Movie | null> => {
	const response = await notion.search({
		query: title,
		filter: {
			property: 'object',
			value: 'page',
		},
	});

	if (response.results.length === 0) {
		console.warn(`No page found with title: ${title}`);
		return null;
	}

	const result = response.results[0] as MoviePageObjectResponse;
	// console.log(result);

	const page: Movie = {
		title: result.properties.Title.title[0].plain_text,
		year: result.properties.Year.number,
		released: result.properties.Released.date?.start,

		// ID at bottom
		id: result.id,
	};

	return page;
};

// UPDATE
export const updatePage = async (pageId: string, metadata: metadata) => {
	const response = notion.pages.update({
		page_id: pageId,
		icon: {
			type: 'external',
			external: {
				url: metadata.posterUrl,
			},
		},
		properties: {
			'Release Date': {
				date: {
					start: metadata.released,
				},
			},
			Genres: {
				multi_select: metadata.genres.map((x) => ({ name: x })),
			},
			...(NOTABLE_DIRECTORS.includes(metadata.director) && {
				Director: {
					select: {
						name: metadata.director,
					},
				},
			}),
			Actors: {
				rich_text: [
					{
						text: {
							content: metadata.actors,
						},
					},
				],
			},
			Plot: {
				rich_text: [
					{
						text: {
							content: metadata.plot,
						},
					},
				],
			},
			Rating: {
				number: metadata.rating,
			},
			apiUpdateTime: {
				date: {
					start: moment().toISOString(),
				},
			},
		},
	});

	return response;
};
