import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search , CalendarSearch  } from 'lucide-angular';
import { AdminMovieCard } from '../../components/admin-movie-card/adminmoviecard';
import { Movie } from '../../models/movie';
import { MovieStoreService } from '../../services/MovieStoreService';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule, LucideAngularModule, AdminMovieCard],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  SearchIcon = Search;
  CalendarSearch = CalendarSearch;

  // search variables
  date : string = '';
  query : string = '';
  page : number = 1;
  // search results
  movies : Movie[] = [];
  // loading state
  isLoading : boolean = false;
  error : string = '';
  // Get all movies in database
  databaseMovies : Movie[] = [];
  // active tab
  activeTab : string = 'database';
  // selected movies
  selectedMovies : Movie[] = [];


  constructor(private movieService : MovieService , private moviestoreService : MovieStoreService){}


  loadPage(page : number){
    this.page = page;
    this.searchMovies();
  }


  searchMovies(){
    // Check if at least one field is filled
    if (!this.query.trim() && !this.date.trim()) {
      alert('Please enter either a movie name or date to search');
      return;
    }
    this.isLoading = true;

    this.movies = []; // Clear previous results

    this.movieService.searchMovies(this.query.trim(), this.date.trim(), this.page).subscribe(
      {
        next:(response : any) => {
          console.log(response.Search);
          this.movies = response.Search.map((movie: any) => ({
            imdbID: movie.imdbID,
            title: movie.Title || '',
            year: movie.Year || '',
            poster: movie.Poster || '',
            genre: movie.Genre || '',
            director: movie.Director || '',
            actors: movie.Actors || '',
            plot: movie.Plot || '',
            type: movie.Type || ''
          }));
          this.error = '';
          this.isLoading = false;

          if (this.movies.length === 0) {
            this.error = 'No movies found for your search criteria';
          }
        },
        error : (error : any) => {
          this.error = error.message || 'An error occurred while searching for movies';
          this.isLoading = false;
        }
      }
    )

  }


  /// add this to a separate component to show the movies in the database for admin
  // Fetch stored movies when the component is initialized
  ngOnInit(): void {
    this.moviestoreService.fetchStoredMovies();
    this.moviestoreService.movies$.subscribe((movies) => {
      this.databaseMovies = movies;
    });
    console.log("Database movies", this.databaseMovies);
  }

  // switch to search tab
  switchToSearch() {
    this.activeTab = 'search';
    this.selectedMovies = [];
  }

  // switch to database tab
  switchToDatabase() {
    this.activeTab = 'database';
    this.selectedMovies = [];
  }


  // select movie
  selectMovie(movie : Movie){
    this.selectedMovies.push(movie);
    console.log("Selected movies", this.selectedMovies);
  }

  // unselect movie
  unselectMovie(movie : Movie){
    this.selectedMovies = this.selectedMovies.filter(m => m.imdbID !== movie.imdbID);
    console.log("Selected movies", this.selectedMovies);
  }

  // reset selected movies
  resetSelectedMovies(){
    this.selectedMovies = [];
  }


  // batch add movies to database
  addToDatabaseBatch(){
    this.movieService.batchaddmovies(this.selectedMovies).subscribe({
      next : (response : any) => {
        console.log(response);
        this.selectedMovies = [];
        this.moviestoreService.fetchStoredMovies();
        this.moviestoreService.movies$.subscribe((movies) => {
          this.databaseMovies = movies;
        });
      }
    })
  }

  // batch delete movies from database
  deleteFromDatabaseBatch(){
    this.movieService.batchdeletemovies(this.selectedMovies.map(movie => movie.imdbID)).subscribe({
      next : (response : any) => {
        console.log(response);
        this.selectedMovies = [];
        this.moviestoreService.fetchStoredMovies();
        this.moviestoreService.movies$.subscribe((movies) => {
          this.databaseMovies = movies;
        });
      },
      error : (error : any) => {
        console.log(error);
      }
    });
  }


}

