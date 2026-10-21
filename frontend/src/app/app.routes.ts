import { Routes } from '@angular/router';
import { Users } from './components/users/users';
import { Home } from './components/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'users',
    component: Users,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/',
  },
];
