import { getMovieByTitle } from '../clients/omdb.client';

async function main() {
	const [, , title, year] = process.argv;

	if (!title) {
		console.error('Usage: tsx get-movie.ts "<title>" [year]');
		process.exit(1);
	}

	const movie = await getMovieByTitle(title, year ? Number(year) : undefined);
	console.log(movie);
}

main().catch((err) => {
	console.error('Error:', err.message);
	process.exit(1);
});
