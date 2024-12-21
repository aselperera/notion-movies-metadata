export type metadata = {
	title: string;
	year: number;
	released: string;
	genres: string[];
	director: string;
	actors: string;
	plot: string;
	rating: number;
	posterUrl: string;
};

export type page = {
	title: string;
	year: number;
	id: string;
};

export type TitleResponse = {
	type: 'title';
	title: {
		type: 'text';
		text: {
			content: string;
		};
		plain_text: string;
	}[];
	id: string;
};

export type YearResponse = {
	type: 'number';
	number: number;
};

export type pageResponse = {
	id: string;
	properties: {
		Title: TitleResponse;
		Year: YearResponse;
	};
};
