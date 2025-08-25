import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.userRole$.pipe(
      map(role => {
        if (role === 'ADMIN') {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
}
