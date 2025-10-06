import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Observable, map, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Auth2Guard implements CanActivate {

  constructor(private auth: Auth, private router: Router){}

  canActivate(): Observable<boolean> {
    
    return combineLatest([this.auth.isLoggedIn$, this.auth.userRole$]).pipe(
      map(([isLoggedIn, role]) => {
        if (isLoggedIn) {
          if (role === 'ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          } else if (role === 'USER') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/']);
          }
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
