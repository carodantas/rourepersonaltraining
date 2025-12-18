import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProgramsComponent } from './pages/programs/programs.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: HomeComponent
  },
  {
    path: 'methods',
    component: HomeComponent
  },
  {
    path: 'blog',
    component: HomeComponent
  },
  {
    path: 'programs',
    component: ProgramsComponent
  },
  {
    path: 'free-intake',
    component: HomeComponent
  }
];
