import { getMetadata } from '../src/omdbClient';

const title = process.argv[2];
const year = process.argv[3] ? Number(process.argv[3]) : NaN;
getMetadata(title, year).then(console.log);
