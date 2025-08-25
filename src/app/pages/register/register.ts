import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { LucideAngularModule, User, Lock, Eye  } from 'lucide-angular';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  readonly LockIcon = Lock;
  readonly userIcon = User;
  readonly EyeIcon = Eye;

  registerForm: FormGroup;
  errorMessage$ = '';
  showPassword = false;
  loggedIn = false;

  constructor(private fb: FormBuilder, private router: Router, private auth: Auth) {
    // initialize the form
    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }



  register() {
    // Clear previous error message
    this.errorMessage$ = '';

    const { username, password } = this.registerForm.value;

    // Basic validation
    if (!username || !password) {
      this.errorMessage$ = 'Please fill all fields';
      return;
    }

    if(password.length < 6){
      this.errorMessage$ = 'Password must be at least 6 characters long';
      return;
    }

    // Call auth service register method
    this.auth.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.errorMessage$ = '';
        // Navigate to login page on success
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage$ = error.error.text;
      }
    });
  }

}
