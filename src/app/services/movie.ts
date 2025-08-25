import { Injectable, Query } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private omdbApiKey = environment.omdbApiKey;
  private omdbUrl = `http://www.omdbapi.com/?apikey=${this.omdbApiKey}`;

  private backendUrl = environment.backendUrl + '/movies';

  constructor(private http: HttpClient) {}



  // ====== OMDB METHODS ======

    // search movies function by title and/or date
    searchMovies(query : string , date : string): Observable<any>{
      let url = this.omdbUrl;

      // Add search query if provided
      if (query) {
        url += `&s=${query}`;
      }

      // Add year filter if provided
      if (date) {
        url += `&y=${date}`;
      }

      // If only date is provided without query, search for popular movies of that year
      if (!query && date) {
        url += `&s=movie`;
      }
      return this.http.get(url);

    }

    // get movie details function by  id
    getMovieDetails(movieId : string): Observable<any>{
      const url = `${this.omdbUrl}&i=${movieId}&plot=full`;
      console.log(url);
      return this.http.get(url);
    }


  // ====== BACKEND METHODS ======

    getallmovies(): Observable<any>{
      return this.http.get(`${this.backendUrl}`);
    }

    // get movie by id
    getmoviebyid(id : string) : Observable<any>{
      return this.http.get(this.backendUrl + '/' + id);
    }

    // add movie to DB
    addmovie(movie : any) : Observable<any>{
      return this.http.post(this.backendUrl, movie);
    }

    // delete movie from DB
    deletemovie(imdbID : string) : Observable<any>{
      return this.http.delete(`${this.backendUrl}/${imdbID}`);
    }


    // batch add and delete movies
    batchaddmovies(movies : any[]) : Observable<any>{
      return this.http.post(this.backendUrl + '/batch', movies);
    }

    batchdeletemovies(imdbIDs : string[]) : Observable<any>{
      return this.http.delete(this.backendUrl + '/batch', {body: imdbIDs});
    }

}
