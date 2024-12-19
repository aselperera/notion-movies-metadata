import { getMetadata } from '../src/omdbClient';

const title = process.argv[2];
const year = process.argv[3];
getMetadata(title, year).then(console.log);
