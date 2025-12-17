import { getDatabase } from '../clients/notion.client';

// Only used to get datasource id
async function main() {
	const database = await getDatabase();
	console.log(database);
}

main().catch((err) => {
	console.error('Error:', err.message);
	process.exit(1);
});
