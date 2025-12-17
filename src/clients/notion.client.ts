import {
	Client,
	GetDatabaseResponse,
	QueryDataSourceResponse,
} from '@notionhq/client';
import moment from 'moment';

import { env } from '../config/env';
import { NOTABLE_DIRECTORS } from '../config/constants';
import { Movie, MoviePageObjectResponse } from '../api/notion/types';

const notion = new Client({ auth: env.NOTION_API_KEY });

export async function getDatabase(): Promise<GetDatabaseResponse> {
	const res = await notion.databases.retrieve({
		database_id: env.NOTION_DATABASE_ID,
	});
	return res;
}

async function queryPageEqualsTitle(
	title: string
): Promise<QueryDataSourceResponse> {
	const res = await notion.dataSources.query({
		data_source_id: env.NOTION_DATASOURCE_ID,
		filter_properties: ['Title'],
		filter: {
			property: 'Title',
			title: {
				equals: title,
			},
		},
		page_size: 1,
	});

	return res;
}

async function queryPageContainsTitle(
	title: string
): Promise<QueryDataSourceResponse> {
	const res = await notion.dataSources.query({
		data_source_id: env.NOTION_DATASOURCE_ID,
		filter_properties: ['Title'],
		filter: {
			property: 'Title',
			title: {
				contains: title,
			},
		},
		page_size: 1,
	});

	return res;
}

export async function getPageByTitle(title: string) {
	let res = await queryPageEqualsTitle(title);

	if (res.results.length === 0) {
		res = await queryPageContainsTitle(title);
	}

	return res.results.length !== 0 ? res.results[0] : null;
}

export const getPage = async (title: string) => {
	const response = await notion.search({
		query: title,
		filter: {
			value: 'page',
			property: 'object',
		},
	});

	if (response.results.length === 0) {
		console.warn(`No page found with title: ${title}`);
		return null;
	}

	const result = response.results[0] as MoviePageObjectResponse;

	const page: Movie = {
		title: result.properties.Title.title[0].plain_text,
		year: result.properties.Year.number,
		released: '6969',

		// ID at bottom
		id: result.id,
	};

	return page;
};

// UPDATE
// export const updatePage = async (pageId: string, metadata: metadata) => {
// 	const response = notion.pages.update({
// 		page_id: pageId,
// 		icon: {
// 			type: 'external',
// 			external: {
// 				url: metadata.posterUrl,
// 			},
// 		},
// 		properties: {
// 			'Release Date': {
// 				date: {
// 					start: metadata.released,
// 				},
// 			},
// 			Genres: {
// 				multi_select: metadata.genres.map((x) => ({ name: x })),
// 			},
// 			...(NOTABLE_DIRECTORS.includes(metadata.director) && {
// 				Director: {
// 					select: {
// 						name: metadata.director,
// 					},
// 				},
// 			}),
// 			Actors: {
// 				rich_text: [
// 					{
// 						text: {
// 							content: metadata.actors,
// 						},
// 					},
// 				],
// 			},
// 			Plot: {
// 				rich_text: [
// 					{
// 						text: {
// 							content: metadata.plot,
// 						},
// 					},
// 				],
// 			},
// 			Rating: {
// 				number: metadata.rating,
// 			},
// 			apiUpdateTime: {
// 				date: {
// 					start: moment().toISOString(),
// 				},
// 			},
// 		},
// 	});

// 	return response;
// };
