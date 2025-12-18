import { updatePage } from '../clients/notion.client';
import { omdbToNotionUpdatePayload } from '../mappers/omdbToNotion';
import { Metadata } from '../types/omdb';

const pageId = '2ba33064-4966-808f-835c-d6dcbaff9525';
const metadata: Metadata = {
	Title: "It's a Wonderful Life",
	Year: '1946',
	Rated: 'PG',
	Released: '07 Jan 1947',
	Runtime: '130 min',
	Genre: 'Drama, Family, Fantasy',
	Director: 'Frank Capra',
	Writer: 'Frances Goodrich, Albert Hackett, Frank Capra',
	Actors: 'James Stewart, Donna Reed, Lionel Barrymore',
	Plot: 'An angel is sent from Heaven to help a desperately frustrated businessman see the value of his own life.',
	Language: 'English, French',
	Country: 'United States',
	Awards: 'Nominated for 5 Oscars. 11 wins & 7 nominations total',
	Poster:
		'https://m.media-amazon.com/images/M/MV5BMDM4OWFhYjEtNTE5Yy00NjcyLTg5N2UtZDQwNDZlYjlmNDU5XkEyXkFqcGc@._V1_SX300.jpg',
	Ratings: [
		{ Source: 'Internet Movie Database', Value: '8.6/10' },
		{ Source: 'Rotten Tomatoes', Value: '94%' },
		{ Source: 'Metacritic', Value: '89/100' },
	],
	Metascore: '89',
	imdbRating: '8.6',
	imdbVotes: '535,402',
	imdbID: 'tt0038650',
	Type: 'movie',
	DVD: 'N/A',
	BoxOffice: '$1,483,643',
	Production: 'N/A',
	Website: 'N/A',
	Response: 'True',
};

const notionProperties = omdbToNotionUpdatePayload(metadata);
updatePage(pageId, notionProperties);
