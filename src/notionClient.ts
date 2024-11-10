import dotenv from 'dotenv';
import { Client } from '@notionhq/client';

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

const getLatestCreatedPage = async () => {
	const response = await notion.databases.query({
		database_id: notionDatabaseId,
		page_size: 1,
	});
	console.log(response.results[0]);
};

getLatestCreatedPage();
