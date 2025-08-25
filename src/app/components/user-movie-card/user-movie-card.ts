import { Component, Input, input } from '@angular/core';
import { Movie } from '../../models/movie';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-movie-card',
  imports: [RouterModule],
  templateUrl: './user-movie-card.html',
  styleUrl: './user-movie-card.css'
})
export class UserMovieCard {

  @Input() movie : Movie = {} as Movie;

  constructor(private router: Router){}

  gotoproductdetail(imdbID: string){
    this.router.navigate(['/movie-details', imdbID]);
  }




}
