import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProgramsComponent } from './pages/programs/programs.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { MethodsComponent } from './pages/methods/methods.component';
import { BlogComponent } from './pages/blog/blog.component';

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
    component: BlogComponent
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
