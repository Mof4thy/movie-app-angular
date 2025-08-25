// this service is used to store the movies in the database globally for admin and user

import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { BehaviorSubject } from 'rxjs';
import { MovieService } from './movie';


@Injectable({
  providedIn: "root"
})

export class MovieStoreService {

  constructor(private movieService : MovieService){}

  private movies = new BehaviorSubject<Movie[]>([]);

  movies$ = this.movies.asObservable();


  fetchStoredMovies() {
    this.movieService.getallmovies().subscribe({
      next : (Response : Movie[]) =>{
        //set the movies to the movie store service (global)
        this.movies.next(Response);
      },
      error : (error : any) =>{
        console.log(error);
      }
    })

  }
  setMovies(movies: Movie[]) {
    this.movies.next(movies);
  }

  addMovie(movie: Movie) {
    this.movies.next([...this.movies.value, movie]);
  }

  removeMovie(movie: Movie) {
    this.movies.next(this.movies.value.filter(m => m.imdbID !== movie.imdbID));
  }


}

