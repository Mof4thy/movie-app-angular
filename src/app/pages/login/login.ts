import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { LucideAngularModule, User, Lock, Eye  } from 'lucide-angular';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  readonly LockIcon = Lock;
  readonly userIcon = User;
  readonly EyeIcon = Eye;

  loginForm: FormGroup;
  errorMessage$ = '';
  showPassword = false;
  loggedIn = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: Auth) {

    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }


  login() {
    this.errorMessage$ = '';
    const { username, password } = this.loginForm.value;

    if (!username || !password) {
      this.errorMessage$ = 'Please fill all fields';
      return;
    }

    if (password.length < 6) {
      this.errorMessage$ = 'Password maust be at least 6 characters long';
      return;
    }

    this.auth.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response.role === 'USER') {
          this.router.navigate(['/home']);
        } else if (response.role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        }
      },
      error: (error) => {
        this.errorMessage$ = error.error.text;
      }
    });
  }

}
