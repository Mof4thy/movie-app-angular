import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, catchError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private backendUrl = environment.backendUrl + '/auth';

  constructor(private http: HttpClient) {

    this.checkExistingAuth();
  }

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private userRole = new BehaviorSubject<string | null>(null);
  private user = new BehaviorSubject<any | null>(null);
  private errorMessage = new BehaviorSubject<string | null>(null);

  // for read only access to the behavior subjects
  isLoggedIn$ = this.isLoggedIn.asObservable();
  userRole$ = this.userRole.asObservable();
  user$ = this.user.asObservable();
  errorMessage$ = this.errorMessage.asObservable();


  // Check if user is already logged in from localStorage
  private checkExistingAuth(): void {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        this.isLoggedIn.next(true);
        this.userRole.next(userData.role);
        this.user.next(userData);
      } catch (error) {

        localStorage.removeItem('user');
      }
    }
  }


  register(user: any): Observable<any> {
    this.errorMessage.next(null);

    return this.http.post(`${this.backendUrl}/register`, user).pipe(
      tap((res: any) => {
        console.log('Registration successful:', res);
        this.errorMessage.next(null);
      }),
      catchError((err: any) => {
        console.error('Registration error:', err);
        const errorMsg = err.error.text || 'Registration failed. Please try again.';
        this.errorMessage.next(errorMsg);
        return throwError(() => err);
      })
    );
  }

  login(user: any): Observable<any> {
    this.errorMessage.next(null);
    return this.http.post(`${this.backendUrl}/login`, user).pipe(
      tap((res: any) => {
        this.isLoggedIn.next(true);
        localStorage.setItem('user', JSON.stringify(res));
        this.userRole.next(res.role);
        this.user.next(res);
        this.errorMessage.next(null);
      }),
      catchError((err: any) => {
        console.error('Login error:', err.error.text);
        const errorMsg = err.error.text || 'Login failed. Please check your credentials.';
        this.errorMessage.next(errorMsg);
        this.isLoggedIn.next(false);
        this.userRole.next(null);
        this.user.next(null);
        return throwError(() => err);
      })
    );
  }



  logout(){
    this.isLoggedIn.next(false)
    this.userRole.next(null)
    this.user.next(null)
    this.errorMessage.next(null)
    localStorage.removeItem('user')
  }

  getUserRole$(){
    return this.userRole.getValue()
  }


}
