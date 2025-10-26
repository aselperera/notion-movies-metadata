import { PageObjectResponse } from '@notionhq/client';

// Define the allowed property keys
export type MoviePropertyKeys =
  | 'Title'
  | 'Year'
  | 'Release Date'
  | 'Genres'
  | 'Director'
  | 'Actors'
  | 'Plot'
  | 'Rating'
  | 'apiUpdateTime';

// Create a mapped type that only allows these specific keys
export type MoviePropertiesResponse = {
  [K in MoviePropertyKeys]: PageObjectResponse['properties'][string];
};

// You can also create a more specific version with exact property types
export type TypedMovieProperties = {
  Title: PageObjectResponse['properties']['title'];
  Year: PageObjectResponse['properties']['number'];
  'Release Date': PageObjectResponse['properties']['date'];
  Genres: PageObjectResponse['properties']['multi_select'];
  Director: PageObjectResponse['properties']['select'];
  Actors: PageObjectResponse['properties']['rich_text'];
  Plot: PageObjectResponse['properties']['rich_text'];
  Rating: PageObjectResponse['properties']['number'];
  apiUpdateTime: PageObjectResponse['properties']['date'];
};