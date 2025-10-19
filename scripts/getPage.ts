import { getPageByTitle } from '../src/api/notion/client';

const title = process.argv[2];
getPageByTitle(title).then(console.log);
