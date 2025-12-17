import { getPageByTitle } from '../clients/notion.client';

async function main() {
	const [, , title] = process.argv;

	if (!title) {
		console.error('Usage: tsx get-page.ts "<title>"');
		process.exit(1);
	}

	const page = await getPageByTitle(title);
	console.log(page);
}

main().catch((err) => {
	console.error('Error:', err.message);
	process.exit(1);
});
