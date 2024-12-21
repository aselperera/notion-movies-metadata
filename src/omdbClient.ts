import dotenv from 'dotenv';
import axios from 'axios';
import { metadata } from './types';
import moment from 'moment';

dotenv.config();
const omdbApiKey = process.env.OMDB_API_KEY;

export const getMetadata = async (
	title: string,
	year?: number
): Promise<metadata> => {
	const url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${title}&y=${year}`;
	const response = await axios.get(url);
	const data = response.data;

	const metadata: metadata = {
		title: data.Title,
		year: Number(data.Year),
		released: moment(data.Released, 'DD MMM YYYY').format('YYYY-MM-DD'),
		genres: data.Genre.split(', '),
		director: data.Director.split(', ')[0],
		actors: data.Actors,
		plot: data.Plot,
		rating: Number(data.imdbRating),
		posterUrl: data.Poster,
	};

	return metadata;
};
