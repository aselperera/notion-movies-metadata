import { notionToExternalApostrophe } from '../utils/apostrophes';

export function notionToOmdbLookup(page: any) {
	const titleForOmdb = notionToExternalApostrophe(
		page.properties.Title.title[0].plain_text
	);

	return {
		title: titleForOmdb,
		year: page.properties.Year.number,
		pageId: page.id,
	};
}
