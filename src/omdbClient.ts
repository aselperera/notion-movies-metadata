import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
const omdbApiKey = process.env.OMDB_API_KEY;

export const getMetadata = async (title: string, year: string) => {
	const url = `http://www.omdbapi.com/?apikey=${omdbApiKey}&t=${title}&y=${year}`;
	const response = await axios.get(url);
	return response.data;
};
