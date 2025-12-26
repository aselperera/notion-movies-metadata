import { getPageByTitle, updatePage } from '../clients/notion.client';
import { getMovieByTitle } from '../clients/omdb.client';
import { notionToOmdbLookup } from '../mappers/notionToOmdb';
import { omdbToNotionUpdatePayload } from '../mappers/omdbToNotion';
import { externalToNotionApostrophe } from '../utils/apostrophes';

async function main() {
	const [, , title] = process.argv;

	if (!title) {
		console.error('Usage: tsx get-and-update-page.ts "<title>"');
		process.exit(1);
	}

	const titleForNotion = externalToNotionApostrophe(title);
	const page = await getPageByTitle(titleForNotion);
	if (!page) {
		console.error(`No page found with title: ${titleForNotion}`);
		process.exit(1);
	}

	const { title: pageTitle, year, pageId } = notionToOmdbLookup(page);
	console.log(`Retrieving metadata for: ${pageTitle} (${year})`);

	const movie = await getMovieByTitle(pageTitle, year);
	if (!movie) {
		console.error(`No movie found with title: ${pageTitle} (${year})`);
		process.exit(1);
	}
	console.log(`Updating Notion page with latest metadata from OMDB...`);

	await updatePage(pageId, omdbToNotionUpdatePayload(movie));
	console.log(`Updated page: ${pageTitle} (${year})`);
}

main().catch((err) => {
	console.error('Error:', err.message);
	process.exit(1);
});
