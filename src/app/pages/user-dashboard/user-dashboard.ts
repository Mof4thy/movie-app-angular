import { Component } from '@angular/core';
import { LucideAngularModule, Search  } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie';
import { MovieStoreService } from '../../services/MovieStoreService';
import { Movie } from '../../models/movie';
import { AdminMovieCard } from '../../components/admin-movie-card/adminmoviecard';
import { UserMovieCard } from '../../components/user-movie-card/user-movie-card';


@Component({
  selector: 'app-user-dashboard',
  imports: [CommonModule, FormsModule, LucideAngularModule, UserMovieCard],
  templateUrl: './user-dashboard.html',
  styleUrl: './user-dashboard.css'
})
export class UserDashboard {

  constructor( private movieStore : MovieStoreService){}

  SearchIcon = Search;

  movieName : string = '';
  movieYear : string = '';

  movies : Movie[] = [];
  filteredMovies : Movie[] = [];

  ngOnInit(){
    // fetch stored movies
    this.movieStore.fetchStoredMovies();
    this.movieStore.movies$.subscribe(movies => {
      this.movies = movies;
      this.filteredMovies = this.movies;
      console.log("Movies", this.movies);
    });
  }

  // search movies
  searchMovies(){
    this.filteredMovies = this.movies.filter(movie => movie.title.toLowerCase().includes(this.movieName.toLowerCase()));
  }

  // reset search
  resetSearch(){
    this.movieName = '';
    this.filteredMovies = this.movies;
  }

}
