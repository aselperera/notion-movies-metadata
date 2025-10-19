import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import moment from 'moment';
import dotenv from 'dotenv';

import { metadata, page, TitleResponse, YearResponse } from '../../types';
import { NOTABLE_DIRECTORS } from '../../config/constants';

dotenv.config();

const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

if (!notionApiKey) {
	throw new Error('NOTION_API_KEY is not defined in the environment variables');
}

if (!notionDatabaseId) {
	throw new Error(
		'NOTION_DATABASE_ID is not defined in the environment variables'
	);
}

const notion = new Client({ auth: notionApiKey });

export const getPageByTitle = async (title: string): Promise<page> => {
	const response = await notion.databases.query({
		database_id: notionDatabaseId,
		filter: {
			property: 'Title',
			rich_text: {
				equals: title,
			},
		},
	});

	const pageResponse = response.results[0] as PageObjectResponse;
	const titleResponse = pageResponse.properties.Title as TitleResponse;
	const yearResponse = pageResponse.properties.Year as YearResponse;

	const page = {
		title: titleResponse.title[0].plain_text,
		year: yearResponse.number,
		id: pageResponse.id,
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
