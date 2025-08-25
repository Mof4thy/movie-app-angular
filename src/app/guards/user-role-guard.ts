import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserRoleGuard implements CanActivate {

  constructor(private auth: Auth, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.userRole$.pipe(
      map(role => {
        if (role === 'USER') {
          return true;
        } else if (role === 'ADMIN') {
          // Redirect admin to admin dashboard
          this.router.navigate(['/admin-dashboard']);
          return false;
        } else {
          // No valid role, redirect to login
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
