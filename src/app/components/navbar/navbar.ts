import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LucideAngularModule, LogOut } from 'lucide-angular';



@Component({
  selector: 'app-navbar',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  LogOutIcon = LogOut;
  isLoggedIn = false
  userRole: string | null = null
  user: any | null = null

  constructor(private auth: Auth, private router: Router) {

    // subscribe to the isLoggedIn$ observable
    this.auth.isLoggedIn$.subscribe(status =>{
      this.isLoggedIn = status
    })

    // subscribe to the userRole$ observable
    this.auth.userRole$.subscribe(role =>{
      this.userRole = role
    })

    this.auth.user$.subscribe(user =>{
      this.user = user
      console.log( "user", this.user)
    })
  }

  // logout function
  logout(){
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
