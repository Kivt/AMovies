/* tslint:disable */
import { MovieGenre } from './movie-genre';

export class MovieDetails {
  id: number;
  adult: boolean;
  budget: number;
  genres: MovieGenre[];
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  revenue: string;
  runtime: number;
  title: string;
  vote_count: number;
  vote_average: number;
}
