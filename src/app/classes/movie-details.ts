/* tslint:disable */

interface BaseArray {
  id: number;
  name: string;
};

export class MovieDetails {
  id: number;
  adult: boolean;
  budget: number;
  genres: BaseArray[];
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: string;
  runtime: number;
  title: string;
  vote_count: number;
  vote_average: number;
  production_companies: BaseArray[];
  production_countries: BaseArray[];
}
