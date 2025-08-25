import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { Home } from './pages/home/home';
import { MovieDetails } from './pages/movie-details/movie-details';
import { Register } from './pages/register/register';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';
import { UserRoleGuard } from './guards/user-role-guard';
import { Auth2Guard } from './guards/auth2-guard';

export const routes: Routes = [
  {path: '', component: Home, canActivate: [AuthGuard, UserRoleGuard] },
  {path: 'admin-dashboard', component: AdminDashboard, canActivate: [AuthGuard, RoleGuard] },
  {path: 'login', component: Login, canActivate: [Auth2Guard]},
  {path: 'register', component: Register, canActivate: [Auth2Guard]},
  {path: 'user-dashboard', component: UserDashboard, canActivate: [AuthGuard, UserRoleGuard]},
  {path: 'movie-details/:id', component: MovieDetails, canActivate: [AuthGuard, UserRoleGuard]},
  {path: '**', redirectTo: ''},
];
