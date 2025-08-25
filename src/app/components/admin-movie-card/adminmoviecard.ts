import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MovieService } from '../../services/movie';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/movie';
import { MovieStoreService } from '../../services/MovieStoreService';

@Component({
  selector: 'app-adminmoviecard',
  imports: [LucideAngularModule , CommonModule],
  templateUrl: './adminmoviecard.html',
  styleUrl: './adminmoviecard.css'
})
export class AdminMovieCard {

  @Input() movie : Movie | undefined;
  @Output() movieSelected = new EventEmitter<Movie>();
  @Output() movieUnselected = new EventEmitter<Movie>();
  @Input() tab : string = 'search';
  @Input() isSelected : boolean = false;

  isLoading : boolean = false;
  error : string = '';

  constructor(private movieService : MovieService , private movieStore : MovieStoreService){}


  toggleSelect(movie : Movie){
    this.isSelected = !this.isSelected;
    if(this.isSelected){
      this.movieSelected.emit(movie);
    }else{
      this.movieUnselected.emit(movie);
    }
  }


  addToDatabase(){
    this.isLoading = true;
    this.error = '';
    this.movieService.addmovie(this.movie as Movie).subscribe({
      next : (Response : any) =>{
        console.log(Response);
        this.isLoading = false;
        this.error = '';
        this.movieStore.addMovie(this.movie as Movie);
      },
      error : (error : any) =>{
        this.isLoading = false;
        this.error = error.message;
      }
    })
  }


  deleteFromDatabase(imdbID : string){
    this.isLoading = true;
    this.error = '';
    console.log(this.movie?.imdbID);
    this.movieService.deletemovie(imdbID).subscribe({
      next : (Response : any) =>{
        console.log(Response);
        this.isLoading = false;
        this.error = '';
        this.movieStore.removeMovie(this.movie as Movie);
      },
      error : (error : any) =>{
        this.isLoading = false;
        this.error = error.message;
      },
    });
  }



  isInDatabase(imdbID : string){
    let isInDatabase = false;
    this.movieStore.movies$.subscribe(movies => {
      isInDatabase = movies.some(movie => movie.imdbID === imdbID);
    });
    return isInDatabase;
  }

}
