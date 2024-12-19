import { getPageByTitle } from '../src/notionClient';

const title = process.argv[2];
getPageByTitle(title).then(console.log);
