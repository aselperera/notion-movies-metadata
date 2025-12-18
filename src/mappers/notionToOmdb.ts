export function notionToOmdbLookup(page: any) {
	return {
		title: page.properties.Title.title[0].plain_text,
		year: page.properties.Year.number,
		pageId: page.id,
	};
}
