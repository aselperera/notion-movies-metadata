import { getPageByTitle } from '../clients/notion.client';
import { externalToNotionApostrophe } from '../utils/apostrophes';

async function main() {
	const [, , title] = process.argv;

	if (!title) {
		console.error('Usage: tsx get-page.ts "<title>"');
		process.exit(1);
	}

	const titleForNotion = externalToNotionApostrophe(title);
	const page = await getPageByTitle(titleForNotion);
	console.log(page);
}

main().catch((err) => {
	console.error('Error:', err.message);
	process.exit(1);
});
