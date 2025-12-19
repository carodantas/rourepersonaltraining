import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MethodsComponent } from './pages/methods/methods.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'methods',
    component: MethodsComponent
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
