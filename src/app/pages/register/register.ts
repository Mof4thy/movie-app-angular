import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { LucideAngularModule, User, Lock, Eye  } from 'lucide-angular';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, RouterModule],
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

    this.registerForm = this.fb.group({
      username: [''],
      password: [''],
    });
  }



  register() {
    this.errorMessage$ = '';
    const { username, password } = this.registerForm.value;

    if (!username || !password) {
      this.errorMessage$ = 'Please fill all fields';
      return;
    }

    if(password.length < 6){
      this.errorMessage$ = 'Password must be at least 6 characters long';
      return;
    }

    this.auth.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.errorMessage$ = '';
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage$ = error.error.text || error.error;
      }
    });
  }

}
