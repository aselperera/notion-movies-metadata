import {
	Client,
	GetDatabaseResponse,
	QueryDataSourceResponse,
} from '@notionhq/client';

import { env } from '../config/env';

const notion = new Client({ auth: env.NOTION_API_KEY });

const FILTER_PROPERTIES = ['Title', 'Year']; // These are the only properties that are returned

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
		filter_properties: FILTER_PROPERTIES,
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
		filter_properties: FILTER_PROPERTIES,
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

export async function updatePage(pageId: string, params: any) {
	const res = notion.pages.update({
		page_id: pageId,
		...params,
	});

	return res;
}
