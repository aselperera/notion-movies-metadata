import { getDatabase } from '../src/notionClient';

getDatabase().then((res) => {
	const properties = Object.keys(res.properties).sort();
	console.log(properties);
});
