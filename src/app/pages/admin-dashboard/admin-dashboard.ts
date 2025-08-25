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

  date : string = '';
  query : string = '';
  page : number = 1;

  movies : Movie[] = [];
  isLoading : boolean = false;
  error : string = '';

  databaseMovies : Movie[] = [];
  activeTab : string = 'database';

  selectedMovies : Movie[] = [];


  constructor(private movieService : MovieService , private moviestoreService : MovieStoreService){}


  loadPage(page : number){
    this.page = page;
    this.searchMovies();
  }


  searchMovies(){

    if (!this.query.trim() && !this.date.trim()) {
      alert('Please enter either a movie name or date to search');
      return;
    }
    this.isLoading = true;

    this.movies = [];

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



  // fetch stored movies when the component is initialized and update the databaseMovies array
  ngOnInit(): void {
    this.moviestoreService.fetchStoredMovies();
    this.moviestoreService.movies$.subscribe((movies) => {
      this.databaseMovies = movies;
    });
    console.log("Database movies", this.databaseMovies);
  }


  switchToSearch() {
    this.activeTab = 'search';
    this.selectedMovies = [];
  }


  switchToDatabase() {
    this.activeTab = 'database';
    this.selectedMovies = [];
  }



  selectMovie(movie : Movie){
    this.selectedMovies.push(movie);
    console.log("Selected movies", this.selectedMovies);
  }


  unselectMovie(movie : Movie){
    this.selectedMovies = this.selectedMovies.filter(m => m.imdbID !== movie.imdbID);
    console.log("Selected movies", this.selectedMovies);
  }


  resetSelectedMovies(){
    this.selectedMovies = [];
  }



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

