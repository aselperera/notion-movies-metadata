import moment from 'moment';

import { Metadata } from '../types/omdb';
import { NOTABLE_DIRECTORS, PROPS } from '../config/constants';

export function omdbToNotionUpdatePayload(omdb: Metadata) {
	return {
		icon: iconProp(omdb.Poster),
		properties: {
			// Notion expects property objects with the right shape (e.g. number, date, rich_text)
			[PROPS.TITLE]: titleProp(omdb.Title),
			[PROPS.YEAR]: numberProp(parseInt(omdb.Year, 10)),
			[PROPS.RELEASED]: dateProp(moment(omdb.Released, 'DD MMM YYYY').toDate()),
			[PROPS.GENRES]: multiSelectProp(omdb.Genre.split(', ')),
			[PROPS.DIRECTOR]: richTextProp(omdb.Director),
			[PROPS.ACTORS]: richTextProp(omdb.Actors),
			[PROPS.PLOT]: richTextProp(omdb.Plot),
			[PROPS.RATING]: numberProp(parseFloat(omdb.imdbRating)),
			[PROPS.API_UPDATE_TIME]: dateProp(new Date(), true),
		},
	};
}

/* Notion property builders */
function titleProp(content: string) {
	return { title: [{ text: { content } }] };
}

function richTextProp(content: string) {
	return { rich_text: [{ text: { content } }] };
}

function numberProp(value: number) {
	return { number: value };
}

function dateProp(date: Date, includeTime: boolean = false) {
	return {
		date: {
			start: includeTime
				? moment(date).toISOString()
				: moment(date).format('YYYY-MM-DD'),
		},
	};
}

function selectProp(value: string) {
	return { select: { name: value } };
}

function multiSelectProp(values: string[]) {
	return {
		multi_select: values.map((value) => ({ name: value })),
	};
}

function iconProp(url: string) {
	return { type: 'external', external: { url } };
}
