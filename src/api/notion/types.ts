import { PageObjectResponse, RichTextItemResponse } from '@notionhq/client';

export interface Movie {
	id: string;
	title: string;
	year: number | null;
	released: string | null;
}

type DateResponse = {
	start: string;
	end: string | null;
	time_zone: string | null;
};

export type MoviePageObjectResponse = Omit<PageObjectResponse, 'properties'> & {
	properties: {
		Title: {
			type: 'title';
			title: Array<RichTextItemResponse>;
			id: string;
		};
		Year: {
			type: 'number';
			number: number | null;
			id: string;
		};
		Released: {
			type: 'date';
			date: DateResponse | null;
			id: string;
		};
	};
};
