import { getPageByTitle, updatePage } from '../src/notionClient';
import { getMetadata } from '../src/omdbClient';

export const updatePageWithMetadata = async (title: string) => {
	const page = await getPageByTitle(title);

	if (!page) {
		return 'Page not found';
	}

	const metadata = await getMetadata(page.title, page.year);
	return updatePage(page.id, metadata);
};

const title = process.argv[2];
updatePageWithMetadata(title).then(console.log);
