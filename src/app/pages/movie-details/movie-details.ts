import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie';
import { LucideAngularModule, ArrowLeft, Star, Calendar, Clock, Users, Award, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails {

  movie: Movie = {} as Movie;
  movieId: string = '';

  // Icons
  readonly ArrowLeftIcon = ArrowLeft;


  constructor(private route: ActivatedRoute, private router: Router, private movieService: MovieService){
    this.route.params.subscribe(params => {
      this.movieId = (params['id']);
    });


    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (movie: any) => {
        this.movie = {
          imdbID: movie.imdbID,
          title: movie.Title ,
          year: movie.Year ,
          poster: movie.Poster ,
          genre: movie.Genre ,
          director: movie.Director ,
          actors: movie.Actors ,
          plot: movie.Plot,
          type: movie.Type,
          imdbRating: movie.imdbRating,
          runtime: movie.Runtime,
          rated: movie.Rated,
          released: movie.Released,
          country: movie.Country,
          language: movie.Language,
          website: movie.Website,
          boxOffice: movie.BoxOffice,
          production: movie.Production,
          awards: movie.Awards,
          metascore: movie.Metascore,
          ratings: movie.Ratings,
          response: movie.Response,
          writer: movie.Writer,
          imdbVotes: movie.imdbVotes,
          totalSeasons: movie.totalSeasons
        };

      },
      error: (error) => {
        console.error('Error fetching movie details:', error);
      }
    })

  }

  goBack() {
    this.router.navigate(['/user-dashboard']);
  }

  getRatingColor(rating: string): string {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return 'text-green-500';
    if (numRating >= 6) return 'text-yellow-500';
    return 'text-red-500';
  }

}
