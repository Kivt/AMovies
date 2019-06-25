import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MovieDetails } from '../classes/movie-details';
import { MovieCastMember } from '../classes/movie-cast-member';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  details: MovieDetails;
  genres: string;
  cast: string;

  constructor(
    private apiServie: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getDetails();
    this.getMovieCast();
  }

  getDetails() {
    this.apiServie.getMovieDetails(this.route.snapshot.params.id)
      .subscribe(data => {
        this.details = data.data;
        this.getGenresList();
      });
  }

  getGenresList() {
    this.genres = this.arrayToStringList(this.details.genres, 'name');
  }

  getMovieCast() {
    this.apiServie.getMovieCast(this.route.snapshot.params.id)
      .subscribe(data => {
        this.cast = this.arrayToStringList(data.data.cast, 'name');
      });
  }

  arrayToStringList(arr: any[], key: string) {
    return arr
      .reduce((acc, val) => {
        return acc + val[key] + ', ';
      }, '')
      .slice(0, -2);
  }
}
