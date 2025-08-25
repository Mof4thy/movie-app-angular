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

    // search movies function by title and/or date and page number
    searchMovies(query : string , date : string, page : number = 1): Observable<any>{
      let url = this.omdbUrl;

      if (query) {
        url += `&s=${query}`;
      }

      if (date) {
        url += `&y=${date}`;
      }

      if (!query && date) {
        url += `&s=movie`;
      }
      return this.http.get(url+`&page=${page}`);

    }

    getMovieDetails(movieId : string): Observable<any>{
      const url = `${this.omdbUrl}&i=${movieId}&plot=full`;
      console.log(url);
      return this.http.get(url);
    }


  // ====== BACKEND METHODS ======

    getallmovies(): Observable<any>{
      return this.http.get(`${this.backendUrl}`);
    }

    getmoviebyid(id : string) : Observable<any>{
      return this.http.get(this.backendUrl + '/' + id);
    }

    addmovie(movie : any) : Observable<any>{
      return this.http.post(this.backendUrl, movie);
    }

    deletemovie(imdbID : string) : Observable<any>{
      return this.http.delete(`${this.backendUrl}/${imdbID}`);
    }


    batchaddmovies(movies : any[]) : Observable<any>{
      return this.http.post(this.backendUrl + '/batch', movies);
    }

    batchdeletemovies(imdbIDs : string[]) : Observable<any>{
      return this.http.delete(this.backendUrl + '/batch', {body: imdbIDs});
    }

}
